"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, Search, Filter, ArrowUpDown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ReviewDialog } from "@/components/admin/reviews/review-dialog"
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog"
import { useToast } from "@/hooks/use-toast"
import OptimizedImage from "@/components/ui/optimized-image"

export interface Review {
  id: number
  name: string
  role: string
  company?: string
  image: string
  rating: number
  text: string
  date: string
  featured: boolean
}

export function ReviewsAdmin() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentReview, setCurrentReview] = useState<Review | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const loadReviews = async () => {
      try {
        // In a real app, this would fetch from your API
        // Mock data for demonstration
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

        setReviews(mockReviews)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load reviews:", error)
        toast({
          title: "Error",
          description: "Failed to load reviews",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    loadReviews()
  }, [toast])

  const handleAddReview = (review: Review) => {
    setReviews([...reviews, review])
    setIsAddDialogOpen(false)
    toast({
      title: "Review added",
      description: "The review has been added successfully",
    })
  }

  const handleEditReview = (review: Review) => {
    setReviews(reviews.map((r) => (r.id === review.id ? review : r)))
    setIsEditDialogOpen(false)
    setCurrentReview(null)
    toast({
      title: "Review updated",
      description: "The review has been updated successfully",
    })
  }

  const handleDeleteReview = async () => {
    if (!currentReview) return

    try {
      // In a real app, this would call your API
      // await deleteReview(currentReview.id)

      setReviews(reviews.filter((r) => r.id !== currentReview.id))
      setIsDeleteDialogOpen(false)
      setCurrentReview(null)
      toast({
        title: "Review deleted",
        description: "The review has been deleted successfully",
      })
    } catch (error) {
      console.error("Failed to delete review:", error)
      toast({
        title: "Error",
        description: "Failed to delete review",
        variant: "destructive",
      })
    }
  }

  const toggleFeatured = (review: Review) => {
    const updatedReview = { ...review, featured: !review.featured }
    setReviews(reviews.map((r) => (r.id === review.id ? updatedReview : r)))
    toast({
      title: review.featured ? "Review unfeatured" : "Review featured",
      description: `The review has been ${review.featured ? "removed from" : "added to"} featured reviews`,
    })
  }

  const filteredReviews = reviews.filter(
    (review) =>
      review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.text.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
          <p className="text-muted-foreground">Manage client reviews displayed on your portfolio.</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Review
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search reviews..."
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
            <DropdownMenuItem>All Reviews</DropdownMenuItem>
            <DropdownMenuItem>Featured Reviews</DropdownMenuItem>
            <DropdownMenuItem>5-Star Reviews</DropdownMenuItem>
            <DropdownMenuItem>Recent Reviews</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
      ) : filteredReviews.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64 p-6">
            <p className="mb-4 text-muted-foreground text-center">
              No reviews found. Add your first review to showcase client feedback.
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Review
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
                    Reviewer
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <OptimizedImage
                          src={review.image || "/placeholder.svg?height=40&width=40"}
                          alt={review.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                          rounded="full"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{review.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {review.role}
                          {review.company ? `, ${review.company}` : ""}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{review.text}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>
                    {review.featured ? (
                      <Badge className="bg-emerald-600">Featured</Badge>
                    ) : (
                      <Badge variant="outline">Standard</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => toggleFeatured(review)}>
                        {review.featured ? "Unfeature" : "Feature"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setCurrentReview(review)
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
                          setCurrentReview(review)
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

      <ReviewDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSave={handleAddReview} mode="add" />

      {currentReview && (
        <ReviewDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          review={currentReview}
          onSave={handleEditReview}
          mode="edit"
        />
      )}

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteReview}
        title="Delete Review"
        description={`Are you sure you want to delete the review from "${currentReview?.name}"? This action cannot be undone.`}
      />
    </div>
  )
}

