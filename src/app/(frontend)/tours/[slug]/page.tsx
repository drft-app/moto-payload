import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/getPayload'
import { Tour } from '@/payload-types'
import TourDatesSection from '@/app/(frontend)/_components/tours/TourDatesSection'
import TourReviews from '@/app/(frontend)/_components/tours/TourReviews'
import RichText from '@/components/RichText'

export const revalidate = 600

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const tours = await payload.find({
    collection: 'tours',
    limit: 1000,
    depth: 0,
    select: {
      slug: true,
    },
  })

  return tours.docs.map(({ slug }) => ({
    slug,
  }))
}

interface Props {
  params: Promise<{ slug: string }>
}

async function getTour(slug: string): Promise<Tour | null> {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'tours',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  })

  return (docs[0] as Tour) || null
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params
  const tour = await getTour(resolvedParams.slug)

  if (!tour) {
    return {
      title: 'Tour Not Found',
    }
  }

  return {
    title: `${tour.title} | China Motorcycle Tours`,
    description: tour.shortDescription,
  }
}

export default async function TourPage({ params }: Props) {
  const resolvedParams = await params
  const tour = await getTour(resolvedParams.slug)

  if (!tour) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Title Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-5xl font-black mb-4">{tour.title}</h1>
          <div className="text-xl">from ${tour.price.toLocaleString()}</div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        {tour.featuredImage &&
          typeof tour.featuredImage === 'object' &&
          'url' in tour.featuredImage && (
            <Image
              src={tour.featuredImage.url || ''}
              alt={tour.title}
              fill
              className="object-cover"
              priority
            />
          )}
      </div>

      {/* Facts Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8">Facts</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Start/End */}
              <div>
                <h3 className="text-blue-800 uppercase font-medium text-sm mb-2">Start / End</h3>
                <p className="text-lg font-bold">
                  {tour.startLocation} / {tour.endLocation}
                </p>
              </div>

              {/* Next Airport */}
              <div>
                <h3 className="text-blue-800 uppercase font-medium text-sm mb-2">Next Airport</h3>
                <p className="text-lg font-bold">
                  {tour.startAirport} / {tour.endAirport}
                </p>
              </div>

              {/* Tour Duration */}
              <div>
                <h3 className="text-blue-800 uppercase font-medium text-sm mb-2">Tour Duration</h3>
                <p className="text-lg font-bold">
                  {tour.duration} Days vacation, {tour.ridingDays} Riding days
                </p>
              </div>

              {/* Distance */}
              <div>
                <h3 className="text-blue-800 uppercase font-medium text-sm mb-2">Distance</h3>
                <p className="text-lg font-bold">
                  Full distance: {tour.totalDistance.min.toLocaleString()}-
                  {tour.totalDistance.max.toLocaleString()} km,{' '}
                  {Math.round(tour.totalDistance.min * 0.621371)}-
                  {Math.round(tour.totalDistance.max * 0.621371)} miles
                </p>
                <p className="text-lg font-bold">
                  Daily distances: {tour.dailyDistance.min}-{tour.dailyDistance.max} km,{' '}
                  {Math.round(tour.dailyDistance.min * 0.621371)}-
                  {Math.round(tour.dailyDistance.max * 0.621371)} miles
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Difficulty */}
              <div>
                <h3 className="text-blue-800 uppercase font-medium text-sm mb-2">Difficulty</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < tour.difficulty ? 'bg-blue-800' : 'border border-blue-800'
                      } mr-1`}
                    />
                  ))}
                </div>
              </div>

              {/* Travel Time/Day */}
              <div>
                <h3 className="text-blue-800 uppercase font-medium text-sm mb-2">
                  Travel Time / Day
                </h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < tour.travelTimeRating ? 'bg-blue-800' : 'border border-blue-800'
                      } mr-1`}
                    />
                  ))}
                </div>
              </div>

              {/* Sightseeing */}
              <div>
                <h3 className="text-blue-800 uppercase font-medium text-sm mb-2">Sightseeing</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < tour.sightseeing ? 'bg-blue-800' : 'border border-blue-800'
                      } mr-1`}
                    />
                  ))}
                </div>
              </div>

              {/* Minimum Participants */}
              <div>
                <h3 className="text-blue-800 uppercase font-medium text-sm mb-2">
                  Minimum Participants
                </h3>
                <p className="text-lg font-bold">{tour.minimumParticipants}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <p className="text-xl font-bold mb-8">{tour.subtitle}</p>
        <div>
          {/* Main Content */}
          {/* Overview */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <RichText data={tour.fullDescription} className="max-w-none" />
          </section>

          {/* Itinerary */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Tour Itinerary</h2>
            <div className="space-y-8">
              {tour.itinerary?.map((day) => (
                <div
                  key={day.day}
                  className="relative pl-8 pb-8 border-l-2 border-primary-200 last:pb-0"
                >
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary-600" />
                  <h3 className="text-lg font-semibold mb-2">
                    Day {day.day}: {day.title}
                  </h3>
                  <div className="prose max-w-none">
                    <RichText data={day.description} />
                  </div>
                  {day.distance && (
                    <p className="text-sm text-gray-600 mt-2">Riding Distance: {day.distance} km</p>
                  )}
                </div>
              ))}
            </div>
            {/* Tour Book Download */}
            {tour.tourBookLink && (
              <div className="mt-12">
                <a
                  href={tour.tourBookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-2xl font-bold text-blue-800 hover:text-blue-900 mb-8"
                >
                  Download mini tour book
                  <svg
                    className="w-6 h-6 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            )}
          </section>

          {/* Tour Details */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            {/* Included Services */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-3">Included Services</h3>
              <ul className="space-y-2">
                {tour.included?.map((item) => (
                  <li key={item.item} className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
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
                    {item.item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Costs */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-3">Additional Costs</h3>
              <ul className="space-y-2">
                {tour.additionalCosts?.map((cost) => (
                  <li key={cost.item} className="flex items-start text-gray-600">
                    <svg
                      className="w-5 h-5 text-primary-600 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {cost.item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Motorcycles */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Available Motorcycles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tour.motorcycles?.map((motorcycle) => (
                <div key={motorcycle.model} className="flex gap-4">
                  {motorcycle.image &&
                    typeof motorcycle.image === 'object' &&
                    'url' in motorcycle.image && (
                      <div className="relative w-24 h-24">
                        <Image
                          src={motorcycle.image.url || ''}
                          alt={motorcycle.model}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    )}
                  <div>
                    <h3 className="font-semibold mb-1">{motorcycle.model}</h3>
                    <p className="text-sm text-gray-600">{motorcycle.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Available Dates */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <TourDatesSection tourId={tour.id} />
          </section>
        </div>
      </div>
    </div>
  )
}
