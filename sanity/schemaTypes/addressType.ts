import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const addressType = defineType({
  name: "address",
  title: "Addresses",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Address Name",
      type: "string",
      description: "A friendly name for this address (e.g. Home, Work)",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      description: "Recipient's full name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      description: "Contact number (10 digits)",
      validation: (Rule) => Rule.required().regex(/^[0-9]{10}$/, {
        name: "phoneNumber",
      }),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Street Address",
      type: "string",
      description: "House number, street name, and apartment/unit number",
      validation: (Rule) => Rule.required().min(5).max(150),
    }),
    defineField({
      name: "landmark",
      title: "Landmark",
      type: "string",
      description: "Nearby landmark for reference",
    }),
    defineField({
      name: "city",
      title: "City/Town",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      options: {
        list: [
          { title: "Andhra Pradesh", value: "AP" },
          { title: "Arunachal Pradesh", value: "AR" },
          { title: "Assam", value: "AS" },
          { title: "Bihar", value: "BR" },
          { title: "Chhattisgarh", value: "CT" },
          { title: "Goa", value: "GA" },
          { title: "Gujarat", value: "GJ" },
          { title: "Haryana", value: "HR" },
          { title: "Himachal Pradesh", value: "HP" },
          { title: "Jharkhand", value: "JH" },
          { title: "Karnataka", value: "KA" },
          { title: "Kerala", value: "KL" },
          { title: "Madhya Pradesh", value: "MP" },
          { title: "Maharashtra", value: "MH" },
          { title: "Manipur", value: "MN" },
          { title: "Meghalaya", value: "ML" },
          { title: "Mizoram", value: "MZ" },
          { title: "Nagaland", value: "NL" },
          { title: "Odisha", value: "OR" },
          { title: "Punjab", value: "PB" },
          { title: "Rajasthan", value: "RJ" },
          { title: "Sikkim", value: "SK" },
          { title: "Tamil Nadu", value: "TN" },
          { title: "Telangana", value: "TG" },
          { title: "Tripura", value: "TR" },
          { title: "Uttar Pradesh", value: "UP" },
          { title: "Uttarakhand", value: "UK" },
          { title: "West Bengal", value: "WB" },
          { title: "Delhi", value: "DL" },
          { title: "Puducherry", value: "PY" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pinCode",
      title: "PIN Code",
      type: "string",
      description: "6-digit PIN code",
      validation: (Rule) => Rule.required().regex(/^[0-9]{6}$/, {
        name: "pinCode",
      }),
    }),
    defineField({
      name: "default",
      title: "Default Address",
      type: "boolean",
      description: "Is this the default shipping address?",
      initialValue: false,
    }),

    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "address",
      city: "city",
      state: "state",
      isDefault: "default",
    },
    prepare({ title, subtitle, city, state, isDefault }) {
      return {
        title: `${title} ${isDefault ? "(Default)" : ""}`,
        subtitle: `${subtitle}, ${city}, ${state}`,
      };
    },
  },
});