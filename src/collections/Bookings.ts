import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  access: {
    create: anyone, // Allow anyone to create a booking
    read: authenticated, // Only authenticated users can view bookings
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'bookingReference',
    defaultColumns: ['bookingReference', 'tourDate', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'bookingReference',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique booking reference number',
      },
    },
    {
      name: 'tourDate',
      type: 'relationship',
      relationTo: 'tour-dates',
      required: true,
    },
    {
      name: 'customer',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'fullName',
          type: 'text',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'address',
          type: 'group',
          fields: [
            {
              name: 'line1',
              type: 'text',
              required: true,
            },
            {
              name: 'line2',
              type: 'text',
            },
            {
              name: 'city',
              type: 'text',
              required: true,
            },
            {
              name: 'state',
              type: 'text',
              required: true,
            },
            {
              name: 'postalCode',
              type: 'text',
              required: true,
            },
            {
              name: 'country',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'participants',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'fullName',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'emergencyContact',
          type: 'group',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'phone',
              type: 'text',
              required: true,
            },
            {
              name: 'relationship',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'payment',
      type: 'group',
      fields: [
        {
          name: 'amount',
          type: 'number',
          required: true,
          min: 0,
        },
        {
          name: 'currency',
          type: 'select',
          defaultValue: 'USD',
          options: [{ label: 'USD', value: 'USD' }],
          required: true,
        },
        {
          name: 'stripePaymentIntentId',
          type: 'text',
          admin: {
            description: 'Stripe Payment Intent ID',
          },
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'pending',
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Processing', value: 'processing' },
            { label: 'Paid', value: 'paid' },
            { label: 'Failed', value: 'failed' },
            { label: 'Refunded', value: 'refunded' },
          ],
          required: true,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this booking',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Generate booking reference if not provided
        if (!data.bookingReference) {
          const timestamp = Date.now().toString(36)
          const random = Math.random().toString(36).substring(2, 7).toUpperCase()
          data.bookingReference = `BK-${timestamp}-${random}`
        }
        return data
      },
    ],
  },
}
