"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, Search, Filter, ArrowUpDown, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { OngoingProjectDialog } from "@/components/admin/ongoing-projects/ongoing-project-dialog"
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog"
import { fetchOngoingProjects, deleteOngoingProject } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export interface Milestone {
  title: string
  completed: boolean
}

export interface OngoingProject {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  progress: number
  startDate: string
  estimatedCompletion: string
  milestones: Milestone[]
}

export function OngoingProjectsAdmin() {
  const [projects, setProjects] = useState<OngoingProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState<OngoingProject | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchOngoingProjects()
        setProjects(data)
      } catch (error) {
        console.error("Failed to load ongoing projects:", error)
        toast({
          title: "Error",
          description: "Failed to load ongoing projects",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [toast])

  const handleAddProject = (project: OngoingProject) => {
    setProjects([...projects, project])
    setIsAddDialogOpen(false)
    toast({
      title: "Project added",
      description: "The ongoing project has been added successfully",
    })
  }

  const handleEditProject = (project: OngoingProject) => {
    setProjects(projects.map((p) => (p.id === project.id ? project : p)))
    setIsEditDialogOpen(false)
    setCurrentProject(null)
    toast({
      title: "Project updated",
      description: "The ongoing project has been updated successfully",
    })
  }

  const handleDeleteProject = async () => {
    if (!currentProject) return

    try {
      await deleteOngoingProject(currentProject.id)
      setProjects(projects.filter((p) => p.id !== currentProject.id))
      setIsDeleteDialogOpen(false)
      setCurrentProject(null)
      toast({
        title: "Project deleted",
        description: "The ongoing project has been deleted successfully",
      })
    } catch (error) {
      console.error("Failed to delete ongoing project:", error)
      toast({
        title: "Error",
        description: "Failed to delete ongoing project",
        variant: "destructive",
      })
    }
  }

  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const today = new Date()
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ongoing Projects</h1>
          <p className="text-muted-foreground">Manage your current projects in development with progress tracking.</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search ongoing projects..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>All Projects</DropdownMenuItem>
            <DropdownMenuItem>High Priority</DropdownMenuItem>
            <DropdownMenuItem>Nearly Complete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64 p-6">
            <p className="mb-4 text-muted-foreground text-center">
              No ongoing projects found. Add your first project to track its progress.
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <div className="flex items-center">
                    Project
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Milestones</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div>{project.title}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {project.tags.slice(0, 1).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 1 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.tags.length - 1}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>Start: {formatDate(project.startDate)}</div>
                      <div>Est. Completion: {formatDate(project.estimatedCompletion)}</div>
                      <div className="flex items-center text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="text-xs">{calculateDaysRemaining(project.estimatedCompletion)} days left</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="mb-1">
                        {project.milestones.filter((m) => m.completed).length} of {project.milestones.length} completed
                      </div>
                      <div className="flex gap-1">
                        {project.milestones.map((milestone, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${milestone.completed ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"}`}
                            title={milestone.title}
                          />
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setCurrentProject(project)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => {
                          setCurrentProject(project)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <OngoingProjectDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSave={handleAddProject}
        mode="add"
      />

      {currentProject && (
        <OngoingProjectDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          project={currentProject}
          onSave={handleEditProject}
          mode="edit"
        />
      )}

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteProject}
        title="Delete Ongoing Project"
        description={`Are you sure you want to delete "${currentProject?.title}"? This action cannot be undone.`}
      />
    </div>
  )
}

