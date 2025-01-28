import React from 'react'
import { fetchFeaturedTours } from '@/app/(frontend)/_api/fetchTours'
import TourCard from '@/app/(frontend)/_components/tours/TourCard'

interface Props {
  heading: string
}

export const FeaturedToursBlock: React.FC<Props> = async ({ heading }) => {
  const tours = await fetchFeaturedTours()

  if (!tours.length) {
    return null
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  )
}
