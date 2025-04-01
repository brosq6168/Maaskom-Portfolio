"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { FileText, Send, CheckCircle, Clock, Calendar, Globe } from "lucide-react"

// Service options for the quotation form
const serviceOptions = [
  {
    id: "web-development",
    name: "Web Development",
    description: "Custom websites, web applications, and e-commerce solutions",
    icon: FileText,
  },
  {
    id: "data-analysis",
    name: "Data Analysis & Visualization",
    description: "Transform raw data into actionable insights with custom dashboards",
    icon: FileText,
  },
  {
    id: "gis-mapping",
    name: "GIS & Mapping Solutions",
    description: "Geographic Information Systems for environmental monitoring",
    icon: FileText,
  },
  {
    id: "sustainable-agriculture",
    name: "Sustainable Agriculture Tech",
    description: "Technology solutions for sustainable farming practices",
    icon: FileText,
  },
]

// Timeline options only
const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-month", label: "Within 1 month" },
  { value: "1-3-months", label: "1-3 months" },
  { value: "3-plus-months", label: "3+ months" },
  { value: "flexible", label: "Flexible" },
]

export default function Quotations() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [isKenya, setIsKenya] = useState(false)
  const [locationDetected, setLocationDetected] = useState(false)
  const [manualLocationOverride, setManualLocationOverride] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    phone: "",
    projectDescription: "",
    timeline: "",
  })

  // Detect user's location on component mount
  useEffect(() => {
    const detectLocation = async () => {
      try {
        // In a real implementation, you would use a geolocation API service
        // For this example, we'll use a simple IP geolocation API
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()

        // Check if user is from Kenya
        const userIsFromKenya = data.country_code === "KE"
        setIsKenya(userIsFromKenya)
        setLocationDetected(true)

        console.log(`User detected as ${userIsFromKenya ? "from Kenya" : "international"}`)
      } catch (error) {
        console.error("Error detecting location:", error)
        // Default to international pricing if location detection fails
        setIsKenya(false)
        setLocationDetected(true)
      }
    }

    detectLocation()
  }, [])

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: string },
  ) => {
    const { name, value } = "target" in e ? e.target : e
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleLocation = () => {
    setIsKenya(!isKenya)
    setManualLocationOverride(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Combine form data with selected services
    const quotationData = {
      ...formData,
      services: selectedServices,
      isKenya,
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Quotation data:", quotationData)
      toast({
        title: "Quotation Request Received",
        description: "Thank you! We'll get back to you with a custom quote within 24-48 hours.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        organization: "",
        phone: "",
        projectDescription: "",
        timeline: "",
      })
      setSelectedServices([])
      setIsSubmitting(false)
    }, 1500)

    // In a real application, you would send this data to your backend:
    // await fetch("/api/quotations", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(quotationData),
    // });
  }

  // Track location for payment method display

  return (
    <section id="quotations" className="py-20 px-4 md:px-8 bg-gray-800 text-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Request a Quotation</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get a customized quote for your project. I'll analyze your needs and provide a detailed proposal tailored to
            your requirements.
          </p>

          {locationDetected && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <Globe className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-gray-300">
                Showing prices in {isKenya ? "Kenyan Shillings (KES)" : "US Dollars (USD)"}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30 text-xs"
                onClick={toggleLocation}
              >
                Switch to {isKenya ? "USD" : "KES"}
              </Button>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-900 rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-white">Why Request a Quote?</h3>

              <ul className="space-y-6">
                <li className="flex items-start gap-3">
                  <div className="bg-emerald-900/40 p-2 rounded-full mt-1">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Tailored Solutions</h4>
                    <p className="text-gray-300 text-sm">
                      Custom proposals based on your specific project requirements and goals
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="bg-emerald-900/40 p-2 rounded-full mt-1">
                    <Clock className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Quick Response</h4>
                    <p className="text-gray-300 text-sm">
                      Receive your detailed quote within 24-48 hours of submission
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="bg-emerald-900/40 p-2 rounded-full mt-1">
                    <Calendar className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Flexible Scheduling</h4>
                    <p className="text-gray-300 text-sm">
                      Project timelines adapted to your business needs and priorities
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 p-4 bg-emerald-900/20 rounded-lg border border-emerald-800">
                <p className="text-emerald-300 text-sm italic">
                  "I believe in transparent pricing and clear communication. Each quote includes a detailed breakdown of
                  costs, timelines, and deliverables."
                </p>
              </div>

              {isKenya && (
                <div className="mt-8 p-4 bg-blue-900/20 rounded-lg border border-blue-800">
                  <h4 className="font-medium text-white mb-2">Local Support</h4>
                  <p className="text-gray-300 text-sm">
                    As a Kenyan business, I understand the local market and offer specialized pricing and solutions for
                    businesses in Kenya.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">1. Tell us about yourself</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email"
                          required
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="organization">Organization/Company</Label>
                        <Input
                          id="organization"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          placeholder="Your organization (optional)"
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={isKenya ? "e.g. 0712 345 678" : "Your phone number"}
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-800">
                    <h3 className="text-lg font-medium text-white">2. Select services you're interested in</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {serviceOptions.map((service) => (
                        <div key={service.id} className="flex items-start space-x-3">
                          <Checkbox
                            id={service.id}
                            checked={selectedServices.includes(service.id)}
                            onCheckedChange={() => handleServiceToggle(service.id)}
                            className="mt-1"
                          />
                          <div className="space-y-1">
                            <Label htmlFor={service.id} className="font-medium text-white cursor-pointer">
                              {service.name}
                            </Label>
                            <p className="text-gray-400 text-sm">{service.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-800">
                    <h3 className="text-lg font-medium text-white">3. Project details</h3>

                    <div className="space-y-2">
                      <Label htmlFor="projectDescription">Project Description</Label>
                      <Textarea
                        id="projectDescription"
                        name="projectDescription"
                        value={formData.projectDescription}
                        onChange={handleChange}
                        placeholder="Describe your project, goals, and any specific requirements"
                        rows={5}
                        className="bg-gray-800 border-gray-700"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Project Timeline</Label>
                        <Select
                          value={formData.timeline}
                          onValueChange={(value) => handleChange({ name: "timeline", value })}
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-700">
                            <SelectValue placeholder="Select a timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            {timelineOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="coral"
                      className="w-full"
                      disabled={isSubmitting || selectedServices.length === 0}
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Request Quotation
                        </>
                      )}
                    </Button>
                    <p className="text-gray-400 text-sm text-center mt-3">
                      You'll receive a response within 24-48 hours
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="text-lg font-medium text-white">How does the quotation process work?</h4>
              <p className="text-gray-300">
                After submitting your request, I'll review your requirements and send a detailed proposal within 48
                hours. The quote includes project scope, timeline, deliverables, and pricing.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-medium text-white">Do you offer custom pricing?</h4>
              <p className="text-gray-300">
                Yes, each project is unique and priced according to its specific requirements. I'll provide a detailed
                custom quote based on your project needs and scope.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-medium text-white">What payment methods do you accept?</h4>
              <p className="text-gray-300">
                {isKenya
                  ? "I accept M-Pesa, bank transfers, and major credit cards. For larger projects, I typically request a 50% deposit to begin work."
                  : "I accept bank transfers, PayPal, and major credit cards. For larger projects, I typically request a 50% deposit to begin work."}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-medium text-white">How long does a typical project take?</h4>
              <p className="text-gray-300">
                Project timelines vary based on complexity and scope. Small projects may take 2-4 weeks, while larger
                ones can take 2-6 months. A detailed timeline will be included in your quote.
              </p>
            </div>

            {isKenya && (
              <div className="space-y-2">
                <h4 className="text-lg font-medium text-white">Do you offer services throughout Kenya?</h4>
                <p className="text-gray-300">
                  Yes, I work with clients across all counties in Kenya. While I'm based in Nairobi, I can travel to
                  your location for important meetings or conduct consultations remotely.
                </p>
              </div>
            )}

            {!isKenya && (
              <div className="space-y-2">
                <h4 className="text-lg font-medium text-white">Do you work with international clients?</h4>
                <p className="text-gray-300">
                  I have experience working with clients globally. We can coordinate across time zones and use video
                  conferencing for meetings to ensure smooth collaboration.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

