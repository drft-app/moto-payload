import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '../../../../getPayload'
import { Destination } from '../../../../payload-types'
import TourCard from '../../_components/tours/TourCard'
import RichText from '@/components/RichText'

interface Props {
  params: Promise<{ slug: string }>
}

async function getDestination(slug: string): Promise<Destination | null> {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'destinations',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  })

  return (docs[0] as Destination) || null
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params
  const destination = await getDestination(resolvedParams.slug)

  if (!destination) {
    return {
      title: 'Destination Not Found',
    }
  }

  return {
    title: `${destination.name} Motorcycle Tours | China Adventures`,
    description: `Explore motorcycle tours in ${destination.name}. Experience the best riding routes and attractions in this amazing region of China.`,
  }
}

export default async function DestinationPage({ params }: Props) {
  const resolvedParams = await params
  const destination = await getDestination(resolvedParams.slug)

  if (!destination) {
    notFound()
  }

  const regions = {
    north: 'North China',
    south: 'South China',
    east: 'East China',
    west: 'West China',
    central: 'Central China',
    tibet: 'Tibet',
    xinjiang: 'Xinjiang',
  }

  const bestMonths = destination.bestTimeToVisit
    ?.map((time) => {
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      return monthNames[parseInt(time.month) - 1]
    })
    .join(', ')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        {destination.featuredImage &&
          typeof destination.featuredImage === 'object' &&
          'url' in destination.featuredImage && (
            <Image
              src={destination.featuredImage.url || ''}
              alt={destination.name}
              fill
              className="object-cover"
              priority
            />
          )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{destination.name}</h1>
              <div className="text-white text-lg">
                {regions[destination.region as keyof typeof regions]}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">About {destination.name}</h2>
              <div className="prose max-w-none">
                <RichText data={destination.description} />
              </div>
            </section>

            {/* Highlights */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-6">Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.highlights?.map((highlight) => (
                  <div
                    key={highlight.highlight}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <svg
                      className="w-6 h-6 text-primary-600 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{highlight.highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Photo Gallery */}
            {destination.gallery && destination.gallery.length > 0 && (
              <section className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {destination.gallery.map((item, index) => (
                    <div key={index} className="relative aspect-square">
                      {item.image && typeof item.image === 'object' && 'url' in item.image && (
                        <Image
                          src={item.image.url || ''}
                          alt={`${destination.name} gallery image ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Available Tours */}
            {destination.relatedTours && destination.relatedTours.length > 0 && (
              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6">Available Tours</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {destination.relatedTours?.map(
                    (tour) =>
                      typeof tour === 'object' &&
                      'id' in tour && <TourCard key={tour.id} tour={tour} />,
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              {/* Best Time to Visit */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Best Time to Visit</h3>
                <p className="text-gray-600">{bestMonths}</p>
              </div>

              {/* Quick Facts */}
              <div className="space-y-4">
                <h3 className="font-semibold">Quick Facts</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg
                      className="w-5 h-5 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                    <span>Region: {regions[destination.region as keyof typeof regions]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg
                      className="w-5 h-5 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                      />
                    </svg>
                    <span>{destination.relatedTours?.length || 0} tours available</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href="/contact"
                className="block w-full text-center bg-primary-600 text-white py-3 rounded-lg mt-6 hover:bg-primary-700"
              >
                Inquire About Tours
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
