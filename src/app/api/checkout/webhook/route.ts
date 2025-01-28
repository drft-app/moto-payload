import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getPayloadClient } from '@/getPayload'
import type Stripe from 'stripe'

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('STRIPE_WEBHOOK_SECRET is not set in environment variables')
}

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature') ?? ''

  if (!signature) {
    return NextResponse.json({ error: 'No signature found' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    )
  } catch (err) {
    const error = err as Error
    console.error('Webhook signature verification failed:', error.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const payload = await getPayloadClient()

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const tourDateId = paymentIntent.metadata.tourDateId
        const participantsCount = paymentIntent.metadata.participantsCount

        if (!tourDateId || !participantsCount) {
          throw new Error('Missing required metadata')
        }

        // Update tour date bookings count
        const tourDate = await payload.findByID({
          collection: 'tour-dates',
          id: tourDateId,
        })

        if (tourDate) {
          const newBookingsCount = tourDate.currentBookings + parseInt(participantsCount)
          await payload.update({
            collection: 'tour-dates',
            id: tourDateId,
            data: {
              currentBookings: newBookingsCount,
              availability: newBookingsCount >= tourDate.maxParticipants ? 'full' : 'available',
            },
          })
        }

        // Find and update the booking
        const { docs: bookings } = await payload.find({
          collection: 'bookings',
          where: {
            'payment.stripePaymentIntentId': {
              equals: paymentIntent.id,
            },
          },
        })

        if (bookings?.[0]) {
          const booking = bookings[0]
          await payload.update({
            collection: 'bookings',
            id: booking.id,
            data: {
              status: 'confirmed',
              payment: {
                ...booking.payment,
                status: 'paid',
              },
            },
          })
        }

        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Find and update the booking
        const { docs: bookings } = await payload.find({
          collection: 'bookings',
          where: {
            'payment.stripePaymentIntentId': {
              equals: paymentIntent.id,
            },
          },
        })

        if (bookings?.[0]) {
          const booking = bookings[0]
          await payload.update({
            collection: 'bookings',
            id: booking.id,
            data: {
              status: 'cancelled',
              payment: {
                ...booking.payment,
                status: 'failed',
              },
            },
          })
        }

        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
