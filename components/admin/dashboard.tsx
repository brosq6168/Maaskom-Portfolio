"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, MessageSquare, Award, Eye, PlusCircle, Settings, AlertTriangle } from "lucide-react"
import { fetchDashboardStats } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface DashboardStats {
  totalProjects: number
  totalSkills: number
  totalTestimonials: number
  totalFeatured: number
  totalReviews: number
  totalQuotations: number
  pendingSections: string[]
  recentVisits: number
  visitsData: { date: string; visits: number }[]
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchDashboardStats()
        setStats(data)
      } catch (error) {
        console.error("Failed to load dashboard stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [])

  // Mock data for demonstration
  const mockStats: DashboardStats = {
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

  const data = stats || mockStats

  const navigateToSection = (section: string) => {
    const route = `/admin/${section.toLowerCase().replace(/\s+/g, "-")}`
    router.push(route)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your portfolio website statistics and content.</p>
      </div>

      {data.pendingSections.length > 0 && (
        <Alert variant="warning" className="bg-amber-900/20 border-amber-700 text-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <AlertTitle>Pending Content</AlertTitle>
          <AlertDescription>
            The following sections need content: {data.pendingSections.join(", ")}. These sections will show as
            "Awaiting Content" on your live site.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigateToSection("projects")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalProjects}</div>
            <p className="text-xs text-muted-foreground">Projects showcased on your portfolio</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigateToSection("skills")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills & Tools</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalSkills}</div>
            <p className="text-xs text-muted-foreground">Skills and tools displayed on your profile</p>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigateToSection("testimonials")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalTestimonials}</div>
            <p className="text-xs text-muted-foreground">Testimonials from clients and partners</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Visits</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.recentVisits}</div>
            <p className="text-xs text-muted-foreground">Visits in the last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
            <CardDescription>Manage all sections of your portfolio website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "Projects", icon: FileText, count: data.totalProjects },
                { name: "Ongoing Projects", icon: Settings, count: 2 },
                { name: "Skills", icon: Award, count: data.totalSkills },
                { name: "Featured Work", icon: PlusCircle, count: data.totalFeatured },
                { name: "Testimonials", icon: MessageSquare, count: data.totalTestimonials },
                { name: "Reviews", icon: MessageSquare, count: data.totalReviews },
                { name: "Design Process", icon: Settings, count: 1 },
                { name: "Quotations", icon: FileText, count: data.totalQuotations },
                { name: "About", icon: PlusCircle, count: 1 },
              ].map((section) => (
                <Card
                  key={section.name}
                  className={`hover:shadow-md transition-shadow cursor-pointer ${data.pendingSections.includes(section.name) ? "border-amber-600/50 bg-amber-900/10" : ""}`}
                  onClick={() => navigateToSection(section.name)}
                >
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <section.icon className="h-8 w-8 mb-2 text-emerald-500" />
                    <h3 className="font-medium">{section.name}</h3>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-muted-foreground">{section.count} items</span>
                      {data.pendingSections.includes(section.name) && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-amber-900/30 text-amber-200 rounded-full">
                          Pending
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="coral"
              className="w-full justify-start"
              onClick={() => router.push("/admin/projects?action=new")}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Project
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => router.push("/admin/ongoing-projects?action=new")}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Ongoing Project
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => router.push("/admin/testimonials?action=new")}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Testimonial
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => router.push("/admin/reviews?action=new")}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Review
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start text-amber-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20"
              onClick={() => router.push("/admin/pending")}
            >
              <AlertTriangle className="mr-2 h-4 w-4" /> Manage Pending Sections
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Website Visits</CardTitle>
                <CardDescription>Visitor traffic over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] w-full">
                  {/* This would be a real chart in production */}
                  <div className="flex h-full items-end gap-2 pb-4">
                    {data.visitsData.map((month, i) => (
                      <div key={i} className="relative flex w-full flex-col items-center">
                        <div
                          className="bg-emerald-500 w-full rounded-md transition-all"
                          style={{
                            height: `${(month.visits / 300) * 100}%`,
                          }}
                        />
                        <span className="mt-2 text-xs">{month.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Content Distribution</CardTitle>
                <CardDescription>Breakdown of your portfolio content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Projects</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(
                            (data.totalProjects /
                              (data.totalProjects + data.totalSkills + data.totalTestimonials + data.totalFeatured)) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{
                            width: `${
                              (data.totalProjects /
                                (data.totalProjects + data.totalSkills + data.totalTestimonials + data.totalFeatured)) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Skills</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(
                            (data.totalSkills /
                              (data.totalProjects + data.totalSkills + data.totalTestimonials + data.totalFeatured)) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{
                            width: `${
                              (data.totalSkills /
                                (data.totalProjects + data.totalSkills + data.totalTestimonials + data.totalFeatured)) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Testimonials</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(
                            (data.totalTestimonials /
                              (data.totalProjects + data.totalSkills + data.totalTestimonials + data.totalFeatured)) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-yellow-500"
                          style={{
                            width: `${
                              (data.totalTestimonials /
                                (data.totalProjects + data.totalSkills + data.totalTestimonials + data.totalFeatured)) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Featured</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(
                            (data.totalFeatured /
                              (data.totalProjects + data.totalSkills + data.totalTestimonials + data.totalFeatured)) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-purple-500"
                          style={{
                            width: `${
                              (data.totalFeatured /
                                (data.totalProjects + data.totalSkills + data.totalTestimonials + data.totalFeatured)) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Detailed analytics will be available here.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Analytics features are coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and download reports about your portfolio.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Reporting features are coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

