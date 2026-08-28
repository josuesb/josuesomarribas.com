---
slug: "how-i-add-real-audio-to-my-blog-posts-using-chatgpt-elevenlabs-and-framer"
locale: "en"
title: "How I Add Real Audio to My Blog Posts using ChatGPT, ElevenLabs and Framer"
description: "A practical, repeatable workflow to turn a blog post into a natural-sounding audio version using ChatGPT and ElevenLabs Studio, then embed it in Framer without making the UX weird."
date: "2025-12-16T00:00:00.000Z"
draft: true
type: "Blog"
cluster: "framer-cms-technical-seo"
tags: []
audio: "https://framerusercontent.com/assets/Su97gD3RI2KqgJ1WqDJWbk5ke44.mp3"
sourceImage: "https://framerusercontent.com/images/u60FmlyoaOgmXgZIcj2azhDmjQ.png"
imageAlt: "Abstract editorial illustration about digital product design and experimentation"
image: "/images/blog/default-cover.png"
canonical: ""
featured: false
downloadUrl: "https://framerusercontent.com/assets/2wBq6cnW8o59L60AAgAoVSPmlow.pdf"
downloadText: "Download the PDF instructions"
---

<p>I like writing. I also like not being glued to a screen 24/7. So I started adding audio versions to my blog posts.</p><p>Not the “robot voice reads my CSS” kind. I mean audio that’s actually pleasant to listen to, and doesn’t ignore accessibility basics like image descriptions.</p><p>Here’s the exact workflow I use, end to end.</p><h2>What you’re building</h2><p>A pipeline that looks like this:</p><ol><li data-preset-tag="p"><p>Write the blog post</p></li><li data-preset-tag="p"><p>Add images and write alt text (so the content still makes sense without visuals)</p></li><li data-preset-tag="p"><p>Generate a narration-ready script with ChatGPT (adapted for speech)</p></li><li data-preset-tag="p"><p>Create the audio in ElevenLabs Studio (Text to Speech)</p></li><li data-preset-tag="p"><p>Embed the audio in Framer manually (on purpose)</p></li></ol><h2>Step 1: Write the blog post normally, but keep it speakable</h2><p>Write for reading first, yes. But don’t write like you’re trying to win a “Longest Sentence” award.</p><p>A few things that make audio smoother:</p><ul><li data-preset-tag="p"><p>Keep paragraphs short. Audio listeners can’t “scan” like readers do.</p></li><li data-preset-tag="p"><p>Avoid stacking three ideas into one sentence.</p></li><li data-preset-tag="p"><p>If you use acronyms, define them once. Out loud, “GA4” can sound like a sneeze.</p></li></ul><p>If the post is very technical, that’s fine. Just don’t punish people for caring.</p><h2>Step 2: Add images, then write alt text that’s actually useful</h2><img alt="Image settings panel with an “Alt Text” field being filled in, next to a preview of a laptop photo showing a dark-theme code editor." src="https://framerusercontent.com/images/bBqgX8pEIWfNG2HgWUBNR2cZlQ.png"><p>Alt text is not decoration. It’s the stand-in for the image when someone can’t see it.</p><p>My rule is simple: write alt text like you’re explaining the image to a friend, and you want them to understand why it’s in the post.</p><p><strong>Bad alt text:</strong><br>“Laptop”</p><p><strong>Better alt text:</strong><br>“Image settings panel with an “Alt Text” field being filled in, next to a preview of a laptop photo showing a dark-theme code editor.”</p><p>If an image is purely decorative, say so (or leave alt empty depending on your CMS). If it’s carrying information, describe the information.</p><h2>Step 3: Convert the post into a narration script (this is the secret sauce)</h2><p>A blog post is not a voice script. If you paste your post into TTS as-is, you’ll get audio that sounds… like someone reading a blog post.</p><p>When I adapt a post for narration, I change three things:</p><h3>Links</h3><p>No one wants a voice reading a URL. It’s audio torture.</p><p>Instead of raw links, I use a short spoken description like:<br>“There’s a link to Framer’s documentation about structured data.”</p><h3>Code blocks</h3><p>Never read code out loud. Nobody wins.</p><p>Replace code with 1–2 sentences explaining what it does and why it’s there.<br>Example: “This CSS hides the last card in the list, so the UI doesn’t duplicate the user’s current selection.”</p><h3>Images</h3><p>For each image, I insert a spoken line right where the image appears, something like:<br>“In this article, there’s an image of…” followed by a short description based on the alt text.</p><p>That keeps the narration coherent for people who are only listening.</p><h2>Step 4: Generate the script with ChatGPT 5.2 (my folder setup)</h2><img alt="Screenshot of a ChatGPT Project titled “Audio Script Adapter,” showing the new chat input with “Extended thinking” enabled and an attached file indicator." src="https://framerusercontent.com/images/axDayCtdbwRdZj2TqEuXUCwkU.png"><p>I use <strong>ChatGPT 5.2</strong> on the <strong>Pro plan</strong>, and I keep things organized using Projects.</p><p>I create <strong>one folder per blog post</strong>, and inside it I keep:</p><ul><li data-preset-tag="p"><p>Final blog text</p></li><li data-preset-tag="p"><p>Image list + alt text (in order)</p></li><li data-preset-tag="p"><p>The prompt template</p></li><li data-preset-tag="p"><p>The final script output</p></li></ul><p>This makes the workflow repeatable, and it keeps me from “prompt improvising” my way into inconsistency.</p><h3>Prompt template (paste this into ChatGPT)</h3><pre data-language="JSX"><code>You are an "Audio Script Adapter" for blog posts.

