"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Star } from "lucide-react"
import type { Review } from "@/components/admin/reviews/reviews-admin"

interface ReviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  review?: Review
  onSave: (review: Review) => void
  mode: "add" | "edit"
}

export function ReviewDialog({ open, onOpenChange, review, onSave, mode }: ReviewDialogProps) {
  const [formData, setFormData] = useState<Partial<Review>>({
    name: "",
    role: "",
    company: "",
    image: "",
    rating: 5,
    text: "",
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" }),
    featured: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (review && mode === "edit") {
      setFormData(review)
    } else {
      setFormData({
        name: "",
        role: "",
        company: "",
        image: "",
        rating: 5,
        text: "",
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" }),
        featured: false,
      })
    }
  }, [review, mode, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleRatingChange = (rating: number) => {
    setFormData({
      ...formData,
      rating,
    })
  }

  const handleFeaturedChange = (checked: boolean) => {
    setFormData({
      ...formData,
      featured: checked,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would call your API
      // const savedReview = await createReview(formData) or await updateReview(formData)

      // For demo purposes, we'll just simulate an API call
      const savedReview = {
        ...formData,
        id: review?.id || Math.floor(Math.random() * 1000),
      } as Review

      onSave(savedReview)
    } catch (error) {
      console.error("Failed to save review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Review" : "Edit Review"}</DialogTitle>
          <DialogDescription>
            {mode === "add" ? "Add a new client review to your portfolio." : "Edit the details of this review."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Reviewer Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role/Position</Label>
                <Input id="role" name="role" value={formData.role} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company/Organization</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Review Date</Label>
                <Input
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="e.g. March 2025"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Profile Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
              />
              <p className="text-sm text-muted-foreground">
                Enter a URL for the reviewer's profile image. For best results, use a square image.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className="focus:outline-none"
                    onClick={() => handleRatingChange(rating)}
                  >
                    <Star
                      className={`h-6 w-6 ${
                        rating <= (formData.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="text">Review Text</Label>
              <Textarea id="text" name="text" value={formData.text} onChange={handleChange} rows={5} required />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="featured" checked={formData.featured} onCheckedChange={handleFeaturedChange} />
              <Label htmlFor="featured" className="cursor-pointer">
                Feature this review on the homepage
              </Label>
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
                  ? "Add Review"
                  : "Update Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

