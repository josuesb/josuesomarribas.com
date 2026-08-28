#!/usr/bin/env python3
"""Generate static blog narration MP3 files with local Kokoro TTS."""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[2]
SOURCE_ROOT = PROJECT_ROOT / "audio-source"
OUTPUT_ROOT = PROJECT_ROOT / "public" / "audio" / "blog"
CHECKLIST_PATH = SOURCE_ROOT / "audio-generation-checklist.json"
MODEL = "mlx-community/Kokoro-82M-bf16"
LANGUAGES = {
    "en": {"voice": "bm_george", "lang_code": "b"},
    "es": {"voice": "em_alex", "lang_code": "e"},
}
SUPPORTED_EXTENSIONS = {".txt", ".md", ".html", ".htm"}


def clean_text(raw: str, suffix: str) -> str:
    """Turn simple Markdown or HTML source into narration-friendly plain text."""
    text = raw
    if suffix == ".md":
        text = re.sub(r"\A---\s*\n.*?\n---\s*\n", "", text, flags=re.DOTALL)
        text = re.sub(r"```.*?```", " ", text, flags=re.DOTALL)
        text = re.sub(r"`([^`]+)`", r"\1", text)
        text = re.sub(r"!\[([^]]*)]\([^)]*\)", r"\1", text)
        text = re.sub(r"\[([^]]+)]\([^)]*\)", r"\1", text)
        text = re.sub(r"^\s{0,3}(?:#{1,6}|>|[-*+]\s|\d+[.)]\s)\s*", "", text, flags=re.MULTILINE)
        text = re.sub(r"[*_~]", "", text)
    text = re.sub(r"<(script|style)\b[^>]*>.*?</\1>", " ", text, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r"<(pre|code)\b[^>]*>.*?</\1>", " ", text, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r"</(?:p|h[1-6]|li|blockquote|section|article|div)>", "\n\n", text, flags=re.IGNORECASE)
    text = re.sub(r"<br\s*/?>", "\n", text, flags=re.IGNORECASE)
    text = re.sub(r"<[^>]+>", " ", text)
    text = html.unescape(text)
    paragraphs = [re.sub(r"\s+", " ", part).strip() for part in re.split(r"\n\s*\n", text)]
    return "\n\n".join(part for part in paragraphs if part)


def find_sources(requested: list[str]) -> list[Path]:
    if requested:
        paths = [(PROJECT_ROOT / item).resolve() for item in requested]
    else:
        paths = sorted(
            path for path in SOURCE_ROOT.rglob("*")
            if path.suffix.lower() in SUPPORTED_EXTENSIONS and "done" not in path.relative_to(SOURCE_ROOT).parts
        )
    invalid = [path for path in paths if not path.is_file() or path.suffix.lower() not in SUPPORTED_EXTENSIONS]
    invalid += [path for path in paths if "done" in path.relative_to(SOURCE_ROOT).parts]
    if invalid:
        raise ValueError("Invalid input: " + ", ".join(str(path) for path in invalid))
    return paths


def language_for(path: Path) -> str:
    try:
        relative = path.relative_to(SOURCE_ROOT)
    except ValueError as error:
        raise ValueError(f"Input must be inside {SOURCE_ROOT}") from error
    language = relative.parts[0] if len(relative.parts) > 1 else ""
    if language not in LANGUAGES:
        raise ValueError(f"Place {path.name} inside audio-source/en or audio-source/es")
    return language


def run(command: list[str]) -> None:
    subprocess.run(command, cwd=PROJECT_ROOT, check=True)


def load_checklist() -> dict:
    if not CHECKLIST_PATH.exists():
        return {"version": 1, "items": {}}
    try:
        data = json.loads(CHECKLIST_PATH.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError) as error:
        raise ValueError(f"Cannot read checklist {CHECKLIST_PATH}: {error}") from error
    if not isinstance(data.get("items"), dict):
        raise ValueError(f"Invalid checklist format in {CHECKLIST_PATH}")
    return data