Goal:
Turn a blog post into a Text-to-Speech friendly script that sounds natural when read aloud, stays close to the original meaning, and is accessible for listeners who can't see images or videos.

Critical rule:
You MUST respond in the same language as the blog post you are adapting (detect it from the input). The instructions you are reading now are in English, but your output language must match the blog post. 

Input you will receive:
1) The full blog post text (may include headings, bullets, code blocks, image placeholders, and links).
2) Optional media hints (alt text, captions, video title/duration, screenshot context).
3) Optional "link context" (anchor text + one-sentence description, if provided).

Output requirements:
- Output ONLY the final audio script in a single plain-text block wrapped in triple backticks for easy copy/paste.
- Do NOT add commentary, explanations, or extra sections outside the script.
- Keep the content very close to the original. Only change what's necessary to make it sound good out loud and to handle media, code, and links.

Style rules (TTS-friendly):
- Use short-to-medium sentences. Prefer natural spoken rhythm.
- Keep paragraphs short (1 to 4 sentences).
- Avoid reading punctuation-heavy fragments, long parentheticals, or overly "written" structures.
- Expand or clarify abbreviations on first use (example: "User Interface, UI").
- When you see numbers, dates, units, or symbols, rewrite them in a way that reads well aloud (example: "eight pixels", "three minutes and sixteen seconds", "iOS seven").
- If there are bullet lists, keep them, but convert them into spoken-friendly phrasing (example: "Try them on: first..., second...").
- Do not include emojis.

Images and videos (must be handled like narration for a non-visual audience):
- Never say "Image 1", "Image 2", "Video 1", or "visual description".
- Instead, each time an image appears, write a sentence starting with:
  "In the article, there is an image of..."
  Then describe it clearly and concretely, as if you're describing it to someone who can't see it.
- Each time a video appears, write a sentence starting with:
  "In the article, there is a video..."
  Include what the video is about, and if available, its title and duration.
- Use any provided alt text, captions, and surrounding context to make the description accurate.
- Keep each media description concise: usually 1 to 3 sentences. Only get more detailed if the image contains key information.

Code blocks (must NOT be read aloud):
- Do not output code verbatim.
- Replace each code block with a short spoken description of what it does and why it's used.

Links (must NOT be read as URLs):
- Never include raw URLs in the script.
- Replace each link with a short spoken description using this format:
  "The article includes a link to [site or brand] that explains [what it's about in one short sentence]."
