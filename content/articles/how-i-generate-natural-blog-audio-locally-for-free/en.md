---
slug: "how-i-generate-natural-blog-audio-locally-for-free"
locale: "en"
title: "How I Generate Natural Blog Audio Locally for Free"
description: "Build natural blog narration locally with Kokoro, speech-ready scripts, pronunciation QA, automated MP3 export, and no paid voice API."
date: "2026-08-28T00:00:00.000Z"
draft: false
type: "Blog"
cluster: "framer-cms-technical-seo"
tags: ["Local TTS", "Kokoro", "Accessibility", "Blog audio"]
audio: ""
sourceImage: "/images/blog/how-i-generate-natural-blog-audio-locally-for-free-1400.webp"
imageAlt: "Editorial illustration representing a written blog article being transformed into an audio waveform locally on a computer."
image: "/images/blog/how-i-generate-natural-blog-audio-locally-for-free-1400.webp"
canonical: ""
featured: false
downloadUrl: ""
downloadText: ""
---

<p>I wanted a proper Listen button on my blog, but I did not want every click to trigger a paid text-to-speech request. I also did not want the result to depend on whatever robotic voice happened to be installed in the visitor’s browser.</p><p>The solution was surprisingly practical: generate the narration locally on my Mac, export one optimized MP3 per article, and serve it as a normal static asset. The generation costs nothing, the voice stays consistent, and the website only has to play an audio file.</p><p>This article explains the exact workflow I built using Kokoro, MLX Audio, Python, and FFmpeg.</p>

<h2>The idea: generate once, play as many times as needed</h2>

<p>Browser speech synthesis is convenient, but it gives the website very little control. The available voice changes between operating systems and browsers. Rhythm, pronunciation, and quality change with it.</p><p>A hosted AI voice API gives better consistency, but it adds another service, usage limits, credentials, and a recurring cost. That can be reasonable for dynamic products. It felt unnecessary for articles that only change occasionally.</p><p>Static narration changes the model:</p><ol><li><p>Prepare a clean narration text.</p></li><li><p>Generate the voice locally.</p></li><li><p>Compress it into an MP3.</p></li><li><p>Commit the finished audio with the website.</p></li><li><p>Let every visitor play the same reviewed recording.</p></li></ol><p>There is no text-to-speech process in production and no API call when somebody presses Play.</p>

<h2>The local stack</h2>

<p>I use <a href="https://github.com/Blaizzy/mlx-audio">MLX Audio</a>, a speech library built for Apple’s MLX framework, with the Kokoro text-to-speech model. Kokoro is compact compared with many modern speech models and its weights are available under the Apache 2.0 license. MLX makes it practical to run on an Apple Silicon Mac.</p><p>FFmpeg handles the final compression. Python runs the automation script, but neither Python nor the model needs to exist on Vercel. Only the resulting MP3 files are deployed.</p><p>My English default is <strong>George</strong>, a British male voice identified as <code>bm_george</code>. For Spanish I use the male voice <code>em_alex</code>. Both run at 0.95 speed, which gives technical writing a little more room to breathe without sounding slow.</p>

<h2>One-time installation</h2>

<p>On an Apple Silicon Mac, I install Python 3.12 and FFmpeg with Homebrew:</p><pre><code>brew install python@3.12 ffmpeg</code></pre><p>Then I create a project-specific virtual environment and install the local speech tools:</p><pre><code>/opt/homebrew/bin/python3.12 -m venv .venv-tts
.venv-tts/bin/python -m pip install --upgrade pip
.venv-tts/bin/pip install mlx-audio "misaki[en]" soundfile</code></pre><p>The first run downloads the model and voice files. Later runs reuse the local cache, so they start faster.</p>

<h2>The folder-based workflow</h2>

<p>I wanted the process to be boring enough that I would actually use it. Narration sources go into language-specific folders:</p><pre><code>audio-source/
├── en/
│   └── article-slug.txt
└── es/
    └── article-slug.txt</code></pre><p>Then I run one command from the project root:</p><pre><code>npm run audio:generate</code></pre><p>The generator detects the language from the folder, selects the correct voice, creates a WAV internally, converts it to a 96-kilobit MP3, and writes the public file here:</p><pre><code>public/audio/blog/en/article-slug.mp3
public/audio/blog/es/article-slug.mp3</code></pre><p>The website can then load the file from <code>/audio/blog/en/article-slug.mp3</code> like any other public asset.</p>

<h2>A queue, a done folder, and a checklist</h2>

<p>Generating dozens of long articles takes time, so the script treats the source folders as a queue. After an MP3 is created successfully, the source text moves into a <code>done</code> subfolder.</p><p>The script also maintains a JSON checklist. It records a fingerprint made from the narration, language, voice, speed, and model. If the same file appears again with the same settings, the generator recognizes it and does not waste time recreating the audio.</p><p>If I change the copy, voice, or speed, the fingerprint changes and the article can be generated again. I can also force a deliberate regeneration:</p><pre><code>npm run audio:generate -- --force audio-source/en/article-slug.txt</code></pre><p>This matters when the queue contains an entire archive. A simple timestamp is not enough; the checklist makes the generation history explicit.</p>

<h2>Preparing text for speech</h2>

