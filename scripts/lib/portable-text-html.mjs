import {escapeHTML, toHTML, uriLooksSafe} from "@portabletext/to-html";

const components = {
  types: {
    externalImage: ({value}) => `<img src="${escapeHTML(value.src ?? "")}" alt="${escapeHTML(value.alt ?? "")}" loading="lazy">`,
    editorialFigure: ({value}) => `<figure class="article-editorial-figure"><img src="${escapeHTML(value.src ?? "")}" alt="${escapeHTML(value.alt ?? "")}" loading="lazy">${value.caption ? `<figcaption>${escapeHTML(value.caption)}</figcaption>` : ""}</figure>`,
    codeBlock: ({value}) => `<pre data-language="${escapeHTML(value.language ?? "text")}"><code>${escapeHTML(value.code ?? "")}</code></pre>`,
    rawHtml: ({value}) => value.html?.code ?? "",
  },
  marks: {
    link: ({children, value}) => {
      const href = value.href ?? "";
      if (!uriLooksSafe(href)) return children;
      const external = /^https?:\/\//.test(href);
      return `<a href="${escapeHTML(href)}"${external ? ' rel="noreferrer noopener"' : ""}>${children}</a>`;
    },
  },
};

export function portableTextToHtml(blocks) {
  return toHTML(blocks, {components, onMissingComponent: message => { throw new Error(message); }});
}
