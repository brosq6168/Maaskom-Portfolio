"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Force theme revalidation on window focus
  React.useEffect(() => {
    const handleFocus = () => {
      // This will trigger a re-render of components using useTheme
      document.body.classList.toggle("focus-visible", document.hasFocus())
      document.body.classList.toggle("focus-visible", !document.hasFocus())
    }

    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [])

  return (
    <NextThemesProvider
      {...props}
      enableSystem={true}
      enableColorScheme
      attribute="class"
      defaultTheme="system"
      storageKey="portfolio-theme"
    >
      {children}
    </NextThemesProvider>
  )
}

