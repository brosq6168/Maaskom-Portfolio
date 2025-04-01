"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "./logo"

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Ongoing Projects", href: "#ongoing-projects" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "About", href: "#about" },
  { name: "Design Process", href: "#design-process" },
  { name: "Featured Work", href: "#featured" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Reviews", href: "#reviews" },
  { name: "Quotations", href: "#quotations" },
  { name: "Contact", href: "#contact" },
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && !target.closest("[data-mobile-nav]")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isOpen])

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.replace("#", "")).filter(Boolean)

      const visibleSections = sections.filter((section) => {
        const element = document.getElementById(section)
        if (!element) return false

        const rect = element.getBoundingClientRect()
        return rect.top <= 150 && rect.bottom >= 150
      })

      setActiveSection(visibleSections[0] || "")
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle navigation
  const handleNavigation = (href: string) => {
    setIsOpen(false)

    // Smooth scroll to section
    if (href.startsWith("#")) {
      const sectionId = href.replace("#", "")
      if (!sectionId) {
        // Scroll to top for home
        window.scrollTo({ top: 0, behavior: "smooth" })
        return
      }

      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <div className="md:hidden" data-mobile-nav>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-5 left-5 z-50 bg-gray-900/70 backdrop-blur-sm text-white hover:bg-gray-800/80"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      </Button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-sm"
          >
            <div className="flex flex-col h-full p-6 pt-20">
              <div className="flex justify-center mb-8">
                <Logo width={120} height={48} opacity={0.9} />
              </div>

              <nav className="flex-1">
                <ul className="space-y-4">
                  {navLinks.map((link) => {
                    const isActive =
                      activeSection === link.href.replace("#", "") || (link.href === "#" && activeSection === "")

                    return (
                      <li key={link.href}>
                        <button
                          onClick={() => handleNavigation(link.href)}
                          className={`w-full text-left py-3 px-4 rounded-md text-lg font-medium transition-colors ${
                            isActive ? "bg-emerald-900/50 text-emerald-400" : "text-white hover:bg-gray-800/50"
                          }`}
                        >
                          {link.name}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <div className="mt-auto pt-6 border-t border-gray-800">
                <p className="text-gray-400 text-sm text-center">&copy; {new Date().getFullYear()} Maaskom</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

