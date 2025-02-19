import React from 'react'

interface BrandProps {
  className?: string
}

export const Brand: React.FC<BrandProps> = ({ className }) => {
  return (
    <div className={`text-2xl font-bold text-orange-600 ${className || ''}`}>Moto Tour China</div>
  )
}
