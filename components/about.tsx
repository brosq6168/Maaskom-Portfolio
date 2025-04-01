"use client"

import { motion } from "framer-motion"
import { FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import OptimizedImage from "./ui/optimized-image"
import { generateBlurPlaceholder } from "@/lib/image-utils"

export default function About() {
  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-gray-900 text-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">About Me</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Learn more about my journey and passion for sustainable agrifood systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square overflow-hidden rounded-2xl">
              <OptimizedImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-09%20at%2023.32.34_12ccb363.jpg-I2DqWy6a4C4Uik2vfyOihdB0F1HiZ1.jpeg"
                alt="Andrew Mponin - Portrait photo"
                width={600}
                height={600}
                className="w-full h-full object-cover"
                placeholder="blur"
                blurDataURL={generateBlurPlaceholder(600, 600, "#1e3a8a")}
                rounded="lg"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-emerald-900/30 w-48 h-48 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 bg-emerald-900/30 w-24 h-24 rounded-full -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white">Andrew Mponin</h3>
            <h4 className="text-xl text-emerald-400 font-medium">Agrifood Systems Advocate</h4>

            <div className="space-y-4 text-gray-300">
              <p>
                With over 8 years of experience in sustainable agriculture and climate resilience, I've dedicated my
                career to building more equitable and environmentally sound food systems.
              </p>
              <p>
                My work spans from grassroots community projects in East Africa to policy advocacy at international
                forums. I combine technical expertise in GIS and data analysis with deep knowledge of agroecological
                practices.
              </p>
              <p>
                I believe that technology, when appropriately applied, can be a powerful tool for positive change in our
                food systems. My projects focus on empowering communities with accessible tools and knowledge to enhance
                their resilience to climate change.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Button variant="coral" className="flex items-center gap-2">
                <FileDown className="w-4 h-4" /> Download CV
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

