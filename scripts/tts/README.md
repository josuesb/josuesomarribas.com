# Local blog audio generator

This tool converts text files into natural narration using Kokoro on the local Mac. It does not call a paid API and it does not run on Vercel.

## Folder structure

Put source text in the folder matching its language:

```text
audio-source/
├── en/
│   └── my-article.txt
└── es/
    └── mi-articulo.txt
```

Generated files are written to the public folder using the same filename:

```text
public/audio/blog/
├── en/my-article.mp3
└── es/mi-articulo.mp3
```

The website URL for the first example is `/audio/blog/en/my-article.mp3`.

The generator accepts `.txt`, `.md`, `.html` and `.htm`. Markdown front matter, formatting symbols, code blocks and HTML tags are removed before narration. For the cleanest result, use a plain `.txt` file containing only the words that should be spoken.

## Generate audio

From the project root, run:

```bash
npm run audio:generate
```

The command processes every supported file under `audio-source/en` and `audio-source/es`. Existing MP3 files are skipped when they are newer than their source text.

Generate only one file:

```bash
npm run audio:generate -- audio-source/en/my-article.txt
```

Regenerate an existing recording:

```bash
npm run audio:generate -- --force audio-source/en/my-article.txt
```

Try a different voice or speed:

```bash
npm run audio:generate -- --voice bm_george --speed 0.92 audio-source/en/my-article.txt
```

## Default voices

- English: `am_michael` (American male)
- Spanish: `em_alex` (Spanish male)
- Default speed: `0.95`

Other useful male voices include `am_adam`, `bm_george`, `bm_daniel` and `bm_lewis`. Do not use an English voice for Spanish narration; the language and voice prefixes must match.

## One-time setup on a new Mac

The current Mac is already configured. On a new Apple Silicon Mac:

```bash
brew install python@3.12 ffmpeg
/opt/homebrew/bin/python3.12 -m venv .venv-tts
.venv-tts/bin/python -m pip install --upgrade pip
.venv-tts/bin/pip install mlx-audio "misaki[en]" soundfile
```

The first generation downloads the Kokoro model. Later generations reuse the local cache.

## Git and deployment

The Python environment and general Python files remain ignored. This generator is explicitly allowed by `.gitignore`, so `scripts/tts/generate_audio.py` and this README can be committed.

Generated MP3 files are normal public assets and can be committed when they should be available on the deployed website. The local `.venv-tts` directory is never uploaded to GitHub or Vercel.

## Troubleshooting

- `ffmpeg is missing`: run `brew install ffmpeg`.
- `.venv-tts/bin/python` is missing: repeat the one-time setup above.
- The audio was skipped: use `--force` or edit the source file.
- A word is pronounced badly: spell it phonetically in the source narration file; this does not affect the visible article.
- Long articles work best when headings and paragraphs end with punctuation.
