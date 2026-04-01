import { Mail } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: 'contact',
  title: 'Contact Messages',
  type: 'document',
  icon: Mail,
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', readOnly: true }),
    defineField({ name: 'email', title: 'Email', type: 'string', readOnly: true }),
    defineField({ name: 'subject', title: 'Subject', type: 'string', readOnly: true }),
    defineField({ name: 'message', title: 'Message', type: 'text', readOnly: true }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Unread', value: 'unread' },
          { title: 'Read', value: 'read' },
          { title: 'Replied', value: 'replied' },
        ],
      },
      initialValue: 'unread'
    }),
    defineField({ name: 'createdAt', title: 'Submitted At', type: 'datetime', readOnly: true }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subject',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      return {
        title: `${title}`,
        subtitle: `${status.toUpperCase()} - ${subtitle}`,
      }
    }
  }
});
