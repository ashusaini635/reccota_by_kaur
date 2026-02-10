import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const brandType = defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Brand name",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      description: "Brand story and details",
    }),
    defineField({
      name: "logo",
      title: "Brand Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "image",
      title: "Brand Banner Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "website",
      title: "Brand Website",
      type: "url",
      description: "Official brand website URL",
    }),
    defineField({
      name: "yearFounded",
      title: "Year Founded",
      type: "number",
    }),
    defineField({
      name: "foundedBy",
      title: "Founded By",
      type: "string",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Brand",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "image",
    },
  },
});