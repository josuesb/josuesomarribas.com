import {defineArrayMember, defineField, defineType} from "sanity";

export const topicType = defineType({
  name: "topic",
  title: "Topic cluster",
  type: "document",
  fields: [
    defineField({name: "name", title: "Name", type: "string", validation: rule => rule.required()}),
    defineField({name: "slug", title: "Slug", type: "slug", options: {source: "name"}, validation: rule => rule.required()}),
    defineField({name: "description", title: "Description", type: "text", rows: 4}),
    defineField({name: "pillarPost", title: "Pillar post slug", type: "string"}),
    defineField({name: "featuredPosts", title: "Featured post slugs", type: "array", of: [defineArrayMember({type: "string"})]}),
    defineField({name: "seoTitle", title: "SEO title", type: "string"}),
    defineField({name: "seoDescription", title: "SEO description", type: "text", rows: 3}),
  ],
  preview: {select: {title: "name", subtitle: "slug.current"}},
});
