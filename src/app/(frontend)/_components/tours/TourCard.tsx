import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Tour } from '../../../../payload-types'

interface TourCardProps {
  tour: Tour
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <Link href={`/tours/${tour.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="relative h-48">
          {tour.featuredImage &&
            typeof tour.featuredImage === 'object' &&
            'url' in tour.featuredImage && (
              <Image
                src={tour.featuredImage.url || ''}
                alt={tour.title}
                fill
                className="object-cover"
              />
            )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="text-white">
              <span className="inline-block px-2 py-1 text-sm bg-primary-600 rounded-full">
                {tour.duration} days
              </span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600">{tour.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.shortDescription}</p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-primary-600">
                ${tour.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 ml-1">USD</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  tour.difficulty === 'easy'
                    ? 'bg-green-100 text-green-800'
                    : tour.difficulty === 'moderate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : tour.difficulty === 'challenging'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                }`}
              >
                {tour.difficulty.charAt(0).toUpperCase() + tour.difficulty.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
