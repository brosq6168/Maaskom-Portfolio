"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import OptimizedImage from "./ui/optimized-image"
import IntersectionObserver from "./performance/intersection-observer"
import { measureRenderTime } from "@/lib/performance-utils"

const technicalSkills = [
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    proficiency: 85,
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    proficiency: 80,
  },
  {
    name: "GIS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/qgis/qgis-original.svg",
    proficiency: 90,
  },
  {
    name: "Data Analysis",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    proficiency: 75,
  },
  {
    name: "Database Management",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    proficiency: 70,
  },
  {
    name: "Sustainable Agriculture",
    logo: "https://img.icons8.com/color/96/null/natural-food.png",
    proficiency: 95,
  },
]

const tools = [
  {
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "Canva",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
  },
  {
    name: "Adobe Photoshop",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
  },
  {
    name: "Adobe After Effects",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-plain.svg",
  },
  {
    name: "Klaviyo",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/klaviyo.svg",
  },
  {
    name: "Trello",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg",
  },
  {
    name: "Zoho Analytics",
    logo: "https://www.zohowebstatic.com/sites/default/files/analytics/Zoho-Analytics-Logo.svg",
  },
  {
    name: "Excel/Google Sheets",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  },
  {
    name: "Git/GitHub",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "QGIS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/qgis/qgis-original.svg",
  },
]

// Add a new section for AI tools after the tools section
const aiTools = [
  {
    name: "TensorFlow",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  {
    name: "OpenAI API",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg",
  },
  {
    name: "Hugging Face",
    logo: "https://huggingface.co/favicon.ico",
  },
  {
    name: "Langchain",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/chainlink.svg",
  },
]

// Add a new section for API Development after the aiTools section
const apiDevelopment = [
  {
    name: "RESTful APIs",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "GraphQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },
  {
    name: "Swagger/OpenAPI",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/swagger.svg",
  },
  {
    name: "Postman",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/postman.svg",
  },
]

const softSkills = [
  {
    name: "Community Engagement",
    logo: "https://img.icons8.com/color/96/null/conference-call.png",
    proficiency: 95,
  },
  {
    name: "Project Management",
    logo: "https://img.icons8.com/color/96/null/project-management.png",
    proficiency: 85,
  },
  {
    name: "Research",
    logo: "https://img.icons8.com/color/96/null/microscope.png",
    proficiency: 90,
  },
  {
    name: "Public Speaking",
    logo: "https://img.icons8.com/color/96/null/podium-with-speaker.png",
    proficiency: 80,
  },
]

function Skills() {
  // Measure render time in development
  measureRenderTime("Skills", () => {
    console.log("Skills component rendered")
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="skills" className="py-20 px-4 md:px-8 bg-gray-900 text-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Skills & Tools</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A combination of technical expertise and domain knowledge in agrifood systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-white">Technical Skills</h3>
            <IntersectionObserver rootMargin="50px">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {technicalSkills.map((skill) => (
                  <motion.div key={skill.name} variants={item}>
                    <MemoizedSkillCard skill={skill} />
                  </motion.div>
                ))}
              </motion.div>
            </IntersectionObserver>

            <h3 className="text-2xl font-semibold mt-16 mb-8 text-white">Soft Skills</h3>
            <IntersectionObserver rootMargin="50px">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {softSkills.map((skill) => (
                  <motion.div key={skill.name} variants={item}>
                    <MemoizedSkillCard skill={skill} />
                  </motion.div>
                ))}
              </motion.div>
            </IntersectionObserver>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-8 text-white">Tools & Software</h3>
            <IntersectionObserver rootMargin="50px">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-6"
              >
                {tools.map((tool) => (
                  <motion.div key={tool.name} variants={item}>
                    <MemoizedToolCard tool={tool} />
                  </motion.div>
                ))}
              </motion.div>
            </IntersectionObserver>

            <h3 className="text-2xl font-semibold mt-16 mb-8 text-white">AI Tools</h3>
            <IntersectionObserver rootMargin="50px">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-6"
              >
                {aiTools.map((tool) => (
                  <motion.div key={tool.name} variants={item}>
                    <MemoizedToolCard tool={tool} />
                  </motion.div>
                ))}
              </motion.div>
            </IntersectionObserver>

            <h3 className="text-2xl font-semibold mt-16 mb-8 text-white">API Development</h3>
            <IntersectionObserver rootMargin="50px">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-6"
              >
                {apiDevelopment.map((tool) => (
                  <motion.div key={tool.name} variants={item}>
                    <MemoizedToolCard tool={tool} />
                  </motion.div>
                ))}
              </motion.div>
            </IntersectionObserver>
          </div>
        </div>
      </div>
    </section>
  )
}

// Memoized components to prevent unnecessary re-renders
const SkillCard = ({ skill }: { skill: { name: string; logo: string; proficiency: number } }) => {
  return (
    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow duration-300 bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gray-700 p-2 rounded-full w-12 h-12 flex items-center justify-center">
            <OptimizedImage
              src={skill.logo || "/placeholder.svg"}
              alt={`${skill.name} icon`}
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <h4 className="font-medium text-white">{skill.name}</h4>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-1">
          <motion.div
            className="bg-emerald-600 h-2.5 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="text-right text-sm text-gray-300">{skill.proficiency}%</div>
      </CardContent>
    </Card>
  )
}

const ToolCard = ({ tool }: { tool: { name: string; logo: string } }) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow duration-300 bg-gray-800 border-gray-700">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <div className="bg-gray-700 p-3 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
            <OptimizedImage
              src={tool.logo || "/placeholder.svg"}
              alt={`${tool.name} icon`}
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </div>
          <h4 className="font-medium text-white">{tool.name}</h4>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Memoize components to prevent unnecessary re-renders
const MemoizedSkillCard = memo(SkillCard)
const MemoizedToolCard = memo(ToolCard)

// Export memoized component
export default memo(Skills)

