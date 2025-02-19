import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Tour } from '../../../../payload-types'

interface TourCardProps {
  tour: Tour
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <Link href={`/tours/${tour.slug}`} className="group block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-[1.02] h-full flex flex-col">
        <div className="relative h-40 sm:h-48">
          {tour.featuredImage &&
            typeof tour.featuredImage === 'object' &&
            'url' in tour.featuredImage && (
              <Image
                src={tour.featuredImage.url || ''}
                alt={tour.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 sm:p-4">
            <div className="text-white">
              <span className="inline-block px-3 py-1 text-sm bg-primary-600 rounded-full">
                {tour.duration} days
              </span>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary-600 line-clamp-2">
            {tour.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{tour.shortDescription}</p>

          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-base sm:text-lg font-bold text-primary-600">
                ${tour.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 ml-1">USD</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