- The one-sentence summary should be tight and literal. Use the anchor text and the surrounding sentence for meaning.
- If you cannot confidently infer what the link contains, say:
  "The article includes a link to [site or brand] for more details on this update."

Content fidelity rules:
- Do not invent new claims.
- Do not add new examples that weren't implied by the post.
- Do not remove important ideas. Only compress where reading aloud would be painful (like code, raw URLs, or overly long lists).
- Preserve the author's tone (casual, technical, skeptical, etc.) as long as it still reads well aloud.

Structure rules:
- Keep the title and date at the top (spoken-friendly).
- Keep headings, but make them read naturally.
- Keep the original order of sections.
- If the post includes a call to action, keep it.

Now wait for the blog post text and optional media/link context, then generate the final audio script following all rules above.</code></pre><p><strong>Now produce the final narration script.</strong></p><h2>Step 5: Create the audio in ElevenLabs Studio (Text to Speech)</h2><p>Now take the narration script into <strong>ElevenLabs Studio</strong>.</p><img alt="ElevenLabs Studio editor showing the text script for “How I Add Real Audio to My Blog Posts,” with the voice set to Rachel (Legacy) and an audio timeline/player at the bottom." src="https://framerusercontent.com/images/9p4xm6ICFoUk6BLPof9piX42uMQ.png"><p>My workflow:</p><ol><li data-preset-tag="p"><p>Create a new project named after the blog post</p></li><li data-preset-tag="p"><p>Choose <strong>Text to Speech</strong></p></li><li data-preset-tag="p"><p>Paste the script</p></li><li data-preset-tag="p"><p>Pick the voice</p></li><li data-preset-tag="p"><p>Listen once at 1x speed, then fix the obvious problems:</p><ul><li data-preset-tag="p"><p>weird pronunciations (brand names, acronyms)</p></li><li data-preset-tag="p"><p>awkward rhythm (sentences that are too long)</p></li><li data-preset-tag="p"><p>repeated phrases that sound “generated”</p></li></ul></li></ol><p>TTS is not “set it and forget it.” It’s “set it, then do one human pass.”</p><h2>Step 6: Add the audio to Framer manually (on purpose)</h2><img alt="Form fields for an audio upload, showing an MP3 file selected, plus Title and Description inputs filled with the blog post name and a short summary." src="https://framerusercontent.com/images/pqGCvDRyHgzXiUMS6gtngO0qlo.png"><p>I embed the audio manually in Framer because I want the experience to feel intentional, and I want the quality to stay consistent.</p><p>A simple approach:</p><ul><li data-preset-tag="p"><p>Add a “Listen to this article” button near the top of the post</p></li><li data-preset-tag="p"><p>Embed an audio player (or your preferred audio component) using the final MP3</p></li><li data-preset-tag="p"><p>Don’t autoplay. Seriously. Don’t.</p></li></ul><p>If you want tracking, track the play action (and optionally 25%, 50%, 75%, 100% progress). Otherwise you’ll have no clue if people actually use the feature. Oh, and please set up the download button so it only shows if there is a file set on the entry, you won't want all your blog posts showing empty download buttons.</p><h3>Quick QA checklist before publishing</h3><ul><li data-preset-tag="p"><p>Links are described, not read as URLs</p></li><li data-preset-tag="p"><p>Code is explained, not spoken</p></li><li data-preset-tag="p"><p>Each image has an alt, and the script mentions the image where it appears</p></li><li data-preset-tag="p"><p>The audio sounds good at normal speed</p></li><li data-preset-tag="p"><p>No weird repeated phrases or “perfectly uniform” rhythm</p></li><li data-preset-tag="p"><p>The “Listen” entry point is visible, but not screaming for attention</p></li></ul><h2>The PDF at the end of this article</h2><p>Below please find a PDF with the exact prompt, formatting rules, and a couple short examples (links, code, images) so you can reuse the workflow without rethinking it every time. I recommend uploading it to your LLM (like ChatPGT, Claude, etc) so they can act as needed. </p>
