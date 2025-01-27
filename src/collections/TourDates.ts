import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const TourDates: CollectionConfig = {
  slug: 'tour-dates',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'startDate',
    defaultColumns: ['tour', 'startDate', 'endDate', 'availability'],
  },
  fields: [
    {
      name: 'tour',
      type: 'relationship',
      relationTo: 'tours',
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'maxParticipants',
      type: 'number',
      required: true,
      min: 1,
    },
    {
      name: 'currentBookings',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'availability',
      type: 'select',
      required: true,
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Almost Full', value: 'almost-full' },
        { label: 'Full', value: 'full' },
        { label: 'Waiting List', value: 'waiting-list' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Price in USD (can be different from base tour price)',
      },
    },
    {
      name: 'earlyBirdDiscount',
      type: 'number',
      min: 0,
      max: 100,
      admin: {
        description: 'Early bird discount percentage',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this tour date',
      },
    },
  ],
}
