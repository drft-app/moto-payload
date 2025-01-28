import { getPayloadClient } from '@/getPayload'
import { NextResponse } from 'next/server'

function generateBookingReference(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `BK-${timestamp}-${random}`
}

export async function POST(req: Request) {
  try {
    const payload = await getPayloadClient()
    const body = await req.json()
    const { tourDateId, customer, participants, paymentIntentId, amount } = body

    // Create booking
    const booking = await payload.create({
      collection: 'bookings',
      data: {
        bookingReference: generateBookingReference(),
        tourDate: tourDateId,
        customer,
        participants,
        payment: {
          amount,
          currency: 'USD',
          stripePaymentIntentId: paymentIntentId,
          status: 'pending',
        },
        status: 'pending',
      },
    })

    return NextResponse.json({ booking })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ error: 'Error creating booking' }, { status: 500 })
  }
}
