import { Tour } from '@/payload-types'
import { getPayloadClient } from '@/getPayload'

export type TourFilters = {
  difficulty?: string
  region?: string
  minPrice?: number
  maxPrice?: number
  duration?: number
}

export async function fetchTours(filters?: TourFilters): Promise<Tour[]> {
  const payload = await getPayloadClient()

  const query = {
    ...(filters?.difficulty && { difficulty: { equals: filters.difficulty } }),
    ...(filters?.minPrice && { price: { greater_than_equal: filters.minPrice } }),
    ...(filters?.maxPrice && { price: { less_than_equal: filters.maxPrice } }),
    ...(filters?.duration && { duration: { equals: filters.duration } }),
  }

  const { docs: tours } = await payload.find({
    collection: 'tours',
    where: query,
    depth: 1,
  })

  return tours as Tour[]
}
