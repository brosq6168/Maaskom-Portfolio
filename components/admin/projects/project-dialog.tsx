"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/components/admin/projects/projects-admin"
import { createProject, updateProject } from "@/lib/api"

interface ProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project?: Project
  onSave: (project: Project) => void
  mode: "add" | "edit"
}

export function ProjectDialog({ open, onOpenChange, project, onSave, mode }: ProjectDialogProps) {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    image: "",
    tags: [],
    github: "",
    demo: "",
    caseStudy: {
      challenge: "",
      solution: "",
      outcome: "",
      techStack: [],
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tagInput, setTagInput] = useState("")
  const [techStackInput, setTechStackInput] = useState("")

  useEffect(() => {
    if (project && mode === "edit") {
      setFormData(project)
    } else {
      setFormData({
        title: "",
        description: "",
        image: "",
        tags: [],
        github: "",
        demo: "",
        caseStudy: {
          challenge: "",
          solution: "",
          outcome: "",
          techStack: [],
        },
      })
    }
  }, [project, mode, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      })
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t) => t !== tag),
    })
  }

  const addTechStack = () => {
    if (techStackInput.trim() && !formData.caseStudy?.techStack?.includes(techStackInput.trim())) {
      setFormData({
        ...formData,
        caseStudy: {
          ...formData.caseStudy!,
          techStack: [...(formData.caseStudy?.techStack || []), techStackInput.trim()],
        },
      })
      setTechStackInput("")
    }
  }

  const removeTechStack = (tech: string) => {
    setFormData({
      ...formData,
      caseStudy: {
        ...formData.caseStudy!,
        techStack: formData.caseStudy?.techStack?.filter((t) => t !== tech),
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let savedProject

      if (mode === "add") {
        savedProject = await createProject(formData as Project)
      } else {
        savedProject = await updateProject(formData as Project)
      }

      onSave(savedProject)
    } catch (error) {
      console.error("Failed to save project:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Project" : "Edit Project"}</DialogTitle>
          <DialogDescription>
            {mode === "add" ? "Add a new project to your portfolio." : "Edit the details of your project."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" name="image" value={formData.image} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub URL</Label>
                <Input id="github" name="github" value={formData.github} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo">Demo URL</Label>
                <Input id="demo" name="demo" value={formData.demo} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Case Study</h3>

              <div className="space-y-2">
                <Label htmlFor="caseStudy.challenge">Challenge</Label>
                <Textarea
                  id="caseStudy.challenge"
                  name="caseStudy.challenge"
                  value={formData.caseStudy?.challenge}
                  onChange={handleChange}
                  required
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="caseStudy.solution">Solution</Label>
                <Textarea
                  id="caseStudy.solution"
                  name="caseStudy.solution"
                  value={formData.caseStudy?.solution}
                  onChange={handleChange}
                  required
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="caseStudy.outcome">Outcome</Label>
                <Textarea
                  id="caseStudy.outcome"
                  name="caseStudy.outcome"
                  value={formData.caseStudy?.outcome}
                  onChange={handleChange}
                  required
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Tech Stack</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.caseStudy?.techStack?.map((tech) => (
                    <Badge key={tech} variant="outline" className="flex items-center gap-1">
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechStack(tech)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove</span>
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    placeholder="Add a technology"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTechStack()
                      }
                    }}
                  />
                  <Button type="button" onClick={addTechStack} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? mode === "add"
                  ? "Adding..."
                  : "Updating..."
                : mode === "add"
                  ? "Add Project"
                  : "Update Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

