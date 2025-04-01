import { ReviewsAdmin } from "@/components/admin/reviews/reviews-admin"
import { AdminAuthCheck } from "@/components/admin/auth-check"

export default function ReviewsPage() {
  return (
    <AdminAuthCheck>
      <ReviewsAdmin />
    </AdminAuthCheck>
  )
}

