"use client"

import { motion } from "framer-motion"
import { Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import OptimizedImage from "./ui/optimized-image"
import { generateBlurPlaceholder, generateSizes } from "@/lib/image-utils"

// Updated ongoing projects data with more relevant images
const ongoingProjects = [
  {
    id: 1,
    title: "STANDARD ECO FOUNDATION NGO Landing Page",
    description:
      "A modern, responsive website for the STANDARD ECO FOUNDATION NGO to showcase their initiatives and impact.",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1000&auto=format&fit=crop",
    tags: ["Web Development", "NGO", "React"],
    progress: 65,
    startDate: "2025-01-15",
    estimatedCompletion: "2025-04-30",
    milestones: [
      { title: "Design Approval", completed: true },
      { title: "Frontend Development", completed: true },
      { title: "CMS Integration", completed: false },
      { title: "Content Population", completed: false },
      { title: "Testing & Launch", completed: false },
    ],
  },
  {
    id: 2,
    title: "Hardware App for Sales & Inventory Tracking",
    description:
      "A comprehensive application for tracking daily sales, updating stock database, and monitoring cashflow from expenses to profits.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    tags: ["Mobile App", "Inventory Management", "Cashflow"],
    progress: 40,
    startDate: "2025-02-10",
    estimatedCompletion: "2025-06-15",
    milestones: [
      { title: "Requirements Analysis", completed: true },
      { title: "Database Design", completed: true },
      { title: "UI/UX Design", completed: true },
      { title: "Core Functionality", completed: false },
      { title: "Reporting Module", completed: false },
      { title: "Testing & Deployment", completed: false },
    ],
  },
]

export default function OngoingProjects() {
  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const today = new Date()
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Image sizes for responsive loading
  const cardImageSizes = generateSizes({
    mobile: "100vw",
    tablet: "50vw",
    desktop: "50vw",
  })

  return (
    <section id="ongoing-projects" className="py-20 px-4 md:px-8 bg-gray-800 text-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ongoing Projects</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Current initiatives under development with real-time progress tracking.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {ongoingProjects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <Card className="overflow-hidden h-full bg-gray-900 border-gray-700 hover:shadow-lg hover:shadow-emerald-900/20 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    src={project.image}
                    alt={`${project.title} - Ongoing project`}
                    fill
                    sizes={cardImageSizes}
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={generateBlurPlaceholder(600, 300, "#1e3a8a")}
                  />
                  <div className="absolute top-0 left-0 m-4">
                    <Badge className="bg-emerald-700 text-white">In Progress</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-4 mt-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-white">Progress</span>
                        <span className="text-sm font-medium text-white">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Start Date</p>
                        <p className="font-medium text-white">{formatDate(project.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Estimated Completion</p>
                        <p className="font-medium text-white">{formatDate(project.estimatedCompletion)}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-400 mb-2">Milestones</p>
                      <ul className="space-y-1">
                        {project.milestones.map((milestone, index) => (
                          <li key={index} className="flex items-center">
                            <div
                              className={`w-4 h-4 rounded-full mr-2 ${milestone.completed ? "bg-emerald-500" : "bg-gray-600"}`}
                            ></div>
                            <span className={milestone.completed ? "text-white" : "text-gray-400"}>
                              {milestone.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center text-emerald-400">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">
                          {calculateDaysRemaining(project.estimatedCompletion)} days remaining
                        </span>
                      </div>
                      <Button variant="coral" size="sm">
                        View Details <ArrowRight className="ml-1 w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

