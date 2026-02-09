"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BookOpen, PenTool, FileText, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { HelpCircle } from "lucide-react" 

export function AdminSidebar() {
  const pathname = usePathname()

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/modul", label: "Kelola Modul", icon: BookOpen },
    { href: "/admin/resources", label: "Kelola Resources", icon: FileText },
    { href: "/admin/blog", label: "Kelola Blog", icon: PenTool },
    { href: "/admin/faq", label: "Kelola FAQ", icon: HelpCircle },
  ]

  return (
    <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col fixed h-full inset-y-0 z-50">
      <div className="p-6 border-b border-slate-800">
           <span className="text-2xl font-bold tracking-tight flex gap-1">
              <span className="text-blue-500">ScaleBiz</span> 
              <span className="text-violet-500">Admin</span>
           </span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
                <Link 
                    key={link.href}
                    href={link.href} 
                    className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                        isActive 
                            ? "bg-blue-600 text-white" 
                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    )}
                >
                    <Icon className="w-5 h-5" />
                    {link.label}
                </Link>
            )
          })}
      </nav>

      <div className="p-4 border-t border-slate-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors mb-2">
              <LogOut className="w-5 h-5" />
              Keluar ke Website
          </Link>
      </div>
    </aside>
  )
}