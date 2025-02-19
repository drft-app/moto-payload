import { defaultLexical } from '@/fields/defaultLexical'
import { slugField } from '@/fields/slug'
import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Tours: CollectionConfig = {
  slug: 'tours',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'duration', 'price'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'fullDescription',
      type: 'richText',
      required: true,
      editor: defaultLexical,
    },
    {
      name: 'duration',
      type: 'number',
      required: true,
      min: 1,
      admin: {
        description: 'Duration in days',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Price in USD',
      },
    },
    {
      name: 'included',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'itinerary',
      type: 'array',
      fields: [
        {
          name: 'day',
          type: 'number',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          editor: defaultLexical,
          required: true,
        },
        {
          name: 'distance',
          type: 'number',
          admin: {
            description: 'Distance in kilometers',
          },
        },
      ],
    },
    {
      name: 'requirements',
      type: 'array',
      fields: [
        {
          name: 'requirement',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'motorcycles',
      type: 'array',
      fields: [
        {
          name: 'model',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this tour on the homepage',
      },
    },
  ],
}
