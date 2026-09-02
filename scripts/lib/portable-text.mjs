import {htmlToBlocks} from "@portabletext/block-tools";
import {Schema} from "@sanity/schema";
import {JSDOM} from "jsdom";

const schema = Schema.compile({
  name: "portableTextMigration",
  types: [{
    name: "article",
    type: "document",
    fields: [{
      name: "body",
      type: "array",
      of: [
        {type: "block", styles: ["normal", "h1", "h2", "h3", "h4", "blockquote"].map(value => ({title: value, value})), marks: {annotations: [{name: "link", type: "object", fields: [{name: "href", type: "string"}]}]}},
        {name: "externalImage", type: "object", fields: [{name: "src", type: "string"}, {name: "alt", type: "string"}]},
        {name: "editorialFigure", type: "object", fields: [{name: "src", type: "string"}, {name: "alt", type: "string"}, {name: "caption", type: "string"}]},
        {type: "image", options: {hotspot: true}, fields: [{name: "alt", type: "string"}, {name: "caption", type: "string"}]},
        {name: "codeBlock", type: "object", fields: [{name: "language", type: "string"}, {name: "code", type: "text"}]},
        {name: "rawHtml", type: "object", fields: [{name: "label", type: "string"}, {name: "html", type: "object", fields: [{name: "language", type: "string"}, {name: "code", type: "text"}]}]},
      ],
    }],
  }],
});

const bodyType = schema.get("article").fields.find(field => field.name === "body").type;
const preservedTags = new Set(["table", "aside", "iframe"]);

const rules = [{
  deserialize(element, _next, createBlock) {
    if (element.nodeType !== 1) return undefined;
    const tag = element.tagName.toLowerCase();
    if (preservedTags.has(tag)) return createBlock({_type: "rawHtml", label: tag, html: {_type: "code", language: "html", code: element.outerHTML}});
    if (tag === "figure") {
      const image = element.querySelector("img");
      if (!image) return createBlock({_type: "rawHtml", label: tag, html: {_type: "code", language: "html", code: element.outerHTML}});
      return createBlock({_type: "editorialFigure", src: image.getAttribute("src") ?? "", alt: image.getAttribute("alt") ?? "", caption: element.querySelector("figcaption")?.textContent?.trim() ?? ""});
    }
    if (tag === "img") return createBlock({_type: "externalImage", src: element.getAttribute("src") ?? "", alt: element.getAttribute("alt") ?? ""});
    if (tag === "pre") {
      const code = element.querySelector("code");
      const language = code?.getAttribute("class")?.match(/language-([\w-]+)/)?.[1] ?? element.getAttribute("data-language")?.toLowerCase() ?? "text";
      return createBlock({_type: "codeBlock", language, code: code?.textContent ?? element.textContent ?? ""});
    }
    return undefined;
  },
}];

export function convertHtmlToPortableText(html) {
  return htmlToBlocks(html, bodyType, {parseHtml: source => new JSDOM(source).window.document, rules});
}

export function portableTextPlainText(blocks) {
  return blocks.flatMap(block => {
    if (block._type === "block") return block.children?.map(child => child.text ?? "") ?? [];
    if (block._type === "codeBlock") return [block.code ?? ""];
    if (block._type === "rawHtml") return [new JSDOM(block.html?.code ?? "").window.document.body.textContent ?? ""];
    if (block._type === "editorialFigure") return [block.caption ?? ""];
    return [];
  }).join(" ").replace(/\s+/g, " ").trim();
}
