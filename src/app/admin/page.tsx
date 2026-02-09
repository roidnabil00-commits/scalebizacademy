"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Download, PenTool, Loader2 } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    modules: 0,
    resources: 0,
    blogs: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient()

      // Hitung Users
      const { count: usersCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })

      // Hitung Modul
      const { count: modulesCount } = await supabase
        .from('modules')
        .select('*', { count: 'exact', head: true })

      // Hitung Resources
      const { count: resourcesCount } = await supabase
        .from('resources')
        .select('*', { count: 'exact', head: true })

      // Hitung Blog
      const { count: blogsCount } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true })

      setStats({
        users: usersCount || 0,
        modules: modulesCount || 0,
        resources: resourcesCount || 0,
        blogs: blogsCount || 0
      })
      setLoading(false)
    }

    fetchStats()
  }, [])

  if (loading) {
      return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin w-8 h-8 text-blue-600"/></div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* USERS */}
        <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.users}</div>
                <p className="text-xs text-muted-foreground">Member terdaftar</p>
            </CardContent>
        </Card>

        {/* MODUL */}
        <Card className="border-l-4 border-l-violet-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Modul</CardTitle>
                <BookOpen className="w-4 h-4 text-violet-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.modules}</div>
                <p className="text-xs text-muted-foreground">Video pembelajaran</p>
            </CardContent>
        </Card>
        
        {/* RESOURCES */}
        <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Resources</CardTitle>
                <Download className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.resources}</div>
                <p className="text-xs text-muted-foreground">File siap download</p>
            </CardContent>
        </Card>

        {/* BLOG */}
        <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Artikel Blog</CardTitle>
                <PenTool className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.blogs}</div>
                <p className="text-xs text-muted-foreground">Postingan terbit</p>
            </CardContent>
        </Card>

      </div>
      
      <div className="mt-8 p-6 bg-blue-50 dark:bg-slate-900 rounded-lg border border-blue-100 dark:border-slate-800">
        <h3 className="font-semibold text-lg mb-2">👋 Halo, Admin!</h3>
        <p className="text-slate-600 dark:text-slate-300">
            Semua sistem berjalan normal. Jangan lupa cek kolom <b>FAQ</b> untuk menjawab pertanyaan user baru.
        </p>
      </div>

    </div>
  )
}