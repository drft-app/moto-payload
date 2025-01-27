import React from 'react'
import { Metadata } from 'next'
import { fetchTours } from '../_api/fetchTours'
import TourCard from '../_components/tours/TourCard'
import TourFilters from '../_components/tours/TourFilters'

export const metadata: Metadata = {
  title: 'Motorcycle Tours in China | Adventure Awaits',
  description:
    'Discover breathtaking motorcycle tours across China. From the Great Wall to the Tibetan Plateau, find your perfect adventure.',
}

export default async function ToursPage() {
  const tours = await fetchTours()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Motorcycle Tours in China</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="lg:w-1/4">
          <TourFilters />
        </div>

        {/* Tour listings */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
