import type { Tour } from '@/payload-types'

type Direction = 'ltr' | 'rtl' | null
type Format = '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'

const createRichText = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text,
            version: 1,
          },
        ],
        direction: 'ltr' as Direction,
        format: '' as Format,
        indent: 0,
        version: 1,
      },
    ],
    direction: 'ltr' as Direction,
    format: '' as Format,
    indent: 0,
    version: 1,
  },
})

type TourSeed = Omit<Tour, 'id' | 'createdAt' | 'updatedAt'> & {
  _status?: 'draft' | 'published'
}

export const tours: TourSeed[] = [
  {
    title: 'Silk Road Adventure',
    slug: 'silk-road-adventure',
    _status: 'published',
    featured: true,
    duration: 15,
    price: 4999,
    shortDescription:
      "Epic 15-day journey through ancient trade routes, desert landscapes, and historic cities along China's legendary Silk Road.",
    subtitle: 'Silk Road Adventure',
    startLocation: "Xi'an",
    endLocation: 'Urumqi',
    startAirport: 'XIY',
    endAirport: 'URC',
    totalDistance: {
      min: 3000,
      max: 4000,
    },
    dailyDistance: {
      min: 200,
      max: 300,
    },
    difficulty: 4,
    travelTimeRating: 4,
    sightseeing: 4,
    minimumParticipants: 2,
    ridingDays: 10,
    fullDescription: createRichText(
      'Follow in the footsteps of ancient traders on this epic motorcycle adventure along the legendary Silk Road. Experience the stark beauty of the Gobi Desert, explore ancient caravanserais, and ride through the stunning Tianshan Mountains.',
    ),
    featuredImage: '{{IMAGE_1}}',
    itinerary: [
      {
        day: 1,
        title: "Xi'an Arrival",
        description: createRichText(
          'Welcome briefing, motorcycle handover, and visit to the Terracotta Warriors.',
        ),
        distance: 0,
      },
      {
        day: 2,
        title: "Xi'an to Lanzhou",
        description: createRichText(
          'First day of riding through the Loess Plateau, following the ancient Silk Road route.',
        ),
        distance: 350,
      },
    ],
    included: [
      { item: 'BMW GS or KTM Adventure motorcycle rental' },
      { item: 'Experienced tour guides and support vehicle' },
      { item: 'Luxury hotel accommodation' },
      { item: 'All breakfasts and dinners' },
    ],
    requirements: [
      { requirement: 'Valid motorcycle license with at least 3 years experience' },
      { requirement: 'Experience with large adventure motorcycles' },
      { requirement: 'Good physical fitness' },
    ],
  },
]