<p>Good text-to-speech is not only a voice problem. A page and a narration are different interfaces.</p><p>My generator accepts plain text, Markdown, or HTML. It removes front matter, HTML tags, images, and code blocks before sending anything to the model. The title is included, but implementation details that make no sense aloud are excluded.</p><p>I still review the source text for a few predictable problems:</p><ul><li><p>Headings should sound like spoken transitions.</p></li><li><p>Acronyms may need to be expanded or written phonetically.</p></li><li><p>Raw URLs should never be read aloud.</p></li><li><p>Long lists need punctuation and breathing room.</p></li><li><p>Code should be explained, not narrated character by character.</p></li></ul><p>The most natural voice cannot rescue text that was never meant to be heard.</p>

<h2>What “free” actually means</h2>

<p>The generation is local and does not use a paid API. There is no charge per character, per minute, or per playback. The model runs on hardware I already own.</p><p>That does not mean audio has literally zero infrastructure cost. MP3 files occupy repository or storage space, and visitors use normal hosting bandwidth when they listen. A 96-kilobit MP3 is small enough for this use case, but it is still a file being delivered.</p><p>The important distinction is that listening does not trigger inference. One hundred listeners and one listener use the same finished asset.</p>

<h2>Quality checks before publishing</h2>

<p>I do not publish the first render blindly. My audio checklist is short:</p><ul><li><p>Listen to the opening, one section transition, and the ending.</p></li><li><p>Check names, acronyms, product names, and numbers.</p></li><li><p>Confirm that no code or URL is being read.</p></li><li><p>Make sure the player never autoplays.</p></li><li><p>Keep Play, Pause, duration, progress, and playback speed accessible by keyboard.</p></li><li><p>Keep the written article available as the canonical version.</p></li></ul><p>If one word sounds wrong, I edit the private narration text phonetically without changing the visible article. That small separation is useful: written accuracy and spoken pronunciation do not always need the same spelling.</p>

<h2>Where this approach works best</h2>

<p>Local static narration is a strong fit for portfolios, documentation, editorial blogs, and relatively stable content. It provides consistent quality without adding a runtime service to the website.</p><p>It is less suitable when text changes constantly, users generate arbitrary content, or audio must be personalized in real time. Those products need a server-side speech system or an API.</p><p>For my blog, static audio is the right tradeoff. I control the voice, review the result once, and keep production simple. The fancy part happens locally. The website just plays a file, which is exactly the kind of boring architecture I trust.</p>

<h2>Local generation versus ElevenLabs</h2>

<p>I previously generated narration with ElevenLabs Studio and uploaded it manually. That workflow is still useful when a project needs a highly polished commercial voice, detailed pronunciation tooling, or multiple collaborators reviewing audio in a hosted interface. It also removes local model setup.</p><p>The tradeoff is recurring usage, another account in the publishing chain, and less control over whether future regeneration behaves exactly like the first render. Local Kokoro generation is a better default for this blog because the articles are stable, the hardware already exists, and every published MP3 can be reviewed and versioned with the site.</p><table><thead><tr><th>Need</th><th>Local Kokoro</th><th>Hosted voice service</th></tr></thead><tbody><tr><td>Cost per regeneration</td><td>No API fee</td><td>Usually metered</td></tr><tr><td>Setup</td><td>Python, model, FFmpeg</td><td>Account and upload</td></tr><tr><td>Voice controls</td><td>Model-dependent</td><td>Usually richer</td></tr><tr><td>Privacy</td><td>Text stays local</td><td>Text is processed remotely</td></tr><tr><td>Repeatability</td><td>Pinned locally</td><td>Depends on service/model changes</td></tr></tbody></table>

<h2>Turning an article into a narration script</h2>

<p>The visible article should remain the canonical source, but it should not be read character for character. Before generation, I create a speech version that keeps the argument while removing visual-only material.</p><ul><li><p>Links become the meaning of the link, not a spoken URL.</p></li><li><p>Code blocks become a short explanation of what the code does.</p></li><li><p>Images get a useful spoken transition only when they carry part of the argument.</p></li><li><p>Tables become comparisons in natural sentences.</p></li><li><p>Headings become transitions, so the listener understands that the subject changed.</p></li></ul><p>This preparation has more influence on naturalness than most voice settings. A clean script with ordinary punctuation usually outperforms an overloaded script covered in synthetic pause commands.</p>

<h2>Pronunciation, pauses, and SSML</h2>

<p>Model support decides which controls are available. Some hosted voices accept SSML break tags, phonemes, aliases, or pronunciation dictionaries. Local models may respond better to punctuation and phonetic rewrites. I keep those rewrites in the private narration source so the published article stays typographically correct.</p><p>My order of operations is simple: fix the sentence, adjust punctuation, add a phonetic alias for the specific word, and use explicit break markup only when the chosen model genuinely supports it. Throwing SSML at an incompatible model does not create nuance; sometimes it reads the markup aloud.</p><p>For recurring names, products, and acronyms, maintain a small pronunciation lexicon beside the generation script. It is cheaper to solve “JSON-LD,” “Framer,” or a person’s surname once than to rediscover the same problem in every article.</p>

<h2>The publishing handoff</h2>

<p>The site should prefer the reviewed MP3 when one exists and fall back to browser speech only when it does not. The audio player must never autoplay, and its controls need keyboard access, visible progress, duration, and an understandable text label.</p><p>Before shipping, listen to the first paragraph, a transition in the middle, every unusual proper noun, and the ending. That compact QA pass catches most failures without turning publishing into a full recording session.</p>
