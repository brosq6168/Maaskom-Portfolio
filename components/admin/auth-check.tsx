"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkAuth } from "@/lib/auth"
import { Loader2 } from "lucide-react"

export function AdminAuthCheck({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const verifyAuth = async () => {
      const authenticated = await checkAuth()
      setIsAuthenticated(authenticated)

      if (!authenticated) {
        router.push("/admin/login")
      }
    }

    verifyAuth()
  }, [router])

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        <span className="ml-2 text-lg">Verifying authentication...</span>
      </div>
    )
  }

  if (isAuthenticated === false) {
    return null
  }

  return <>{children}</>
}

