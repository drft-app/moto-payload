import { getPayloadClient } from '@/getPayload'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'
import { Tour } from '@/payload-types'

export async function POST(req: Request) {
  try {
    const payload = await getPayloadClient()
    const body = await req.json()
    const { bookingId, tourDateId, participants } = body

    // Fetch tour date details
    const tourDate = await payload.findByID({
      collection: 'tour-dates',
      id: tourDateId,
      depth: 2,
    })

    if (!tourDate) {
      return NextResponse.json({ error: 'Tour date not found' }, { status: 404 })
    }

    const tour = tourDate.tour as Tour

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: `${tour.title} - ${new Date(tourDate.startDate).toLocaleDateString()} to ${new Date(tourDate.endDate).toLocaleDateString()}`,
              description: `${participants} participant${participants > 1 ? 's' : ''}`,
            },
            unit_amount: Math.round(tourDate.price * 100), // Convert to cents
          },
          quantity: participants,
        },
      ],
      metadata: {
        bookingId,
        tourDateId,
        participants: participants.toString(),
      },
      payment_intent_data: {
        metadata: {
          bookingId,
          tourDateId,
          participants: participants.toString(),
        },
      },
      mode: 'payment',
      return_url: `${req.headers.get('origin')}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    })

    return NextResponse.json({
      clientSecret: session.client_secret,
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 })
  }
}
