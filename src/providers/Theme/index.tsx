'use client'

import React, { createContext, useContext } from 'react'
import type { ThemeContextType } from './types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: 'light',
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', 'light')
  }

  return <ThemeContext.Provider value={initialContext}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => useContext(ThemeContext)
