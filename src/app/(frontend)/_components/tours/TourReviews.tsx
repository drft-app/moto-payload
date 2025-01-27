import React from 'react'
import Image from 'next/image'
import { getPayloadClient } from '../../../../getPayload'
import { Review } from '../../../../payload-types'

interface Props {
  tourId: string
}

async function getTourReviews(tourId: string): Promise<Review[]> {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'reviews',
    where: {
      tour: {
        equals: tourId,
      },
      approved: {
        equals: true,
      },
    },
    sort: '-tourDate',
  })

  return docs as Review[]
}

function StarRating({ rating }: { rating: string }) {
  const stars = parseInt(rating)
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < stars ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default async function TourReviews({ tourId }: Props) {
  const reviews = await getTourReviews(tourId)

  if (reviews.length === 0) {
    return (
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <p className="text-gray-600">No reviews yet. Be the first to review this tour!</p>
      </section>
    )
  }

  const averageRating =
    reviews.reduce((acc, review) => acc + parseInt(review.rating), 0) / reviews.length

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        <div className="flex items-center gap-2">
          <StarRating rating={Math.round(averageRating).toString()} />
          <span className="text-gray-600">
            {averageRating.toFixed(1)} ({reviews.length} reviews)
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-start gap-4">
              {review.customerPhoto &&
              typeof review.customerPhoto === 'object' &&
              'url' in review.customerPhoto ? (
                <div className="relative w-12 h-12">
                  <Image
                    src={review.customerPhoto.url || ''}
                    alt={review.customerName}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl text-gray-600">{review.customerName.charAt(0)}</span>
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold">{review.customerName}</h3>
                  <span className="text-sm text-gray-600">
                    {new Date(review.tourDate).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <StarRating rating={review.rating} />
                <p className="mt-2 text-gray-600">{review.review}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
