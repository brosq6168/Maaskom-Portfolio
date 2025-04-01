"use client"

import { motion } from "framer-motion"
import { Search, Lightbulb, PenTool, Code, Zap, BarChart, Repeat, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import OptimizedImage from "./ui/optimized-image"

const processSteps = [
  {
    id: 1,
    title: "Research & Discovery",
    description:
      "Understanding the problem space, stakeholders, and existing solutions through interviews, surveys, and competitive analysis.",
    icon: Search,
    color: "bg-blue-500",
    tools: ["User Interviews", "Surveys", "Competitive Analysis", "Literature Review"],
    deliverables: ["Research Report", "User Personas", "Problem Statement"],
  },
  {
    id: 2,
    title: "Ideation",
    description:
      "Generating a wide range of creative solutions through collaborative brainstorming and conceptual frameworks.",
    icon: Lightbulb,
    color: "bg-yellow-500",
    tools: ["Brainstorming", "Mind Mapping", "Sketching", "Design Thinking Workshops"],
    deliverables: ["Concept Sketches", "Solution Framework", "Prioritization Matrix"],
  },
  {
    id: 3,
    title: "Design & Prototyping",
    description:
      "Creating visual designs and interactive prototypes to bring concepts to life and prepare for testing.",
    icon: PenTool,
    color: "bg-purple-500",
    tools: ["Figma", "Adobe Creative Suite", "Wireframing", "Prototyping"],
    deliverables: ["Wireframes", "UI Designs", "Interactive Prototypes"],
  },
  {
    id: 4,
    title: "Development",
    description:
      "Translating designs into functional solutions through collaborative implementation with development teams.",
    icon: Code,
    color: "bg-emerald-500",
    tools: ["Frontend Frameworks", "Version Control", "Design Systems", "Documentation"],
    deliverables: ["Functional Product", "Technical Documentation", "Design System"],
  },
  {
    id: 5,
    title: "Testing & Optimization",
    description:
      "Validating solutions through user testing and iterative refinement based on quantitative and qualitative feedback.",
    icon: Zap,
    color: "bg-orange-500",
    tools: ["Usability Testing", "A/B Testing", "Analytics", "Heatmaps"],
    deliverables: ["Test Results", "Optimization Recommendations", "Implementation Plan"],
  },
  {
    id: 6,
    title: "Measurement & Analysis",
    description: "Evaluating impact through data analysis and user feedback to inform future improvements.",
    icon: BarChart,
    color: "bg-red-500",
    tools: ["Analytics Platforms", "Surveys", "Interviews", "Impact Assessment"],
    deliverables: ["Performance Reports", "Success Metrics", "Lessons Learned"],
  },
  {
    id: 7,
    title: "Iteration",
    description: "Continuously improving the solution based on insights and evolving requirements.",
    icon: Repeat,
    color: "bg-indigo-500",
    tools: ["Agile Methodology", "Feedback Loops", "Continuous Integration", "Feature Prioritization"],
    deliverables: ["Roadmap Updates", "Feature Enhancements", "Version Releases"],
  },
]

export default function DesignProcess() {
  return (
    <section id="design-process" className="py-20 px-4 md:px-8 bg-gray-900 text-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">My Design Process</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A systematic approach to creating impactful solutions for complex challenges in agrifood systems.
          </p>
        </motion.div>

        {/* Process Overview Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 overflow-x-auto"
        >
          <div className="min-w-max">
            <div className="flex justify-center items-center gap-2 md:gap-4 py-8">
              {processSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex flex-col items-center ${index !== 0 ? "ml-2 md:ml-4" : ""}`}>
                    <div
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${step.color} flex items-center justify-center text-white shadow-lg`}
                    >
                      <step.icon size={32} />
                    </div>
                    <p className="text-xs md:text-sm font-medium mt-2 text-center w-20 md:w-24">{step.title}</p>
                  </div>
                  {index < processSteps.length - 1 && <ArrowRight className="text-gray-400 mx-1 md:mx-2" />}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Process Steps Detail */}
        <div className="space-y-16">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
            >
              <div className="w-full md:w-1/2">
                <div className={`${step.color} p-6 rounded-xl relative overflow-hidden`}>
                  <div className="absolute -right-10 -bottom-10 opacity-10">
                    <step.icon size={120} />
                  </div>
                  <span className="text-6xl font-bold text-white/20 absolute top-2 right-4">{step.id}</span>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-white/90 mb-4">{step.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Tools & Methods</h4>
                        <ul className="space-y-1">
                          {step.tools.map((tool, i) => (
                            <li key={i} className="text-white/80 text-sm flex items-center">
                              <span className="w-1.5 h-1.5 bg-white/60 rounded-full mr-2"></span>
                              {tool}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Deliverables</h4>
                        <ul className="space-y-1">
                          {step.deliverables.map((deliverable, i) => (
                            <li key={i} className="text-white/80 text-sm flex items-center">
                              <span className="w-1.5 h-1.5 bg-white/60 rounded-full mr-2"></span>
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                {index === 0 && (
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
                      alt="Research and discovery process"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-blue-500 mb-2">Research</Badge>
                      <h4 className="text-white text-lg font-medium">Community needs assessment in Narok County</h4>
                    </div>
                  </div>
                )}
                {index === 1 && (
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
                      alt="Ideation workshop"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-yellow-500 mb-2">Ideation</Badge>
                      <h4 className="text-white text-lg font-medium">
                        Collaborative solution design with stakeholders
                      </h4>
                    </div>
                  </div>
                )}
                {index === 2 && (
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop"
                      alt="Design and prototyping"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-purple-500 mb-2">Design</Badge>
                      <h4 className="text-white text-lg font-medium">
                        Wireframing the sustainable agriculture dashboard
                      </h4>
                    </div>
                  </div>
                )}
                {index === 3 && (
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop"
                      alt="Development process"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-emerald-500 mb-2">Development</Badge>
                      <h4 className="text-white text-lg font-medium">Building the food supply chain tracking system</h4>
                    </div>
                  </div>
                )}
                {index === 4 && (
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
                      alt="Testing and optimization"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-orange-500 mb-2">Testing</Badge>
                      <h4 className="text-white text-lg font-medium">Field testing with farmers in Kenya</h4>
                    </div>
                  </div>
                )}
                {index === 5 && (
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
                      alt="Measurement and analysis"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-red-500 mb-2">Analysis</Badge>
                      <h4 className="text-white text-lg font-medium">
                        Evaluating impact on crop yields and water usage
                      </h4>
                    </div>
                  </div>
                )}
                {index === 6 && (
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
                      alt="Iteration process"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-indigo-500 mb-2">Iteration</Badge>
                      <h4 className="text-white text-lg font-medium">Refining solutions based on community feedback</h4>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Case Study Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <Card className="bg-gray-800 border-gray-700 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1000&auto=format&fit=crop"
                    alt="Design process case study"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent" />
                </div>

                <div className="lg:col-span-2 p-8">
                  <div className="space-y-6">
                    <div>
                      <Badge className="bg-emerald-700 text-white mb-3">Case Study</Badge>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Sustainable Agriculture Dashboard: From Concept to Impact
                      </h3>
                      <p className="text-emerald-400 mb-4">A complete walkthrough of my design process</p>
                    </div>

                    <div className="space-y-4 text-gray-300">
                      <p>
                        This case study demonstrates how I applied my design process to create a real-time dashboard
                        that helps farmers track and improve their sustainability metrics.
                      </p>
                      <p>
                        Follow the journey from initial research with farming communities to the final implementation
                        that reduced water usage by 30% and increased crop yields by 15%.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <Badge variant="outline" className="bg-gray-700 text-gray-200 border-gray-600">
                        UX Research
                      </Badge>
                      <Badge variant="outline" className="bg-gray-700 text-gray-200 border-gray-600">
                        Data Visualization
                      </Badge>
                      <Badge variant="outline" className="bg-gray-700 text-gray-200 border-gray-600">
                        Sustainability
                      </Badge>
                      <Badge variant="outline" className="bg-gray-700 text-gray-200 border-gray-600">
                        Impact Measurement
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-md font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
                      >
                        View Case Study <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Design Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">My Design Philosophy</h3>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-300 mb-6">
              I believe that effective design is rooted in deep understanding of user needs, collaborative
              problem-solving, and continuous learning. My approach combines technical expertise with empathy to create
              solutions that are not only functional but also meaningful and impactful.
            </p>
            <p className="text-lg text-gray-300">
              Every project is an opportunity to create positive change in the world, especially in the critical areas
              of food security and climate resilience where thoughtful design can transform lives and communities.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

