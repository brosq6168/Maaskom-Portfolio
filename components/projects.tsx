"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, ExternalLink, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import OptimizedImage from "@/components/ui/optimized-image"
import { generateBlurPlaceholder, generateSizes } from "@/lib/image-utils"

// Updated project data with more relevant, high-quality images
const projects = [
  {
    id: 1,
    title: "Kenyan Rangelands Restoration",
    description: "A community-driven initiative to restore degraded rangelands in Kenya.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
    tags: ["Climate Tech", "Community Impact", "GIS"],
    github: "https://github.com",
    demo: "https://demo.com",
    caseStudy: {
      challenge: "Over 50 hectares of Kenyan rangelands were degraded due to overgrazing and climate change.",
      solution: "Implemented a community-based monitoring system using GIS technology and indigenous knowledge.",
      outcome:
        "Restored 50+ hectares of rangelands, increasing biodiversity and improving livelihoods for local communities.",
      techStack: ["React", "Node.js", "GIS", "MongoDB"],
      images: [
        {
          url: "https://images.unsplash.com/photo-1516467717517-318e8aaf7c51?q=80&w=800&auto=format&fit=crop",
          caption: "Community members mapping rangeland areas",
        },
        {
          url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800&auto=format&fit=crop",
          caption: "Restored rangeland ecosystem",
        },
      ],
    },
  },
  {
    id: 2,
    title: "Sustainable Agriculture Dashboard",
    description: "Interactive dashboard for monitoring sustainable farming practices.",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1000&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=600&auto=format&fit=crop",
    tags: ["Data Visualization", "Sustainability", "React"],
    github: "https://github.com",
    demo: "https://demo.com",
    caseStudy: {
      challenge: "Farmers lacked tools to track and improve their sustainability metrics.",
      solution: "Developed a real-time dashboard that visualizes key sustainability indicators.",
      outcome: "Helped 200+ farmers reduce water usage by 30% and increase crop yields by 15%.",
      techStack: ["Next.js", "Tailwind CSS", "D3.js", "Supabase"],
      images: [
        {
          url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
          caption: "Dashboard interface showing farm metrics",
        },
        {
          url: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=800&auto=format&fit=crop",
          caption: "Farmers using the dashboard in the field",
        },
      ],
    },
  },
  {
    id: 3,
    title: "Food Supply Chain Tracker",
    description: "Blockchain-based solution for transparent food supply chains.",
    image: "https://images.unsplash.com/photo-1506617420156-8e4536971650?q=80&w=1000&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1506617420156-8e4536971650?q=80&w=600&auto=format&fit=crop",
    tags: ["Blockchain", "Supply Chain", "Food Security"],
    github: "https://github.com",
    demo: "https://demo.com",
    caseStudy: {
      challenge: "Lack of transparency in food supply chains leading to waste and inefficiency.",
      solution: "Built a blockchain solution to track food from farm to table with QR code integration.",
      outcome: "Reduced food waste by 25% and increased consumer trust in participating brands.",
      techStack: ["Ethereum", "React", "Node.js", "QR Code API"],
      images: [
        {
          url: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
          caption: "Supply chain tracking interface",
        },
        {
          url: "https://images.unsplash.com/photo-1473973266408-ed4e9c10a5cd?q=80&w=800&auto=format&fit=crop",
          caption: "QR code scanning for product verification",
        },
      ],
    },
  },
  {
    id: 4,
    title: "Community Seed Bank App",
    description: "Mobile application for managing community seed banks and preserving biodiversity.",
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=1000&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=600&auto=format&fit=crop",
    tags: ["Mobile App", "Biodiversity", "Community"],
    github: "https://github.com",
    demo: "https://demo.com",
    caseStudy: {
      challenge: "Local seed varieties were being lost due to commercial agriculture expansion.",
      solution: "Created a mobile app for cataloging, sharing, and preserving indigenous seeds.",
      outcome: "Preserved 150+ local seed varieties and connected 15 community seed banks.",
      techStack: ["React Native", "Firebase", "Expo", "Google Maps API"],
      images: [
        {
          url: "https://images.unsplash.com/photo-1620141925422-4eeaad36e9fe?q=80&w=800&auto=format&fit=crop",
          caption: "Seed cataloging interface",
        },
        {
          url: "https://images.unsplash.com/photo-1574943320219-5630bb4c2452?q=80&w=800&auto=format&fit=crop",
          caption: "Community seed exchange event",
        },
      ],
    },
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const openProjectDetails = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
    setSelectedImageIndex(0)
    setIsDialogOpen(true)
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
    desktop: "33vw",
  })

  const modalImageSizes = generateSizes({
    mobile: "100vw",
    tablet: "80vw",
    desktop: "60vw",
  })

  return (
    <section id="projects" className="py-20 px-4 md:px-8 bg-gray-900 text-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Project Showcase</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore my work in climate resilience, sustainable agriculture, and community development.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/20 cursor-pointer group bg-gray-800 border-gray-700">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="relative overflow-hidden h-48">
                    <OptimizedImage
                      src={project.thumbnail || project.image}
                      alt={`${project.title} - Project thumbnail`}
                      fill
                      sizes={cardImageSizes}
                      className="transition-transform duration-500 group-hover:scale-105 object-cover"
                      placeholder="blur"
                      blurDataURL={generateBlurPlaceholder(600, 400)}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-emerald-400"
                        >
                          <Github className="w-6 h-6" />
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-emerald-400"
                        >
                          <ExternalLink className="w-6 h-6" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                    <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-emerald-900/40 text-emerald-200 hover:bg-emerald-800/60"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="coral" className="mt-auto w-full" onClick={() => openProjectDetails(project)}>
                      View Case Study
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {selectedProject && (
            <DialogContent className="max-w-4xl bg-gray-800 text-white border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-gray-300">{selectedProject.description}</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <div className="w-full h-64 md:h-80 relative rounded-md mb-6 overflow-hidden">
                  <OptimizedImage
                    src={selectedProject.caseStudy.images?.[selectedImageIndex]?.url || selectedProject.image}
                    alt={
                      selectedProject.caseStudy.images?.[selectedImageIndex]?.caption ||
                      `${selectedProject.title} - Detailed view`
                    }
                    fill
                    sizes={modalImageSizes}
                    className="object-cover"
                    priority
                    showLoadingIndicator
                  />
                </div>

                {/* Image gallery thumbnails */}
                {selectedProject.caseStudy.images && selectedProject.caseStudy.images.length > 0 && (
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    <div
                      className={`w-20 h-20 relative rounded-md overflow-hidden cursor-pointer border-2 ${selectedImageIndex === -1 ? "border-emerald-500" : "border-transparent"}`}
                      onClick={() => setSelectedImageIndex(-1)}
                    >
                      <OptimizedImage
                        src={selectedProject.image}
                        alt={`${selectedProject.title} - Main image`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {selectedProject.caseStudy.images.map((image, index) => (
                      <div
                        key={index}
                        className={`w-20 h-20 relative rounded-md overflow-hidden cursor-pointer border-2 ${selectedImageIndex === index ? "border-emerald-500" : "border-transparent"}`}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <OptimizedImage
                          src={image.url}
                          alt={image.caption || `${selectedProject.title} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Caption for current image */}
                {selectedProject.caseStudy.images?.[selectedImageIndex]?.caption && (
                  <p className="text-sm text-gray-400 italic mb-6 text-center">
                    {selectedProject.caseStudy.images[selectedImageIndex].caption}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">Challenge</h4>
                    <p className="text-gray-300">{selectedProject.caseStudy.challenge}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">Solution</h4>
                    <p className="text-gray-300">{selectedProject.caseStudy.solution}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">Outcome</h4>
                    <p className="text-gray-300">{selectedProject.caseStudy.outcome}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.caseStudy.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="bg-gray-700 text-gray-200 border-gray-600">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <Button asChild variant="coral" size="sm">
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="w-4 h-4" /> GitHub
                      </a>
                    </Button>
                    <Button asChild variant="coral" size="sm">
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    </Button>
                  </div>
                  <DialogClose asChild>
                    <Button variant="ghost" size="sm" className="text-gray-200 hover:bg-gray-700 hover:text-white">
                      <X className="w-4 h-4 mr-2" /> Close
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  )
}

