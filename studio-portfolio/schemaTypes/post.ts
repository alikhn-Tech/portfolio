import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO & Sharing'},
  ],
  fields: [
    // --- Main information ---
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'content',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Short teaser shown on blog cards and in search results.',
      validation: (Rule) => Rule.max(300).warning('Keep excerpts under ~160 characters for SEO.'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility and SEO.',
        }),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'content',
      to: {type: 'author'},
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      group: 'content',
      to: {type: 'category'},
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
      of: [{type: 'reference', to: {type: 'tag'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      group: 'content',
      options: {dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      group: 'content',
      description: 'Estimated reading time. Leave blank to auto-calculate from content.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      group: 'content',
      description: 'Show this article in the featured section at the top of /blog.',
      initialValue: false,
    }),
    // --- Rich content editor (Portable Text) ---
    defineField({
      name: 'body',
      title: 'Article Content',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        // Inline images with captions
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', title: 'Alt Text', type: 'string'}),
            defineField({name: 'caption', title: 'Caption', type: 'string'}),
          ],
        },
        // Code blocks
        {
          type: 'object',
          name: 'code',
          title: 'Code Block',
          fields: [
            {name: 'language', title: 'Language', type: 'string'},
            {name: 'filename', title: 'Filename', type: 'string'},
            {name: 'code', title: 'Code', type: 'text', rows: 10},
          ],
          preview: {
            select: {title: 'language', subtitle: 'filename'},
          },
        },
      ],
    }),
    // --- Related articles ---
    defineField({
      name: 'relatedPosts',
      title: 'Related Articles',
      description: 'Manually curate related posts (otherwise auto-selected by category).',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'reference',
          to: {type: 'post'},
          options: {
            filter: ({document}: any) => ({
              filter: '_id != $excludeId && !(_id in path("drafts.**"))',
              filterParams: {excludeId: (document?._id ?? '').replace(/^drafts\./, '')},
            }),
          },
        },
      ],
    }),
    // --- SEO group ---
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'object',
      group: 'seo',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'title',
          title: 'SEO Title',
          type: 'string',
          description: 'Used in browser tab + Google result title. Falls back to post title.',
          validation: (Rule) => Rule.max(60).warning('Recommended: under 60 characters.'),
        }),
        defineField({
          name: 'description',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
          description: 'Falls back to excerpt if empty.',
          validation: (Rule) => Rule.max(160).warning('Recommended: 150-160 characters.'),
        }),
        defineField({
          name: 'ogImage',
          title: 'Social Sharing Image',
          type: 'image',
          description: 'Shown when shared on WhatsApp, LinkedIn, X etc. Falls back to featured image.',
          options: {hotspot: true},
          fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
        }),
        defineField({
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description: 'Only set if this article is also published elsewhere.',
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
      media: 'mainImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled article',
        subtitle: subtitle ? `Category: ${subtitle}` : 'No category',
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Publish Date — Newest',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Publish Date — Oldest',
      name: 'publishedAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
  ],
})
