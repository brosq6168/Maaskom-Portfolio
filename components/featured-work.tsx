"use client"

import { motion } from "framer-motion"
import { FileDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import OptimizedImage from "./ui/optimized-image"
import { generateBlurPlaceholder, generateSizes } from "@/lib/image-utils"

export default function FeaturedWork() {
  // Image sizes for responsive loading
  const featuredImageSizes = generateSizes({
    mobile: "100vw",
    tablet: "33vw",
    desktop: "33vw",
  })

  return (
    <section id="featured" className="py-20 px-4 md:px-8 bg-gray-900 text-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Featured Work</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Recent publications and recognition in the field of climate resilience and community development.
          </p>
        </motion.div>

        {/* Youth4Nature Blog Feature */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Badge className="bg-emerald-700 text-white hover:bg-emerald-800 mb-4">Special Feature</Badge>
            <h3 className="text-2xl font-bold text-white">Youth4Nature Blog</h3>
            <p className="text-emerald-400">Empowering the next generation of climate leaders</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1604608672516-f1b9be5666c3?q=80&w=1000&auto=format&fit=crop"
                      alt="Maasai Rangelands - Featured work cover image"
                      fill
                      sizes={featuredImageSizes}
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={generateBlurPlaceholder(600, 400, "#0f766e")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent" />
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-emerald-700 text-white hover:bg-emerald-800">Youth4Nature Feature</Badge>
                    </div>
                  </div>

                  <div className="lg:col-span-2 p-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          Cutting Across the Maasai Rangelands, Shaping the Better Tomorrow
                        </h3>
                        <p className="text-emerald-400 mb-4">Featured in Youth4Nature Blog - February 2025</p>
                      </div>

                      <div className="space-y-4 text-gray-300">
                        <p>
                          In Narok County, the Standard Watch initiative enhances indigenous pastoralist women's
                          leadership capabilities to build women's capacity to achieve equality as decision-makers in
                          pastoralist societies.
                        </p>
                        <p>
                          Indigenous pastoralist women undertake training and then form committees that plan, implement,
                          and monitor climate change adaptation actions in their communities.
                        </p>
                        <div className="border-l-4 border-emerald-600 pl-4 py-2 italic">
                          "An impressive example of empowering women and local communities to plan, implement, and
                          monitor improved climate resilience according to the needs of our communities."
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <Badge variant="outline" className="bg-gray-700 text-gray-200 border-gray-600">
                          Climate Resilience
                        </Badge>
                        <Badge variant="outline" className="bg-gray-700 text-gray-200 border-gray-600">
                          Women Empowerment
                        </Badge>
                        <Badge variant="outline" className="bg-gray-700 text-gray-200 border-gray-600">
                          Indigenous Communities
                        </Badge>
                        <Badge variant="outline" className="bg-gray-700 text-gray-200 border-gray-600">
                          Sustainable Agriculture
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-2">
                        <Button variant="coral" className="flex items-center gap-2">
                          <FileDown className="w-4 h-4" /> Download PDF
                        </Button>
                        <Button
                          variant="outline"
                          className="border-emerald-700 text-emerald-400 hover:bg-emerald-900/30 flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" /> Read Full Article
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Youth4Nature Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop"
                    alt="Youth climate workshop"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-emerald-700 text-white">Workshop</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Youth Climate Leadership Workshop</h3>
                  <p className="text-gray-300">
                    Facilitated a three-day workshop for young climate leaders, focusing on practical skills for
                    community mobilization and climate advocacy.
                  </p>
                  <p className="text-emerald-400 mt-4 text-sm">December 2024</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?q=80&w=600&auto=format&fit=crop"
                    alt="Youth4Nature podcast"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-emerald-700 text-white">Podcast</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Voices of Change Podcast</h3>
                  <p className="text-gray-300">
                    Featured guest on Youth4Nature's podcast discussing the intersection of indigenous knowledge and
                    modern climate solutions.
                  </p>
                  <p className="text-emerald-400 mt-4 text-sm">January 2025</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="bg-emerald-900/30 p-4 rounded-lg mb-4 flex items-center justify-center">
                  <OptimizedImage
                    src="https://img.icons8.com/color/96/null/natural-food.png"
                    alt="Grass Seed Banks icon"
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Grass Seed Banks</h3>
                <p className="text-gray-300 flex-grow">
                  Established grass seed banks and tree nursery beds in Narok, Kenya, after participating in
                  knowledge-exchange and learning visits.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="bg-emerald-900/30 p-4 rounded-lg mb-4 flex items-center justify-center">
                  <OptimizedImage
                    src="https://img.icons8.com/color/96/null/conference-call.png"
                    alt="Women Champions icon"
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Women Champions</h3>
                <p className="text-gray-300 flex-grow">
                  Providing leadership training for 200 "women champions" working in climate change adaptation and
                  educating women's groups about sustainable practices.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="bg-emerald-900/30 p-4 rounded-lg mb-4 flex items-center justify-center">
                  <OptimizedImage
                    src="https://img.icons8.com/color/96/null/water.png"
                    alt="Water Harvesting icon"
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Water Harvesting</h3>
                <p className="text-gray-300 flex-grow">
                  Installing rainwater-harvesting technologies to ensure access to water during dry seasons using
                  affordable, sustainable technologies.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            The Standard Eco watch initiative addresses the needs of vulnerable communities whose exposure to climate
            hazards and susceptibility to climate risks are relatively higher, fostering long-term economic empowerment
            of local women and contributing to their climate resilience.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

