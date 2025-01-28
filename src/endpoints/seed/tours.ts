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
    difficulty: 'challenging',
    duration: 15,
    price: 4999,
    shortDescription:
      "Epic 15-day journey through ancient trade routes, desert landscapes, and historic cities along China's legendary Silk Road.",
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
  {
    title: 'Tibet Expedition',
    slug: 'tibet-expedition',
    _status: 'published',
    difficulty: 'expert',
    duration: 12,
    price: 5999,
    shortDescription:
      "High-altitude adventure through Tibet's stunning monasteries, mountain passes, and unique culture.",
    fullDescription: createRichText(
      "Journey to the roof of the world on this challenging high-altitude expedition. Ride through the Himalayas, visit ancient monasteries, and experience the unique Tibetan culture while testing your riding skills on some of the world's most spectacular roads.",
    ),
    featuredImage: '{{IMAGE_1}}',
    itinerary: [
      {
        day: 1,
        title: 'Lhasa Acclimatization',
        description: createRichText(
          'Arrival in Lhasa, acclimatization, and visit to Potala Palace.',
        ),
        distance: 0,
      },
      {
        day: 2,
        title: 'Lhasa to Gyantse',
        description: createRichText(
          'First riding day, crossing Kamba La Pass (4794m) with views of Yamdrok Lake.',
        ),
        distance: 261,
      },
    ],
    included: [
      { item: 'High-altitude modified adventure motorcycle' },
      { item: 'Oxygen supply and medical support' },
      { item: 'Tibet travel permits and visas' },
      { item: 'All meals and accommodation' },
    ],
    requirements: [
      { requirement: 'Previous high-altitude riding experience' },
      { requirement: 'Excellent physical fitness' },
      { requirement: 'Medical clearance for high-altitude travel' },
    ],
  },
  {
    title: 'Great Wall Ride',
    slug: 'great-wall-ride',
    _status: 'published',
    difficulty: 'moderate',
    duration: 7,
    price: 2999,
    shortDescription:
      'Seven days following the ancient Great Wall through rugged mountains and historic watchtowers.',
    fullDescription: createRichText(
      "Experience the majesty of the Great Wall from two wheels on this incredible journey. Ride along ancient sections of the wall, explore hidden watchtowers, and camp under the stars in some of China's most scenic locations.",
    ),
    featuredImage: '{{IMAGE_1}}',
    itinerary: [
      {
        day: 1,
        title: 'Beijing to Mutianyu',
        description: createRichText(
          'Ride to Mutianyu Great Wall section, afternoon hiking and photography.',
        ),
        distance: 150,
      },
      {
        day: 2,
        title: 'Mutianyu to Gubeikou',
        description: createRichText(
          'Off-road adventure following the wall through mountains and forests.',
        ),
        distance: 180,
      },
    ],
    included: [
      { item: 'Choice of adventure motorcycles' },
      { item: 'Mix of hotel and luxury camping accommodation' },
      { item: 'Professional photography service' },
      { item: 'All meals and snacks' },
    ],
    requirements: [
      { requirement: 'Valid motorcycle license' },
      { requirement: 'Moderate fitness level' },
      { requirement: 'Comfortable with off-road riding' },
    ],
  },
]
