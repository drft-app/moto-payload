import React from 'react'
import Link from 'next/link'
import { getPayloadClient } from '../../../../getPayload'
import { TourDate } from '../../../../payload-types'

interface Props {
  tourId: string
}

async function getTourDates(tourId: string): Promise<TourDate[]> {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'tour-dates',
    where: {
      tour: {
        equals: tourId,
      },
      startDate: {
        greater_than: new Date().toISOString(),
      },
    },
    sort: 'startDate',
  })

  return docs as TourDate[]
}

export default async function TourDatesSection({ tourId }: Props) {
  const dates = await getTourDates(tourId)

  if (dates.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-600">No upcoming dates available</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Request Custom Date
        </button>
      </div>
    )
  }

  return (
    <div>
      <h3 className="font-semibold mb-4">Upcoming Dates</h3>
      <div className="space-y-4">
        {dates.map((date) => (
          <div
            key={date.id}
            className="border rounded-lg p-4 hover:border-primary-600 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium">
                  {new Date(date.startDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
                <div className="text-sm text-gray-600">
                  {date.currentBookings}/{date.maxParticipants} spots filled
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary-600">${date.price.toLocaleString()}</div>
                {date.earlyBirdDiscount && (
                  <div className="text-sm text-green-600">
                    {date.earlyBirdDiscount}% early bird discount
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  date.availability === 'available'
                    ? 'bg-green-100 text-green-800'
                    : date.availability === 'almost-full'
                      ? 'bg-yellow-100 text-yellow-800'
                      : date.availability === 'waiting-list'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                }`}
              >
                {date.availability
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </span>
              {date.availability === 'full' || date.availability === 'cancelled' ? (
                <button
                  className="px-4 py-2 rounded-lg bg-gray-300 text-gray-600 cursor-not-allowed"
                  disabled
                >
                  {date.availability === 'full' ? 'Full' : 'Cancelled'}
                </button>
              ) : (
                <Link
                  href={`/checkout/${date.id}`}
                  className={`px-4 py-2 rounded-lg ${
                    date.availability === 'waiting-list'
                      ? 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                      : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                >
                  {date.availability === 'waiting-list' ? 'Join Waitlist' : 'Book Now'}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
