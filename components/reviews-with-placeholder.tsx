"use client"

import { useState, useEffect } from "react"
import Reviews from "@/components/reviews"
import PlaceholderSection from "@/components/placeholder-section"
import { checkSectionContent } from "@/lib/api"

export default function ReviewsWithPlaceholder() {
  const [hasContent, setHasContent] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkContent = async () => {
      try {
        const { hasContent } = await checkSectionContent("reviews")
        setHasContent(hasContent)
      } catch (error) {
        console.error("Failed to check content status:", error)
        setHasContent(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkContent()
  }, [])

  if (isLoading) {
    return (
      <section className="py-20 px-4 md:px-8 bg-gray-800 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Client Reviews</h2>
            <div className="animate-pulse bg-gray-700 h-4 w-64 mx-auto rounded"></div>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gray-700 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!hasContent) {
    return (
      <PlaceholderSection
        title="Client Reviews"
        description="This section will showcase feedback from your clients and partners. Add reviews through the admin dashboard to display them here."
        adminPath="/admin/reviews"
      />
    )
  }

  return <Reviews />
}

