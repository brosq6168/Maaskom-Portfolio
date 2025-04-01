"use client"

import { motion } from "framer-motion"
import { AlertTriangle, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface PlaceholderSectionProps {
  title: string
  description?: string
  adminPath?: string
  showEditButton?: boolean
  className?: string
  height?: string
}

export default function PlaceholderSection({
  title,
  description = "This section is awaiting content. Please add content through the admin dashboard.",
  adminPath,
  showEditButton = true,
  className = "",
  height = "min-h-[400px]",
}: PlaceholderSectionProps) {
  const router = useRouter()

  const navigateToAdmin = () => {
    if (adminPath) {
      window.location.href = adminPath
    }
  }

  return (
    <section className={`py-20 px-4 md:px-8 bg-gray-900 text-white ${className}`}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{title}</h2>
        </motion.div>

        <Card className={`bg-amber-900/10 border-amber-600/30 ${height}`}>
          <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
            <AlertTriangle className="h-16 w-16 text-amber-500 mb-6" />
            <h3 className="text-xl font-semibold text-white mb-3">Content Coming Soon</h3>
            <p className="text-gray-300 max-w-lg mb-6">{description}</p>

            {showEditButton && adminPath && (
              <Button variant="coral" onClick={navigateToAdmin} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" /> Add Content
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

