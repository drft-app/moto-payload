import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '../../../getPayload'
import { Destination } from '../../../payload-types'

export const metadata: Metadata = {
  title: 'Motorcycle Tour Destinations in China',
  description:
    'Explore our motorcycle tour destinations across China, from the Great Wall to the Tibetan Plateau.',
}

async function getDestinations(): Promise<Destination[]> {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'destinations',
    sort: 'name',
  })

  return docs as Destination[]
}

export default async function DestinationsPage() {
  const destinations = await getDestinations()

  const regions = [
    { value: 'north', label: 'North China' },
    { value: 'south', label: 'South China' },
    { value: 'east', label: 'East China' },
    { value: 'west', label: 'West China' },
    { value: 'central', label: 'Central China' },
    { value: 'tibet', label: 'Tibet' },
    { value: 'xinjiang', label: 'Xinjiang' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Tour Destinations</h1>

      {/* Regions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {regions.map((region) => {
          const regionDestinations = destinations.filter((dest) => dest.region === region.value)

          return (
            <div key={region.value} className="space-y-4">
              <h2 className="text-2xl font-semibold">{region.label}</h2>
              <div className="space-y-2">
                {regionDestinations.map((destination) => (
                  <Link
                    key={destination.id}
                    href={`/destinations/${destination.slug}`}
                    className="block hover:text-primary-600"
                  >
                    {destination.name}
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Featured Destinations */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Featured Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations
            .filter((dest) => dest.featured)
            .map((destination) => (
              <Link
                key={destination.id}
                href={`/destinations/${destination.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48">
                    {destination.featuredImage && 'url' in destination.featuredImage && (
                      <Image
                        src={destination.featuredImage.url}
                        alt={destination.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600">
                      {destination.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="capitalize">
                        {regions.find((r) => r.value === destination.region)?.label}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{destination.relatedTours?.length || 0} tours available</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
