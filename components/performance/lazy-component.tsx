"use client"

import React from "react"

import { Suspense, lazy, type ComponentType, type ReactNode } from "react"
import { Loader2 } from "lucide-react"

interface LazyComponentProps {
  component: () => Promise<{ default: ComponentType<any> }>
  props?: Record<string, any>
  fallback?: ReactNode
  onError?: (error: Error) => void
}

export default function LazyComponent({ component, props = {}, fallback, onError }: LazyComponentProps) {
  const LazyComponent = lazy(component)

  const defaultFallback = (
    <div className="flex items-center justify-center p-8 min-h-[200px]">
      <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
    </div>
  )

  const handleError = (error: Error) => {
    console.error("Error loading component:", error)
    if (onError) onError(error)
  }

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <ErrorBoundary onError={handleError}>
        <LazyComponent {...props} />
      </ErrorBoundary>
    </Suspense>
  )
}

// Simple error boundary component
class ErrorBoundary extends React.Component<
  { children: ReactNode; onError?: (error: Error) => void },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; onError?: (error: Error) => void }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    if (this.props.onError) {
      this.props.onError(error)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-md">
          <h3 className="text-lg font-medium">Something went wrong</h3>
          <p className="mt-1">Failed to load component. Please try refreshing the page.</p>
        </div>
      )
    }

    return this.props.children
  }
}

