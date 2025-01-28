import { getPayloadClient } from '@/getPayload'
import { stripe } from '@/lib/stripe'
import Link from 'next/link'

interface Props {
  searchParams: Promise<{
    session_id?: string
  }>
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const { session_id } = await searchParams
  const sessionId = session_id?.replace('{CHECKOUT_SESSION_ID}', '')

  if (!sessionId) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Invalid Session</h1>
          <p className="text-gray-600 mb-8">
            We couldn&apos;t find your booking. Please contact support if you believe this is an
            error.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const payload = await getPayloadClient()

    const booking = await payload.findByID({
      collection: 'bookings',
      id: session.metadata?.bookingId as string,
      depth: 2,
    })

    if (!booking) {
      throw new Error('Booking not found')
    }

    const tourDate = booking.tourDate as any

    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              {session.status === 'complete'
                ? '🎉 Thank You for Your Booking!'
                : 'Processing Your Booking...'}
            </h1>
            <p className="text-gray-600">
              {session.status === 'complete'
                ? 'Your payment has been confirmed and your booking is now complete.'
                : 'Your payment is being processed. We will send you a confirmation email once completed.'}
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Booking Details</h2>
                <p className="text-gray-600">Reference: {booking.bookingReference}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Tour Information</h3>
                <p className="text-gray-800">{tourDate.tour.title}</p>
                <p className="text-gray-600">
                  {new Date(tourDate.startDate).toLocaleDateString()} to{' '}
                  {new Date(tourDate.endDate).toLocaleDateString()}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Payment Status</h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${
                    session.status === 'complete'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {session.status === 'complete' ? 'Paid' : 'Processing'}
                </span>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium mb-2">What&apos;s Next?</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>You will receive a confirmation email with your booking details</li>
                  <li>Our team will contact you with pre-trip information</li>
                  <li>Make sure to review our tour guidelines and requirements before the trip</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error retrieving session:', error)
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Something Went Wrong</h1>
          <p className="text-gray-600 mb-8">
            We couldn&apos;t retrieve your booking information. Please contact support if you need
            assistance.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Return Home
          </Link>
        </div>
      </div>
    )
  }
}
