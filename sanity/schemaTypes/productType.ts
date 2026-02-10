import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "discount",
      title: "Discount Percentage (%)",
      type: "number",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: { type: "brand" },
    }),

    defineField({
      name: "status",
      title: "Product Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Hot", value: "hot" },
          { title: "Sale", value: "sale" },
        ],
      },
    }),
    defineField({
      name: "productType",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          { title: "Saree", value: "saree" },
          { title: "Suit", value: "suit" },
          { title: "Coord Set", value: "coordset" },
          { title: "Lehenga", value: "lehenga" },
          { title: "Kurti", value: "kurti" },
          { title: "Dupatta", value: "dupatta" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sizes",
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
          { title: "Free Size", value: "freesize" },
        ],
      },
    }),
    defineField({
      name: "colors",
      title: "Available Colors",
      type: "array",
      of: [{ type: "string" }],
      description: "List all available colors for this product",
    }),
    defineField({
      name: "material",
      title: "Material/Fabric",
      type: "string",
      options: {
        list: [
          { title: "Silk", value: "silk" },
          { title: "Cotton", value: "cotton" },
          { title: "Georgette", value: "georgette" },
          { title: "Chanderi", value: "chanderi" },
          { title: "Linen", value: "linen" },
          { title: "Crepe", value: "crepe" },
          { title: "Velvet", value: "velvet" },
          { title: "Jacquard", value: "jacquard" },
          { title: "Blended", value: "blended" },
        ],
      },
    }),
    defineField({
      name: "careInstructions",
      title: "Care Instructions",
      type: "text",
      description: "How to care for the product (e.g., dry clean, gentle wash)",
    }),
    defineField({
      name: "occasion",
      title: "Occasion",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Casual", value: "casual" },
          { title: "Formal", value: "formal" },
          { title: "Wedding", value: "wedding" },
          { title: "Festival", value: "festival" },
          { title: "Party", value: "party" },
          { title: "Ethnic Wear", value: "ethnic" },
        ],
      },
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Product",
      type: "boolean",
      description: "Toggle to Featured on or off",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images",
      subtitle: "price",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      const image = media && media[0];
      return {
        title: title,
        subtitle: `$${subtitle}`,
        media: image,
      };
    },
  },
});