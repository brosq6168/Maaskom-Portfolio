import { AboutAdmin } from "@/components/admin/about/about-admin"
import { AdminAuthCheck } from "@/components/admin/auth-check"

export default function AboutPage() {
  return (
    <AdminAuthCheck>
      <AboutAdmin />
    </AdminAuthCheck>
  )
}

