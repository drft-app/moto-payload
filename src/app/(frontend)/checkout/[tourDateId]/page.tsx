import { getPayloadClient } from '@/getPayload'
import { notFound } from 'next/navigation'
import { Checkout } from './Checkout'

interface Props {
  params: {
    tourDateId: string
  }
}

export default async function CheckoutPage({ params: { tourDateId } }: Props) {
  const payload = await getPayloadClient()

  const tourDate = await payload.findByID({
    collection: 'tour-dates',
    id: tourDateId,
    depth: 2,
  })

  if (!tourDate) {
    return notFound()
  }

  if (tourDate.availability === 'full' || tourDate.availability === 'cancelled') {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-red-800 mb-2">Tour Not Available</h1>
          <p className="text-red-600">
            Sorry, this tour is currently {tourDate.availability === 'full' ? 'full' : 'cancelled'}.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Checkout tourDate={tourDate} />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">{tourDate.tour.title}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(tourDate.startDate).toLocaleDateString()} -{' '}
                  {new Date(tourDate.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="font-medium">Price per person</span>
                  <span>${tourDate.price.toLocaleString()}</span>
                </div>
                {tourDate.earlyBirdDiscount && (
                  <div className="flex justify-between text-green-600 text-sm mt-2">
                    <span>Early bird discount</span>
                    <span>-{tourDate.earlyBirdDiscount}%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
