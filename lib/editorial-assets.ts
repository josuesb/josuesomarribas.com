const editorialAssets:[RegExp,string][] = [
  [/^how-i-generate-natural-blog-audio-locally-for-free$/, "/images/blog/how-i-generate-natural-blog-audio-locally-for-free.png"],
  [/fouc/i, "/assets/writing-editorial/01-fouc-original-flicker-variant.svg"],
  [/mutationobserver|polling/i, "/assets/writing-editorial/02-observer-vs-polling.svg"],
  [/flat-data|statistical-significance/i, "/assets/writing-editorial/03-flat-wins.svg"],
  [/squircle|superellipse/i, "/assets/writing-editorial/04-squircle.svg"],
  [/json-ld|schema/i, "/assets/writing-editorial/05-json-ld.svg"],
  [/ssml|audio|elevenlabs/i, "/assets/writing-editorial/06-ssml-audio.svg"],
];

export function editorialImage(slug:string, fallback:string) {
  return editorialAssets.find(([pattern]) => pattern.test(slug))?.[1] || fallback;
}
