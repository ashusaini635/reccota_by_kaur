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
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "basePrice",
      title: "Base Price",
      type: "number",
      description: "Starting or base price for this product",
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
      name: "variants",
      title: "Product Variants",
      type: "array",
      description: "Add specific size and color combinations and track their stock individually.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "variantId",
              title: "Variant ID / SKU",
              type: "slug",
              description: "Click 'Generate' to auto-create a unique identifier for this variant.",
              options: {
                source: (doc, options: any) => {
                  const productName = doc?.name || "product";
                  const color = options?.parent?.color || "";
                  const size = Array.isArray(options?.parent?.size) ? options.parent.size.join("-") : (options?.parent?.size || "");
                  // Combine the product name, color, and size with hyphens
                  return [productName, color, size].filter(Boolean).join("-");
                },
                maxLength: 200,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "size",
              title: "Size",
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
              name: "color",
              title: "Color",
              type: "string",
            }),
            defineField({
              name: "price",
              title: "Variant Price",
              type: "number",
              description: "Specific price for this variant (overrides base price)",
            }),
            defineField({
              name: "stock",
              title: "Variant Stock",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "images",
              title: "Variant Images",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
              description: "Images specific to this variant (e.g., specific color images).",
            }),
          ],
          preview: {
            select: { size: "size", color: "color", stock: "stock", media: "images" },
            prepare({ size, color, stock, media }) {
              const image = media && media[0];
              const sizeLabel = Array.isArray(size) ? size.join(', ').toUpperCase() : (size || 'Any Size');
              return {
                title: `${color || 'Any Color'} - ${sizeLabel}`,
                subtitle: `Stock: ${stock ?? 0}`,
                media: image,
              };
            },
          },
        },
      ],
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
      media: "variants.0.images.0",
      subtitle: "basePrice",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: subtitle ? `$${subtitle}` : 'No base price',
        media: media,
      };
    },
  },
});