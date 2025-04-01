"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Edit, Eye, PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface PendingSection {
  id: string
  name: string
  status: "empty" | "partial" | "complete"
  progress: number
  route: string
  description: string
}

export function PendingAdmin() {
  const [pendingSections, setPendingSections] = useState<PendingSection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // In a real app, this would fetch from your API
    const fetchPendingSections = async () => {
      try {
        // Mock data for demonstration
        const mockData: PendingSection[] = [
          {
            id: "design-process",
            name: "Design Process",
            status: "partial",
            progress: 60,
            route: "/admin/design-process",
            description: "Your design methodology and approach to projects",
          },
          {
            id: "quotations",
            name: "Quotations",
            status: "partial",
            progress: 80,
            route: "/admin/quotations",
            description: "Service packages and pricing information",
          },
          {
            id: "reviews",
            name: "Reviews",
            status: "empty",
            progress: 0,
            route: "/admin/reviews",
            description: "Client reviews and testimonials",
          },
          {
            id: "featured-work",
            name: "Featured Work",
            status: "partial",
            progress: 40,
            route: "/admin/featured",
            description: "Highlighted projects and special features",
          },
        ]

        setPendingSections(mockData)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch pending sections:", error)
        toast({
          title: "Error",
          description: "Failed to load pending sections",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchPendingSections()
  }, [toast])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "empty":
        return <Badge variant="destructive">Empty</Badge>
      case "partial":
        return (
          <Badge variant="warning" className="bg-amber-600">
            Partial
          </Badge>
        )
      case "complete":
        return (
          <Badge variant="success" className="bg-emerald-600">
            Complete
          </Badge>
        )
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const navigateToSection = (route: string) => {
    router.push(route)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pending Content</h1>
        <p className="text-muted-foreground">Manage sections that need content or updates.</p>
      </div>

      <Card className="bg-amber-900/10 border-amber-600/30">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
            Content Status
          </CardTitle>
          <CardDescription>
            Sections with missing or incomplete content will display placeholder messages on your live site. Complete
            these sections to ensure your portfolio looks professional.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Completion</span>
              <span className="text-sm">45%</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pendingSections.map((section) => (
          <Card
            key={section.id}
            className={`
            ${section.status === "empty" ? "border-red-600/30 bg-red-900/5" : ""}
            ${section.status === "partial" ? "border-amber-600/30 bg-amber-900/5" : ""}
            ${section.status === "complete" ? "border-emerald-600/30 bg-emerald-900/5" : ""}
          `}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{section.name}</CardTitle>
                {getStatusBadge(section.status)}
              </div>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Completion</span>
                  <span className="text-sm">{section.progress}%</span>
                </div>
                <Progress
                  value={section.progress}
                  className={`h-2 ${
                    section.status === "empty"
                      ? "bg-red-900/20"
                      : section.status === "partial"
                        ? "bg-amber-900/20"
                        : "bg-emerald-900/20"
                  }`}
                />
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Status Details:</h4>
                <ul className="text-sm space-y-1">
                  {section.status === "empty" && (
                    <>
                      <li className="flex items-center text-red-400">
                        <AlertTriangle className="h-4 w-4 mr-2" /> No content added yet
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <AlertTriangle className="h-4 w-4 mr-2" /> Section will show "Coming Soon" message
                      </li>
                    </>
                  )}

                  {section.status === "partial" && (
                    <>
                      <li className="flex items-center text-amber-400">
                        <AlertTriangle className="h-4 w-4 mr-2" /> Basic content added
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <AlertTriangle className="h-4 w-4 mr-2" /> Section needs more content or refinement
                      </li>
                    </>
                  )}

                  {section.status === "complete" && (
                    <li className="flex items-center text-emerald-400">
                      <CheckCircle className="h-4 w-4 mr-2" /> Content is complete and ready
                    </li>
                  )}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => window.open("/", "_blank")}>
                <Eye className="h-4 w-4 mr-2" /> Preview
              </Button>

              <div className="space-x-2">
                {section.status === "empty" ? (
                  <Button variant="coral" size="sm" onClick={() => navigateToSection(section.route)}>
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Content
                  </Button>
                ) : (
                  <Button
                    variant={section.status === "complete" ? "outline" : "default"}
                    size="sm"
                    onClick={() => navigateToSection(section.route)}
                  >
                    <Edit className="h-4 w-4 mr-2" /> Edit Content
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

