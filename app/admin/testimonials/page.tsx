import { TestimonialsAdmin } from "@/components/admin/testimonials/testimonials-admin"
import { AdminAuthCheck } from "@/components/admin/auth-check"

export default function TestimonialsPage() {
  return (
    <AdminAuthCheck>
      <TestimonialsAdmin />
    </AdminAuthCheck>
  )
}

