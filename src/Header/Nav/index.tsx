'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Menu, X } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center">
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6 items-center">
        {navItems.map(({ link }, i) => (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className="text-gray-800 hover:text-primary-600"
          />
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 -mr-2 text-gray-800"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
          <div className="py-2 px-4 space-y-3">
            {navItems.map(({ link }, i) => (
              <div
                key={i}
                className="border-b border-gray-100 last:border-0"
                onClick={() => setIsMenuOpen(false)}
              >
                <CMSLink
                  {...link}
                  appearance="link"
                  className="block py-2 text-gray-800 hover:text-primary-600"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
