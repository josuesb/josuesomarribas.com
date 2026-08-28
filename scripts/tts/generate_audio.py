#!/usr/bin/env python3
"""Generate static blog narration MP3 files with local Kokoro TTS."""

from __future__ import annotations

import argparse
import html
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[2]
SOURCE_ROOT = PROJECT_ROOT / "audio-source"
OUTPUT_ROOT = PROJECT_ROOT / "public" / "audio" / "blog"
MODEL = "mlx-community/Kokoro-82M-bf16"
LANGUAGES = {
    "en": {"voice": "am_michael", "lang_code": "a"},
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
        paths = sorted(path for path in SOURCE_ROOT.rglob("*") if path.suffix.lower() in SUPPORTED_EXTENSIONS)
    invalid = [path for path in paths if not path.is_file() or path.suffix.lower() not in SUPPORTED_EXTENSIONS]
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


def generate(source: Path, force: bool, voice_override: str | None, speed: float) -> Path | None:
    language = language_for(source)
    relative = source.relative_to(SOURCE_ROOT / language).with_suffix(".mp3")
    destination = OUTPUT_ROOT / language / relative
    if destination.exists() and not force and destination.stat().st_mtime >= source.stat().st_mtime:
        print(f"SKIP  {source.relative_to(PROJECT_ROOT)} (audio is current)")
        return None

    text = clean_text(source.read_text(encoding="utf-8"), source.suffix.lower())
    if not text:
        raise ValueError(f"No narratable text found in {source}")

    settings = LANGUAGES[language]
    voice = voice_override or settings["voice"]
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
    return destination


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate static MP3 narration for blog articles.")
    parser.add_argument("files", nargs="*", help="Optional source paths. Without paths, processes audio-source/en and audio-source/es.")
    parser.add_argument("--force", action="store_true", help="Regenerate audio even when the MP3 is newer than its source.")
    parser.add_argument("--voice", help="Override the configured Kokoro voice for this run.")
    parser.add_argument("--speed", type=float, default=0.95, help="Narration speed (default: 0.95).")
    args = parser.parse_args()

    if shutil.which("ffmpeg") is None:
        print("ffmpeg is missing. Install it with: brew install ffmpeg", file=sys.stderr)
        return 1
    try:
        sources = find_sources(args.files)
        if not sources:
            print(f"No input files found. Add .txt, .md or .html files under {SOURCE_ROOT}")
            return 0
        generated = sum(generate(source, args.force, args.voice, args.speed) is not None for source in sources)
    except (ValueError, RuntimeError, subprocess.CalledProcessError) as error:
        print(f"ERROR {error}", file=sys.stderr)
        return 1
    print(f"Finished: {generated} generated, {len(sources) - generated} skipped.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
