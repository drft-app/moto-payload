import type { Page } from '@/payload-types'

export const about: Partial<Page> = {
  slug: 'about',
  _status: 'published',
  title: 'About Us',
  hero: {
    type: 'lowImpact',
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            tag: 'h1',
            children: [
              {
                type: 'text',
                text: 'About China Moto Tours',
                mode: 'normal',
                version: 1,
              },
            ],
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Your trusted partner for unforgettable motorcycle adventures across China',
                mode: 'normal',
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  },
  layout: [
    {
      blockType: 'content',
      columns: [
        {
          size: 'full',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [
                    {
                      type: 'text',
                      text: 'Our Story',
                      mode: 'normal',
                      version: 1,
                    },
                  ],
                  version: 1,
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: "Founded by passionate motorcyclists with deep knowledge of China's diverse landscapes and cultures, China Moto Tours has been leading extraordinary motorcycle adventures since our inception. We combine our love for motorcycling with intimate knowledge of China's most breathtaking routes to create unforgettable touring experiences.",
                      mode: 'normal',
                      version: 1,
                    },
                  ],
                  version: 1,
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [
                    {
                      type: 'text',
                      text: 'Why Choose Us',
                      mode: 'normal',
                      version: 1,
                    },
                  ],
                  version: 1,
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: "• Expert Local Guides: Our team consists of experienced riders who know China's roads and culture intimately\n• Safety First: We maintain a fleet of well-serviced motorcycles and provide comprehensive safety equipment\n• Cultural Immersion: Experience authentic local culture, cuisine, and hospitality along every route\n• Tailored Experiences: From beginner-friendly tours to advanced adventure rides, we have something for every rider\n• 24/7 Support: Full support vehicle backup and experienced team to handle any situation",
                      mode: 'normal',
                      version: 1,
                    },
                  ],
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
        },
      ],
    },
    {
      blockType: 'cta',
      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h3',
              children: [
                {
                  type: 'text',
                  text: 'Ready to Start Your Adventure?',
                  mode: 'normal',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Browse our selection of tours and find your perfect motorcycle adventure in China.',
                  mode: 'normal',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      links: [
        {
          link: {
            type: 'custom',
            url: '/tours',
            label: 'Explore Tours',
            appearance: 'default',
          },
        },
        {
          link: {
            type: 'custom',
            url: '/contact',
            label: 'Contact Us',
            appearance: 'outline',
          },
        },
      ],
    },
  ],
}
