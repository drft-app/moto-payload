import { TourDate } from '@/payload-types'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set')
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

interface CheckoutFormData {
  customer: {
    email: string
    fullName: string
    phone: string
    address: {
      line1: string
      line2?: string
      city: string
      state: string
      postalCode: string
      country: string
    }
  }
  participants: Array<{
    fullName: string
    email: string
    phone: string
    emergencyContact: {
      name: string
      phone: string
      relationship: string
    }
  }>
}

interface Props {
  tourDate: TourDate
}

export function Checkout({ tourDate }: Props) {
  const [clientSecret, setClientSecret] = useState('')
  const [step, setStep] = useState<'details' | 'payment'>('details')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CheckoutFormData>({
    defaultValues: {
      participants: [
        {
          fullName: '',
          email: '',
          phone: '',
          emergencyContact: {
            name: '',
            phone: '',
            relationship: '',
          },
        },
      ],
    },
  })

  const participants = watch('participants')

  const onSubmitDetails = async (data: CheckoutFormData) => {
    try {
      setLoading(true)
      setError('')

      // Create booking first
      const bookingResponse = await fetch('/api/checkout/create-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourDateId: tourDate.id,
          customer: data.customer,
          participants: data.participants,
          amount: tourDate.price * data.participants.length,
        }),
      })

      if (!bookingResponse.ok) {
        throw new Error('Failed to create booking')
      }

      const { booking } = await bookingResponse.json()

      // Create checkout session
      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking.id,
          tourDateId: tourDate.id,
          participants: data.participants.length,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { clientSecret } = await response.json()
      setClientSecret(clientSecret)
      setStep('payment')
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (step === 'payment' && clientSecret) {
    return (
      <div className="w-full">
        <button
          onClick={() => setStep('details')}
          className="mb-4 text-gray-600 hover:text-gray-700"
        >
          ← Back to details
        </button>
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmitDetails)} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">{error}</div>
      )}

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Customer Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              {...register('customer.fullName', { required: 'Required' })}
              className="w-full rounded-lg border p-2"
            />
            {errors.customer?.fullName && (
              <p className="text-red-600 text-sm mt-1">{errors.customer.fullName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register('customer.email', { required: 'Required' })}
              className="w-full rounded-lg border p-2"
            />
            {errors.customer?.email && (
              <p className="text-red-600 text-sm mt-1">{errors.customer.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              {...register('customer.phone', { required: 'Required' })}
              className="w-full rounded-lg border p-2"
            />
            {errors.customer?.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.customer.phone.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Billing Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address Line 1</label>
              <input
                type="text"
                {...register('customer.address.line1', { required: 'Required' })}
                className="w-full rounded-lg border p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address Line 2</label>
              <input
                type="text"
                {...register('customer.address.line2')}
                className="w-full rounded-lg border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                {...register('customer.address.city', { required: 'Required' })}
                className="w-full rounded-lg border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State/Province</label>
              <input
                type="text"
                {...register('customer.address.state', { required: 'Required' })}
                className="w-full rounded-lg border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Postal Code</label>
              <input
                type="text"
                {...register('customer.address.postalCode', { required: 'Required' })}
                className="w-full rounded-lg border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                {...register('customer.address.country', { required: 'Required' })}
                className="w-full rounded-lg border p-2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Participants</h2>
          <button
            type="button"
            onClick={() => {
              const current = watch('participants')
              if (current.length < tourDate.maxParticipants - tourDate.currentBookings) {
                setValue('participants', [
                  ...current,
                  {
                    fullName: '',
                    email: '',
                    phone: '',
                    emergencyContact: {
                      name: '',
                      phone: '',
                      relationship: '',
                    },
                  },
                ])
              }
            }}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Add Participant
          </button>
        </div>

        {participants.map((_, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Participant {index + 1}</h3>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const current = watch('participants')
                    setValue(
                      'participants',
                      current.filter((_, i) => i !== index),
                    )
                  }}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  {...register(`participants.${index}.fullName` as const, { required: 'Required' })}
                  className="w-full rounded-lg border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  {...register(`participants.${index}.email` as const, { required: 'Required' })}
                  className="w-full rounded-lg border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  {...register(`participants.${index}.phone` as const, { required: 'Required' })}
                  className="w-full rounded-lg border p-2"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-md font-medium">Emergency Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    {...register(`participants.${index}.emergencyContact.name` as const, {
                      required: 'Required',
                    })}
                    className="w-full rounded-lg border p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    {...register(`participants.${index}.emergencyContact.phone` as const, {
                      required: 'Required',
                    })}
                    className="w-full rounded-lg border p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Relationship</label>
                  <input
                    type="text"
                    {...register(`participants.${index}.emergencyContact.relationship` as const, {
                      required: 'Required',
                    })}
                    className="w-full rounded-lg border p-2"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Continue to Payment'}
        </button>
      </div>
    </form>
  )
}
