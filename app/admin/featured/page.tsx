import { FeaturedAdmin } from "@/components/admin/featured/featured-admin"
import { AdminAuthCheck } from "@/components/admin/auth-check"

export default function FeaturedPage() {
  return (
    <AdminAuthCheck>
      <FeaturedAdmin />
    </AdminAuthCheck>
  )
}

