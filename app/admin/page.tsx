import { AdminDashboard } from "@/components/admin/dashboard"
import { AdminAuthCheck } from "@/components/admin/auth-check"

export default function AdminPage() {
  return (
    <AdminAuthCheck>
      <AdminDashboard />
    </AdminAuthCheck>
  )
}

