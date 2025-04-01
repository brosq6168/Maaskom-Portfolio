// This is a mock API implementation for demonstration purposes
// In a real application, you would connect to a database or external API

import type { Project } from "@/components/admin/projects/projects-admin"
import type { OngoingProject } from "@/components/admin/ongoing-projects/ongoing-projects-admin"
import type { Review } from "@/components/admin/reviews/reviews-admin"

// Mock data
const mockProjects: Project[] = [
  {
    id: 1,
    title: "Kenyan Rangelands Restoration",
    description: "A community-driven initiative to restore degraded rangelands in Kenya.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=600&auto=format&fit=crop",
    tags: ["Climate Tech", "Community Impact", "GIS"],
    github: "https://github.com",
    demo: "https://demo.com",
    caseStudy: {
      challenge: "Over 50 hectares of Kenyan rangelands were degraded due to overgrazing and climate change.",
      solution: "Implemented a community-based monitoring system using GIS technology and indigenous knowledge.",
      outcome:
        "Restored 50+ hectares of rangelands, increasing biodiversity and improving livelihoods for local communities.",
      techStack: ["React", "Node.js", "GIS", "MongoDB"],
    },
  },
  {
    id: 2,
    title: "Sustainable Agriculture Dashboard",
    description: "Interactive dashboard for monitoring sustainable farming practices.",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=600&auto=format&fit=crop",
    tags: ["Data Visualization", "Sustainability", "React"],
    github: "https://github.com",
    demo: "https://demo.com",
    caseStudy: {
      challenge: "Farmers lacked tools to track and improve their sustainability metrics.",
      solution: "Developed a real-time dashboard that visualizes key sustainability indicators.",
      outcome: "Helped 200+ farmers reduce water usage by 30% and increase crop yields by 15%.",
      techStack: ["Next.js", "Tailwind CSS", "D3.js", "Supabase"],
    },
  },
  {
    id: 3,
    title: "Food Supply Chain Tracker",
    description: "Blockchain-based solution for transparent food supply chains.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop",
    tags: ["Blockchain", "Supply Chain", "Food Security"],
    github: "https://github.com",
    demo: "https://demo.com",
    caseStudy: {
      challenge: "Lack of transparency in food supply chains leading to waste and inefficiency.",
      solution: "Built a blockchain solution to track food from farm to table with QR code integration.",
      outcome: "Reduced food waste by 25% and increased consumer trust in participating brands.",
      techStack: ["Ethereum", "React", "Node.js", "QR Code API"],
    },
  },
  {
    id: 4,
    title: "Community Seed Bank App",
    description: "Mobile application for managing community seed banks and preserving biodiversity.",
    image: "https://images.unsplash.com/photo-1620141925422-4eeaad36e9fe?q=80&w=600&auto=format&fit=crop",
    tags: ["Mobile App", "Biodiversity", "Community"],
    github: "https://github.com",
    demo: "https://demo.com",
    caseStudy: {
      challenge: "Local seed varieties were being lost due to commercial agriculture expansion.",
      solution: "Created a mobile app for cataloging, sharing, and preserving indigenous seeds.",
      outcome: "Preserved 150+ local seed varieties and connected 15 community seed banks.",
      techStack: ["React Native", "Firebase", "Expo", "Google Maps API"],
    },
  },
]

// Mock ongoing projects data
const mockOngoingProjects: OngoingProject[] = [
  {
    id: 1,
    title: "STANDARD ECO FOUNDATION NGO Landing Page",
    description:
      "A modern, responsive website for the STANDARD ECO FOUNDATION NGO to showcase their initiatives and impact.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=600&auto=format&fit=crop",
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

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Project Manager",
    company: "Climate Action Network",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    text: "Andrew's work on the rangeland restoration project exceeded our expectations. His ability to combine technical expertise with community engagement made a real difference in our project outcomes.",
    date: "March 2025",
    featured: true,
  },
  {
    id: 2,
    name: "Dr. Michael Ochieng",
    role: "Director",
    company: "East African Climate Institute",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    text: "I've collaborated with Andrew on several research initiatives. His deep understanding of both agricultural systems and climate science makes him an invaluable partner in our work.",
    date: "February 2025",
    featured: true,
  },
  {
    id: 3,
    name: "Amina Wangari",
    role: "Community Leader",
    company: "Narok County",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    text: "The training Andrew provided to our women's group has transformed how we approach sustainable farming. His respectful integration of our traditional knowledge with modern techniques was particularly appreciated.",
    date: "January 2025",
    featured: false,
  },
  {
    id: 4,
    name: "James Mwangi",
    role: "CEO",
    company: "AgriTech Solutions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 4,
    text: "Working with Andrew on our mobile app development was a great experience. His insights into the needs of small-scale farmers helped us create a truly useful product.",
    date: "December 2024",
    featured: false,
  },
  {
    id: 5,
    name: "Emma Njeri",
    role: "Program Officer",
    company: "UN Environment",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    text: "Andrew's presentation at our climate resilience conference was one of the highlights. His ability to communicate complex ideas in accessible ways made a strong impression on all attendees.",
    date: "November 2024",
    featured: true,
  },
  {
    id: 6,
    name: "Daniel Kimani",
    role: "Farmer",
    company: "Nakuru County",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    text: "The sustainable agriculture dashboard Andrew helped develop has changed how I manage my farm. I've reduced water usage by 25% while increasing yields. Truly transformative work!",
    date: "October 2024",
    featured: false,
  },
]

