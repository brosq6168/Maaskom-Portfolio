import { PendingAdmin } from "@/components/admin/pending/pending-admin"
import { AdminAuthCheck } from "@/components/admin/auth-check"

export default function PendingPage() {
  return (
    <AdminAuthCheck>
      <PendingAdmin />
    </AdminAuthCheck>
  )
}

