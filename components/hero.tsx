"use client"

import { motion } from "framer-motion"
import { ArrowDownCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "./logo"
import OptimizedImage from "./ui/optimized-image"
import { generateBlurPlaceholder } from "@/lib/image-utils"
import { useTheme } from "next-themes"

export default function Hero() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Maasai Moran sunset background with dark green overlay */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1589793907316-f94025b46850?q=80&w=1920&auto=format&fit=crop"
          alt="Maasai Moran sunset landscape"
          fill
          priority
          sizes="100vw"
          className={`object-cover ${isDark ? "brightness-[0.5]" : "brightness-[0.6]"}`}
          placeholder="blur"
          blurDataURL={generateBlurPlaceholder(1920, 1080, "#0f766e")}
        />
        <div className={`absolute inset-0 ${isDark ? "bg-emerald-950/80" : "bg-emerald-900/70"}`} />{" "}
        {/* Dark green overlay */}
      </div>

      {/* Logo positioned at the top with reduced opacity - hidden on mobile (handled by mobile nav) */}
      <motion.div
        className="absolute top-6 left-6 z-20 hidden md:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Logo width={120} height={48} opacity={isDark ? 0.95 : 0.85} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 z-10 px-4 max-w-4xl"
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Building Resilient Food Systems
        </motion.h1>
        <motion.h2
          className="text-xl md:text-2xl text-emerald-100 mt-4 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Combining technology and sustainable agriculture to create impact-driven solutions for food security and
          climate resilience.
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-emerald-100/90 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Agrifood Systems Advocate
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button
            size="lg"
            onClick={scrollToProjects}
            variant="emerald"
            whileHover={{ scale: 1.05 }}
            as={motion.button}
          >
            View Work
          </Button>
          <Button size="lg" variant="black" onClick={scrollToContact} whileHover={{ scale: 1.05 }} as={motion.button}>
            Contact Me
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        <ArrowDownCircle className="w-10 h-10 text-emerald-400 cursor-pointer" onClick={scrollToProjects} />
      </motion.div>
    </section>
  )
}

