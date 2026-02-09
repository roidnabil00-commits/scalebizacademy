"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Loader2 } from "lucide-react"
import { AdminSidebar } from "@/components/admin/adminsidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkAccess = async () => {
      const supabase = createClient()
      
      // 1. Cek User Login (Browser Side)
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // Jika tidak login, tendang ke login
        router.push("/login")
        return
      }

      // 2. Cek Role di Database
      // Kita ambil data role user yang sedang login dari tabel 'users'
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      // 3. Validasi Role
      if (profile && profile.role === 'admin') {
        // Jika role admin, IZINKAN MASUK
        setIsAuthorized(true)
        setIsLoading(false)
      } else {
        // Jika role user biasa, tendang ke Home
        alert("Akses Ditolak: Anda bukan Admin.")
        router.push("/")
      }
    }

    checkAccess()
  }, [router])

  // Tampilan Loading saat mengecek
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm text-slate-500">Memverifikasi hak akses admin...</p>
        </div>
      </div>
    )
  }

  // Jika tidak authorized, jangan tampilkan apa-apa (sambil nunggu redirect)
  if (!isAuthorized) return null

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      
      {/* SIDEBAR (Pastikan file AdminSidebar sudah dibuat di step sebelumnya) */}
      <AdminSidebar />

      {/* CONTENT AREA */}
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto h-screen">
        {children}
      </main>

    </div>
  )
}