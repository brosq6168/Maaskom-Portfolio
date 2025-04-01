"use client"

import { Button } from "@/components/ui/button"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import OptimizedImage from "./ui/optimized-image"
import { useTheme } from "next-themes"

// Reviews data
const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Project Manager, Climate Action Network",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    text: "Andrew's work on the rangeland restoration project exceeded our expectations. His ability to combine technical expertise with community engagement made a real difference in our project outcomes.",
    date: "March 2025",
  },
  {
    id: 2,
    name: "Dr. Michael Ochieng",
    role: "Director, East African Climate Institute",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    text: "I've collaborated with Andrew on several research initiatives. His deep understanding of both agricultural systems and climate science makes him an invaluable partner in our work.",
    date: "February 2025",
  },
  {
    id: 3,
    name: "Amina Wangari",
    role: "Community Leader, Narok County",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    text: "The training Andrew provided to our women's group has transformed how we approach sustainable farming. His respectful integration of our traditional knowledge with modern techniques was particularly appreciated.",
    date: "January 2025",
  },
  {
    id: 4,
    name: "James Mwangi",
    role: "CEO, AgriTech Solutions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 4,
    text: "Working with Andrew on our mobile app development was a great experience. His insights into the needs of small-scale farmers helped us create a truly useful product.",
    date: "December 2024",
  },
  {
    id: 5,
    name: "Emma Njeri",
    role: "Program Officer, UN Environment",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    text: "Andrew's presentation at our climate resilience conference was one of the highlights. His ability to communicate complex ideas in accessible ways made a strong impression on all attendees.",
    date: "November 2024",
  },
  {
    id: 6,
    name: "Daniel Kimani",
    role: "Farmer, Nakuru County",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    text: "The sustainable agriculture dashboard Andrew helped develop has changed how I manage my farm. I've reduced water usage by 25% while increasing yields. Truly transformative work!",
    date: "October 2024",
  },
]

export default function Reviews() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <section id="reviews" className="py-20 px-4 md:px-8 bg-gray-800 text-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Client Reviews</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            What people are saying about working with me on climate resilience and sustainable agriculture projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 ${isDark ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-200"}`}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <OptimizedImage
                        src={review.image}
                        alt={`${review.name} profile picture`}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        rounded="full"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{review.name}</h3>
                      <p className="text-emerald-400 text-sm">{review.role}</p>
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                      />
                    ))}
                  </div>

                  <div className="relative flex-grow">
                    <Quote className="absolute -top-1 -left-1 w-6 h-6 text-emerald-600/20" />
                    <p className="text-gray-300 relative z-10 pl-3">{review.text}</p>
                  </div>

                  <p className="text-gray-400 text-sm mt-4 pt-2 border-t border-gray-700">{review.date}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Button variant="coral" className="mx-auto">
            View More Reviews
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

