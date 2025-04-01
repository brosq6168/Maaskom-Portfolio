import Image from "next/image"

interface LogoProps {
  width?: number
  height?: number
  className?: string
  opacity?: number
}

export default function Logo({ width = 120, height = 48, className = "", opacity = 0.85 }: LogoProps) {
  return (
    <div className={`relative ${className}`} style={{ height: height / 2, width: width / 2 }}>
      <Image
        src="/images/maaskom-logo.png"
        alt="Maaskom Logo"
        width={width}
        height={height}
        className={`object-contain`}
        style={{ opacity }}
      />
    </div>
  )
}

