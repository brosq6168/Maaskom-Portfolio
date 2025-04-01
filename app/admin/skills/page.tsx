import { SkillsAdmin } from "@/components/admin/skills/skills-admin"
import { AdminAuthCheck } from "@/components/admin/auth-check"

export default function SkillsPage() {
  return (
    <AdminAuthCheck>
      <SkillsAdmin />
    </AdminAuthCheck>
  )
}

