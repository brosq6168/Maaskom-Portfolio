"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, "onLoadingComplete"> {
  aspectRatio?: "square" | "video" | "portrait" | "custom"
  customAspectRatio?: string
  fill?: boolean
  rounded?: "none" | "sm" | "md" | "lg" | "full"
  className?: string
  wrapperClassName?: string
  showLoadingIndicator?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  aspectRatio = "custom",
  customAspectRatio,
  fill = false,
  rounded = "none",
  className = "",
  wrapperClassName = "",
  showLoadingIndicator = false,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(!priority)

  // Define aspect ratio styles
  const aspectRatioStyles = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    custom: customAspectRatio ? `aspect-[${customAspectRatio}]` : "",
  }

  // Define rounded styles
  const roundedStyles = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        aspectRatioStyles[aspectRatio],
        roundedStyles[rounded],
        wrapperClassName,
      )}
    >
      {showLoadingIndicator && isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        className={cn(
          "object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className,
        )}
        sizes={fill ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : undefined}
        {...props}
      />
    </div>
  )
}

