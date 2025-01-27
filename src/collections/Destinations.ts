import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'
import { defaultLexical } from '@/fields/defaultLexical'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'region', 'featured'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    ...slugField(),
    {
      name: 'region',
      type: 'select',
      required: true,
      options: [
        { label: 'North China', value: 'north' },
        { label: 'South China', value: 'south' },
        { label: 'East China', value: 'east' },
        { label: 'West China', value: 'west' },
        { label: 'Central China', value: 'central' },
        { label: 'Tibet', value: 'tibet' },
        { label: 'Xinjiang', value: 'xinjiang' },
      ],
    },
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
      name: 'description',
      type: 'richText',
      editor: defaultLexical,
      required: true,
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'highlight',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'bestTimeToVisit',
      type: 'array',
      fields: [
        {
          name: 'month',
          type: 'select',
          required: true,
          options: [
            { label: 'January', value: '1' },
            { label: 'February', value: '2' },
            { label: 'March', value: '3' },
            { label: 'April', value: '4' },
            { label: 'May', value: '5' },
            { label: 'June', value: '6' },
            { label: 'July', value: '7' },
            { label: 'August', value: '8' },
            { label: 'September', value: '9' },
            { label: 'October', value: '10' },
            { label: 'November', value: '11' },
            { label: 'December', value: '12' },
          ],
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this destination on the homepage',
      },
    },
    {
      name: 'relatedTours',
      type: 'relationship',
      relationTo: 'tours',
      hasMany: true,
    },
  ],
}
