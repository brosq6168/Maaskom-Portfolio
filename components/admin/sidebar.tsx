"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FolderKanban,
  Award,
  MessageSquareQuote,
  FileText,
  User,
  Settings,
  LogOut,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { signOut } from "@/lib/auth"
import Logo from "../logo"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Ongoing Projects",
    href: "/admin/ongoing-projects",
    icon: Clock,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    title: "Skills",
    href: "/admin/skills",
    icon: Award,
  },
  {
    title: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
  {
    title: "Featured Work",
    href: "/admin/featured",
    icon: FileText,
  },
  {
    title: "About",
    href: "/admin/about",
    icon: User,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  const handleSignOut = async () => {
    await signOut()
    window.location.href = "/admin/login"
  }

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-80">
      <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4 mb-5">
          <div className="relative h-8 w-24 mr-2">
            <Logo width={90} height={36} opacity={0.9} />
          </div>
          <h1 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">Admin</h1>
        </div>
        <ScrollArea className="flex-1 px-3">
          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-100"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>
        <div className="p-4">
          <Button
            variant="outline"
            className="w-full justify-start text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}

