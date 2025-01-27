import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const difficulties = [
  { label: 'Easy', value: 'easy' },
  { label: 'Moderate', value: 'moderate' },
  { label: 'Challenging', value: 'challenging' },
  { label: 'Expert', value: 'expert' },
]

const durations = [
  { label: '1-3 days', value: '3' },
  { label: '4-7 days', value: '7' },
  { label: '8-14 days', value: '14' },
  { label: '15+ days', value: '15' },
]

export default function TourFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentDifficulty = searchParams.get('difficulty')
  const currentDuration = searchParams.get('duration')
  const currentMinPrice = searchParams.get('minPrice')
  const currentMaxPrice = searchParams.get('maxPrice')

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === null) {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    router.push(`/tours?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Filter Tours</h2>

      {/* Difficulty Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Difficulty Level</h3>
        <div className="space-y-2">
          {difficulties.map(({ label, value }) => (
            <label key={value} className="flex items-center">
              <input
                type="radio"
                name="difficulty"
                value={value}
                checked={currentDifficulty === value}
                onChange={(e) => updateFilters('difficulty', e.target.checked ? value : null)}
                className="mr-2"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Duration Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Duration</h3>
        <div className="space-y-2">
          {durations.map(({ label, value }) => (
            <label key={value} className="flex items-center">
              <input
                type="radio"
                name="duration"
                value={value}
                checked={currentDuration === value}
                onChange={(e) => updateFilters('duration', e.target.checked ? value : null)}
                className="mr-2"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Price Range (USD)</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Min Price</label>
            <input
              type="number"
              value={currentMinPrice || ''}
              onChange={(e) => updateFilters('minPrice', e.target.value || null)}
              className="w-full px-3 py-2 border rounded"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Max Price</label>
            <input
              type="number"
              value={currentMaxPrice || ''}
              onChange={(e) => updateFilters('maxPrice', e.target.value || null)}
              className="w-full px-3 py-2 border rounded"
              placeholder="10000"
            />
          </div>
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={() => router.push('/tours')}
        className="w-full py-2 text-center text-primary-600 hover:text-primary-700 font-medium"
      >
        Clear All Filters
      </button>
    </div>
  )
}
