"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { OngoingProject, Milestone } from "@/components/admin/ongoing-projects/ongoing-projects-admin"
import { createOngoingProject, updateOngoingProject } from "@/lib/api"

interface OngoingProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project?: OngoingProject
  onSave: (project: OngoingProject) => void
  mode: "add" | "edit"
}

export function OngoingProjectDialog({ open, onOpenChange, project, onSave, mode }: OngoingProjectDialogProps) {
  const [formData, setFormData] = useState<Partial<OngoingProject>>({
    title: "",
    description: "",
    image: "",
    tags: [],
    progress: 0,
    startDate: new Date().toISOString().split("T")[0],
    estimatedCompletion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    milestones: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tagInput, setTagInput] = useState("")
  const [milestoneInput, setMilestoneInput] = useState("")

  useEffect(() => {
    if (project && mode === "edit") {
      setFormData({
        ...project,
        startDate: new Date(project.startDate).toISOString().split("T")[0],
        estimatedCompletion: new Date(project.estimatedCompletion).toISOString().split("T")[0],
      })
    } else {
      setFormData({
        title: "",
        description: "",
        image: "",
        tags: [],
        progress: 0,
        startDate: new Date().toISOString().split("T")[0],
        estimatedCompletion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        milestones: [],
      })
    }
  }, [project, mode, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "progress") {
      const progressValue = Number.parseInt(value)
      if (progressValue >= 0 && progressValue <= 100) {
        setFormData({
          ...formData,
          [name]: progressValue,
        })
      }
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

  const addMilestone = () => {
    if (milestoneInput.trim()) {
      const newMilestone: Milestone = {
        title: milestoneInput.trim(),
        completed: false,
      }

      setFormData({
        ...formData,
        milestones: [...(formData.milestones || []), newMilestone],
      })
      setMilestoneInput("")
    }
  }

  const removeMilestone = (index: number) => {
    const updatedMilestones = [...(formData.milestones || [])]
    updatedMilestones.splice(index, 1)

    setFormData({
      ...formData,
      milestones: updatedMilestones,
    })
  }

  const toggleMilestoneCompletion = (index: number) => {
    const updatedMilestones = [...(formData.milestones || [])]
    updatedMilestones[index] = {
      ...updatedMilestones[index],
      completed: !updatedMilestones[index].completed,
    }

    setFormData({
      ...formData,
      milestones: updatedMilestones,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let savedProject

      if (mode === "add") {
        savedProject = await createOngoingProject(formData as OngoingProject)
      } else {
        savedProject = await updateOngoingProject(formData as OngoingProject)
      }

      onSave(savedProject)
    } catch (error) {
      console.error("Failed to save ongoing project:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Ongoing Project" : "Edit Ongoing Project"}</DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Add a new project in development with progress tracking."
              : "Edit the details and progress of your ongoing project."}
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

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="progress">Progress (%)</Label>
                <Input
                  id="progress"
                  name="progress"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedCompletion">Estimated Completion</Label>
                <Input
                  id="estimatedCompletion"
                  name="estimatedCompletion"
                  type="date"
                  value={formData.estimatedCompletion}
                  onChange={handleChange}
                  required
                />
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

            <div className="space-y-2">
              <Label>Milestones</Label>
              <div className="space-y-2 mb-2">
                {formData.milestones?.map((milestone, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`milestone-${index}`}
                        checked={milestone.completed}
                        onCheckedChange={() => toggleMilestoneCompletion(index)}
                      />
                      <Label
                        htmlFor={`milestone-${index}`}
                        className={milestone.completed ? "line-through text-muted-foreground" : ""}
                      >
                        {milestone.title}
                      </Label>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMilestone(index)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={milestoneInput}
                  onChange={(e) => setMilestoneInput(e.target.value)}
                  placeholder="Add a milestone"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addMilestone()
                    }
                  }}
                />
                <Button type="button" onClick={addMilestone} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
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

