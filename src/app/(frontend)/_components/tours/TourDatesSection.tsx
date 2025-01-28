import React from 'react'
import Link from 'next/link'
import { getPayloadClient } from '../../../../getPayload'
import { TourDate } from '../../../../payload-types'
import { CalendarIcon, UsersIcon } from 'lucide-react'

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

  if (!dates || dates.length === 0) {
    return null
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Available Dates</h2>
      <div className="space-y-4">
        {dates.map((date) => {
          const spotsLeft = date.maxParticipants - date.currentBookings

          return (
            <div
              key={date.id}
              className="border rounded-lg p-3 sm:p-4 hover:border-primary-200 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                {/* Date Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarIcon className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">
                      {new Date(date.startDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                      {' - '}
                      {new Date(date.endDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left
                    </span>
                  </div>
                </div>

                {/* Status and Action */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <span
                    className={`text-sm px-3 py-1 rounded-full whitespace-nowrap ${
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
                      className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-300 text-gray-600 cursor-not-allowed"
                      disabled
                    >
                      {date.availability === 'full' ? 'Full' : 'Cancelled'}
                    </button>
                  ) : (
                    <Link
                      href={`/checkout/${date.id}`}
                      className={`w-full sm:w-auto text-center px-4 py-2 rounded-lg ${
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
            </div>
          )
        })}
      </div>
    </section>
  )
}
