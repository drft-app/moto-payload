import type { Block } from 'payload'

export const FeaturedTours: Block = {
  slug: 'featuredTours',
  interfaceName: 'FeaturedToursBlock',
  labels: {
    singular: 'Featured Tours Block',
    plural: 'Featured Tours Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
  ],
}
