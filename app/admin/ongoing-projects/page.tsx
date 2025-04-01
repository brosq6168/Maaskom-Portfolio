import { OngoingProjectsAdmin } from "@/components/admin/ongoing-projects/ongoing-projects-admin"
import { AdminAuthCheck } from "@/components/admin/auth-check"

export default function OngoingProjectsPage() {
  return (
    <AdminAuthCheck>
      <OngoingProjectsAdmin />
    </AdminAuthCheck>
  )
}