def save_checklist(checklist: dict) -> None:
    CHECKLIST_PATH.parent.mkdir(parents=True, exist_ok=True)
    temporary = CHECKLIST_PATH.with_suffix(".tmp")
    temporary.write_text(json.dumps(checklist, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temporary.replace(CHECKLIST_PATH)


def archive_source(source: Path, language: str) -> Path:
    relative = source.relative_to(SOURCE_ROOT / language)
    destination = SOURCE_ROOT / language / "done" / relative
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists():
        stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        destination = destination.with_name(f"{destination.stem}-{stamp}{destination.suffix}")
    shutil.move(str(source), str(destination))
    print(f"MOVE  {source.relative_to(PROJECT_ROOT)} -> {destination.relative_to(PROJECT_ROOT)}")
    return destination


def generate(source: Path, checklist: dict, force: bool, voice_override: str | None, speed: float) -> bool:
    language = language_for(source)
    source_relative = source.relative_to(SOURCE_ROOT)
    relative = source.relative_to(SOURCE_ROOT / language)
    destination = OUTPUT_ROOT / language / relative.with_suffix(".mp3")

    text = clean_text(source.read_text(encoding="utf-8"), source.suffix.lower())
    if not text:
        raise ValueError(f"No narratable text found in {source}")

    settings = LANGUAGES[language]
    voice = voice_override or settings["voice"]
    fingerprint = hashlib.sha256(
        f"{MODEL}\0{language}\0{voice}\0{speed}\0{text}".encode("utf-8")
    ).hexdigest()
    checklist_key = source_relative.as_posix()
    previous = checklist["items"].get(checklist_key, {})
    if not force and previous.get("fingerprint") == fingerprint and destination.exists():
        print(f"SKIP  {source_relative} (found in checklist)")
        archived = archive_source(source, language)
        previous["archived_source"] = archived.relative_to(PROJECT_ROOT).as_posix()
        previous["checked_at"] = datetime.now(timezone.utc).isoformat()
        save_checklist(checklist)
        return False

    destination.parent.mkdir(parents=True, exist_ok=True)
    print(f"VOICE {source.relative_to(PROJECT_ROOT)} -> {voice} ({language})")

    with tempfile.TemporaryDirectory(prefix="blog-audio-") as temporary:
        temp_dir = Path(temporary)
        wav = temp_dir / "narration.wav"
        run([
            sys.executable,
            "-m", "mlx_audio.tts.generate",
            "--model", MODEL,
            "--voice", voice,
            "--lang_code", settings["lang_code"],
            "--speed", str(speed),
            "--text", text,
            "--output_path", str(temp_dir),
            "--file_prefix", "narration",
            "--audio_format", "wav",
            "--join_audio",
        ])
        if not wav.exists():
            candidates = sorted(temp_dir.glob("*.wav"))
            if not candidates:
                raise RuntimeError(f"Kokoro did not create a WAV file for {source.name}")
            wav = candidates[0]
        run([
            "ffmpeg", "-y", "-loglevel", "error", "-i", str(wav),
            "-map_metadata", "-1", "-codec:a", "libmp3lame", "-b:a", "96k",
            str(destination),
        ])
    print(f"DONE  {destination.relative_to(PROJECT_ROOT)}")
    archived = archive_source(source, language)
    checklist["items"][checklist_key] = {
        "fingerprint": fingerprint,
        "language": language,
        "voice": voice,
        "speed": speed,
        "model": MODEL,
        "output": destination.relative_to(PROJECT_ROOT).as_posix(),
        "archived_source": archived.relative_to(PROJECT_ROOT).as_posix(),
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }
    save_checklist(checklist)
    return True


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate static MP3 narration for blog articles.")
    parser.add_argument("files", nargs="*", help="Optional source paths. Without paths, processes audio-source/en and audio-source/es.")
    parser.add_argument("--force", action="store_true", help="Regenerate audio even when the checklist already contains the same source.")
    parser.add_argument("--voice", help="Override the configured Kokoro voice for this run.")
    parser.add_argument("--speed", type=float, default=0.95, help="Narration speed (default: 0.95).")
    args = parser.parse_args()

    if shutil.which("ffmpeg") is None:
        print("ffmpeg is missing. Install it with: brew install ffmpeg", file=sys.stderr)
        return 1
    try:
        checklist = load_checklist()
        sources = find_sources(args.files)
        if not sources:
            print(f"No input files found. Add .txt, .md or .html files under {SOURCE_ROOT}")
            return 0
        generated = sum(generate(source, checklist, args.force, args.voice, args.speed) for source in sources)
    except (ValueError, RuntimeError, subprocess.CalledProcessError) as error:
        print(f"ERROR {error}", file=sys.stderr)
        return 1
    print(f"Finished: {generated} generated, {len(sources) - generated} skipped.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
