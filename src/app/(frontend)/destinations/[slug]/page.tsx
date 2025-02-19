import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '../../../../getPayload'
import { Destination } from '../../../../payload-types'
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
    <div>
      {/* Hero Section */}
      <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh]">
        {destination.featuredImage &&
          typeof destination.featuredImage === 'object' &&
          'url' in destination.featuredImage && (
            <Image
              src={destination.featuredImage.url || ''}
              alt={destination.name}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {destination.name}
            </h1>
            <div className="text-lg sm:text-xl text-white/90 max-w-2xl">
              <RichText data={destination.description} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <section className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <div className="prose max-w-none">
                <RichText data={destination.description} />
              </div>
            </section>

            {/* Photo Gallery */}
            {destination.gallery && destination.gallery.length > 0 && (
              <section className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Photo Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                  {destination.gallery.map((item, index) => (
                    <div key={index} className="relative aspect-square">
                      {item.image && typeof item.image === 'object' && 'url' in item.image && (
                        <Image
                          src={item.image.url || ''}
                          alt={`${destination.name} gallery image ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
