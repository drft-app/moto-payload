import React from 'react'
import { Metadata } from 'next'
import TourCard from '../_components/tours/TourCard'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Motorcycle Tours in China | Adventure Awaits',
  description:
    'Discover breathtaking motorcycle tours across China. From the Great Wall to the Tibetan Plateau, find your perfect adventure.',
}

export type TourFilters = {
  region?: string
  minPrice?: number
  maxPrice?: number
  duration?: number
}

export default async function ToursPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: tours } = await payload.find({
    collection: 'tours',
    depth: 1,
  })

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8">Motorcycle Tours in China</h1>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
        {/* Tour listings */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
