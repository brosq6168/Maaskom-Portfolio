"use client"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import Logo from "./logo"

export default function Footer() {
  return (
    <footer className="py-12 px-4 md:px-8 bg-gray-900 text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative h-10 w-28 mr-3">
                <Logo width={100} height={40} opacity={0.8} />
              </div>
            </div>
            <p className="text-gray-300">
              Building resilient food systems through technology and sustainable agriculture.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-300">
              Email: contact@example.com
              <br />
              Phone: +1 (234) 567-8901
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Maaskom. All rights reserved.</p>
          <p className="mt-2">Reveal your ideas</p>
        </div>
      </div>
    </footer>
  )
}