// Mock dashboard stats
const mockDashboardStats = {
  totalProjects: 4,
  totalSkills: 10,
  totalTestimonials: 4,
  totalFeatured: 1,
  totalReviews: 6,
  totalQuotations: 2,
  pendingSections: ["Design Process", "Quotations", "Reviews"],
  recentVisits: 256,
  visitsData: [
    { date: "Jan", visits: 120 },
    { date: "Feb", visits: 180 },
    { date: "Mar", visits: 220 },
    { date: "Apr", visits: 250 },
    { date: "May", visits: 300 },
    { date: "Jun", visits: 256 },
  ],
}

// Projects API
export async function fetchProjects(): Promise<Project[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  return [...mockProjects]
}

export async function createProject(project: Project): Promise<Project> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Create new project with ID
  const newProject = {
    ...project,
    id: Math.max(0, ...mockProjects.map((p) => p.id)) + 1,
  }

  // Add to mock data
  mockProjects.push(newProject)

  return newProject
}

export async function updateProject(project: Project): Promise<Project> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Find and update project
  const index = mockProjects.findIndex((p) => p.id === project.id)

  if (index !== -1) {
    mockProjects[index] = project
  }

  return project
}

export async function deleteProject(id: number): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  // Remove project from mock data
  const index = mockProjects.findIndex((p) => p.id === id)

  if (index !== -1) {
    mockProjects.splice(index, 1)
  }
}

// Ongoing Projects API
export async function fetchOngoingProjects(): Promise<OngoingProject[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  return [...mockOngoingProjects]
}

export async function createOngoingProject(project: OngoingProject): Promise<OngoingProject> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Create new project with ID
  const newProject = {
    ...project,
    id: Math.max(0, ...mockOngoingProjects.map((p) => p.id)) + 1,
  }

  // Add to mock data
  mockOngoingProjects.push(newProject)

  return newProject
}

export async function updateOngoingProject(project: OngoingProject): Promise<OngoingProject> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Find and update project
  const index = mockOngoingProjects.findIndex((p) => p.id === project.id)

  if (index !== -1) {
    mockOngoingProjects[index] = project
  }

  return project
}

export async function deleteOngoingProject(id: number): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  // Remove project from mock data
  const index = mockOngoingProjects.findIndex((p) => p.id === id)

  if (index !== -1) {
    mockOngoingProjects.splice(index, 1)
  }
}

// Reviews API
export async function fetchReviews(): Promise<Review[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  return [...mockReviews]
}

export async function createReview(review: Review): Promise<Review> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Create new review with ID
  const newReview = {
    ...review,
    id: Math.max(0, ...mockReviews.map((r) => r.id)) + 1,
  }

  // Add to mock data
  mockReviews.push(newReview)

  return newReview
}

export async function updateReview(review: Review): Promise<Review> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Find and update review
  const index = mockReviews.findIndex((r) => r.id === review.id)

  if (index !== -1) {
    mockReviews[index] = review
  }

  return review
}

export async function deleteReview(id: number): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  // Remove review from mock data
  const index = mockReviews.findIndex((r) => r.id === id)

  if (index !== -1) {
    mockReviews.splice(index, 1)
  }
}

// Dashboard API
export async function fetchDashboardStats() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  // Return mock data
  return mockDashboardStats
}

// Check if section has content
export async function checkSectionContent(sectionId: string): Promise<{
  hasContent: boolean
  status: "empty" | "partial" | "complete"
  progress: number
}> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock implementation - in a real app, this would check your database
  const contentStatus = {
    reviews: {
      hasContent: mockReviews.length > 0,
      status: mockReviews.length > 3 ? "complete" : mockReviews.length > 0 ? "partial" : "empty",
      progress: mockReviews.length > 3 ? 100 : mockReviews.length * 25,
    },
    "design-process": { hasContent: false, status: "partial", progress: 60 },
    quotations: { hasContent: true, status: "partial", progress: 80 },
    "featured-work": { hasContent: true, status: "partial", progress: 40 },
  }

  return contentStatus[sectionId as keyof typeof contentStatus] || { hasContent: false, status: "empty", progress: 0 }
}

