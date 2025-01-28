import { getPayloadClient } from '@/getPayload'
import { createPaymentIntent } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const payload = await getPayloadClient()
    const body = await req.json()
    const { tourDateId, participants } = body

    // Fetch tour date details
    const tourDate = await payload.findByID({
      collection: 'tour-dates',
      id: tourDateId,
      depth: 2,
    })

    if (!tourDate) {
      return NextResponse.json({ error: 'Tour date not found' }, { status: 404 })
    }

    // Check availability
    if (tourDate.availability === 'full' || tourDate.availability === 'cancelled') {
      return NextResponse.json({ error: 'Tour is not available for booking' }, { status: 400 })
    }

    if (tourDate.currentBookings + participants.length > tourDate.maxParticipants) {
      return NextResponse.json({ error: 'Not enough spots available' }, { status: 400 })
    }

    // Calculate total amount
    const amount = tourDate.price * participants.length

    // Create payment intent
    const paymentIntent = await createPaymentIntent({
      amount,
      metadata: {
        tourDateId,
        participantsCount: participants.length.toString(),
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json({ error: 'Error creating payment' }, { status: 500 })
  }
}
