"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface IntersectionObserverProps {
  children: ReactNode
  rootMargin?: string
  threshold?: number | number[]
  triggerOnce?: boolean
  onIntersect?: () => void
  className?: string
  asElement?: keyof JSX.IntrinsicElements
}

export default function IntersectionObserver({
  children,
  rootMargin = "0px",
  threshold = 0.1,
  triggerOnce = true,
  onIntersect,
  className = "",
  asElement: Element = "div",
}: IntersectionObserverProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const hasIntersected = useRef(false)

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || (triggerOnce && !hasIntersected.current))) {
          setIsIntersecting(true)
          if (onIntersect) onIntersect()
          hasIntersected.current = true

          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!triggerOnce) {
          setIsIntersecting(entry.isIntersecting)
        }
      },
      { rootMargin, threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [rootMargin, threshold, triggerOnce, onIntersect])

  return (
    <Element ref={ref} className={className} data-intersecting={isIntersecting}>
      {children}
    </Element>
  )
}

