"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import OptimizedImage from "./ui/optimized-image"
import IntersectionObserver from "./performance/intersection-observer"

const testimonials = [
  {
    quote:
      "An impressive example of empowering women and local communities to plan, implement, and monitor improved climate resilience according to the needs of our communities.",
    author: "Local Government Authority",
    role: "Narok County",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "The beauty of activism is its ability to awaken the world to our planet's precarious state and ignite the flames of change for the sake of future generations.",
    author: "UNICEF WCARO",
    role: "Regional Network Meeting",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "I am very pleased to see the success of an organization by and for the target community. This initiative will strengthen interventions that upskill indigenous pastoralist women.",
    author: "Community Leader",
    role: "Maasai Mara",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Andrew's proactiveness in advocating for vaccination, particularly focusing on integrating indigenous communities into vaccination services, built trust and narrowed cultural divides.",
    author: "Health Official",
    role: "Iton'g Health Zone",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop",
  },
]

function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 md:px-8 bg-gray-800 text-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What People Say</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Feedback from communities, organizations, and partners about our impact and initiatives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <IntersectionObserver key={index} rootMargin="50px">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            </IntersectionObserver>
          ))}
        </div>

        <IntersectionObserver rootMargin="50px">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-emerald-900/30 p-8 rounded-xl">
              <blockquote className="text-xl md:text-2xl italic text-gray-200 max-w-4xl mx-auto">
                "The beauty of activism is it's ability to awaken the world to our planet's precarious state and ignite
                the flames of change for the sake of future generations. It's the hope that keeps me going, knowing that
                my actions may secure a better tomorrow."
              </blockquote>
              <p className="mt-4 text-emerald-400 font-medium">— Andrew Mponin, MGCY.UNEP Youth Delegate</p>
            </div>
          </motion.div>
        </IntersectionObserver>
      </div>
    </section>
  )
}

// Extracted testimonial card component
const TestimonialCard = memo(({ testimonial }: { testimonial: (typeof testimonials)[0] }) => {
  return (
    <Card className="bg-gray-900 border-gray-700 h-full hover:shadow-lg hover:shadow-emerald-900/10 transition-all duration-300">
      <CardContent className="p-6 relative">
        <div className="absolute -top-4 -left-2 text-emerald-600 opacity-20">
          <Quote size={60} />
        </div>
        <div className="relative z-10">
          <p className="text-gray-300 italic mb-6 relative z-10">"{testimonial.quote}"</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <OptimizedImage
                src={testimonial.image || "/placeholder.svg"}
                alt={`${testimonial.author} - ${testimonial.role}`}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                rounded="full"
              />
            </div>
            <div>
              <h4 className="font-semibold text-white">{testimonial.author}</h4>
              <p className="text-emerald-400 text-sm">{testimonial.role}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

TestimonialCard.displayName = "TestimonialCard"

export default memo(Testimonials)

