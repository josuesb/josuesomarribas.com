const editorialAssets:[RegExp,string][] = [
  [/^how-i-generate-natural-blog-audio-locally-for-free$/, "/images/blog/how-i-generate-natural-blog-audio-locally-for-free.png"],
  [/fouc/i, "/images/blog/the-cost-of-fouc-how-content-flicker-kills-test-validity-v2.png"],
  [/mutationobserver|polling/i, "/assets/writing-editorial/02-observer-vs-polling.svg"],
  [/flat-data|statistical-significance/i, "/assets/writing-editorial/03-flat-wins.svg"],
  [/squircle|superellipse/i, "/assets/writing-editorial/04-squircle.svg"],
  [/json-ld|schema/i, "/assets/writing-editorial/05-json-ld.svg"],
  [/ssml|audio|elevenlabs/i, "/assets/writing-editorial/06-ssml-audio.svg"],
];

export function editorialImage(slug:string, fallback:string) {
  if (fallback && fallback !== "/images/blog/default-cover.png") return fallback;
  return editorialAssets.find(([pattern]) => pattern.test(slug))?.[1] || fallback;
}
