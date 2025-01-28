import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown, ChevronUp } from 'lucide-react'

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
  const [expandedSections, setExpandedSections] = useState({
    difficulty: true,
    duration: true,
    price: true,
  })

  const currentDifficulty = searchParams.get('difficulty')
  const currentDuration = searchParams.get('duration')
  const currentMinPrice = searchParams.get('minPrice')
  const currentMaxPrice = searchParams.get('maxPrice')

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === null) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`?${params.toString()}`)
  }

  const FilterSection = ({
    title,
    section,
    children,
  }: {
    title: string
    section: keyof typeof expandedSections
    children: React.ReactNode
  }) => (
    <div className="border-b last:border-b-0 py-4">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full text-left mb-2"
      >
        <h3 className="font-medium text-lg">{title}</h3>
        {expandedSections[section] ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      {expandedSections[section] && children}
    </div>
  )

  return (
    <div>
      {/* Difficulty Filter */}
      <FilterSection title="Difficulty" section="difficulty">
        <div className="space-y-3">
          {difficulties.map(({ label, value }) => (
            <label key={value} className="flex items-center">
              <input
                type="radio"
                name="difficulty"
                value={value}
                checked={currentDifficulty === value}
                onChange={(e) => updateFilters('difficulty', e.target.checked ? value : null)}
                className="mr-3 w-4 h-4"
              />
              <span className="text-base">{label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Duration Filter */}
      <FilterSection title="Duration" section="duration">
        <div className="space-y-3">
          {durations.map(({ label, value }) => (
            <label key={value} className="flex items-center">
              <input
                type="radio"
                name="duration"
                value={value}
                checked={currentDuration === value}
                onChange={(e) => updateFilters('duration', e.target.checked ? value : null)}
                className="mr-3 w-4 h-4"
              />
              <span className="text-base">{label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection title="Price Range (USD)" section="price">
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Min Price</label>
            <input
              type="number"
              value={currentMinPrice || ''}
              onChange={(e) => updateFilters('minPrice', e.target.value || null)}
              className="w-full px-3 py-2 border rounded-lg text-base"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Max Price</label>
            <input
              type="number"
              value={currentMaxPrice || ''}
              onChange={(e) => updateFilters('maxPrice', e.target.value || null)}
              className="w-full px-3 py-2 border rounded-lg text-base"
              placeholder="10000"
            />
          </div>
        </div>
      </FilterSection>
    </div>
  )
}
