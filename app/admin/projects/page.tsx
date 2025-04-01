import { ProjectsAdmin } from "@/components/admin/projects/projects-admin"
import { AdminAuthCheck } from "@/components/admin/auth-check"

export default function ProjectsPage() {
  return (
    <AdminAuthCheck>
      <ProjectsAdmin />
    </AdminAuthCheck>
  )
}

