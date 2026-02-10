import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export const categoryType = defineType({
  name: "category",
  type: "document",
  title: "Category",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Category name (e.g., Sarees, Suits, Coord Sets)",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      description: "Brief description of the category",
    }),
    defineField({
      name: "image",
      title: "Category Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "priceRange",
      title: "Price Range (Starting From)",
      type: "number",
      description: "Minimum price for items in this category",
    }),
    defineField({
      name: "sizeOptions",
      title: "Available Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "XS", value: "xs" },
          { title: "S", value: "s" },
          { title: "M", value: "m" },
          { title: "L", value: "l" },
          { title: "XL", value: "xl" },
          { title: "XXL", value: "xxl" },
          { title: "One Size", value: "onesize" },
        ],
      },
    }),
    defineField({
      name: "colors",
      title: "Available Colors",
      type: "array",
      of: [{ type: "string" }],
      description: "List of colors available in this category",
    }),
    defineField({
      name: "materials",
      title: "Materials/Fabric",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Cotton", value: "cotton" },
          { title: "Silk", value: "silk" },
          { title: "Georgette", value: "georgette" },
          { title: "Linen", value: "linen" },
          { title: "Crepe", value: "crepe" },
          { title: "Velvet", value: "velvet" },
          { title: "Chanderi", value: "chanderi" },
          { title: "Jacquard", value: "jacquard" },
        ],
      },
    }),
    defineField({
      name: "occasion",
      title: "Occasion Type",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Ethnic Wear", value: "ethnic" },
          { title: "Casual", value: "casual" },
          { title: "Formal", value: "formal" },
          { title: "Party/Event", value: "party" },
          { title: "Wedding", value: "wedding" },
          { title: "Festival", value: "festival" },
        ],
      },
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
      description: "Display this category on homepage",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Order in which categories appear",
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

