"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit, Loader2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function AdminBlogList() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Hapus artikel "${title}"?`)) return
    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (!error) fetchPosts()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Kelola Blog</h1>
        <Link href="/admin/blog/create">
            <Button className="bg-blue-600"><Plus className="w-4 h-4 mr-2" /> Tulis Artikel</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Judul Artikel</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                 {loading ? (
                    <TableRow><TableCell colSpan={4} className="text-center py-8"><Loader2 className="animate-spin inline mr-2"/>Loading...</TableCell></TableRow>
                ) : posts.length === 0 ? (
                    <TableRow><TableCell colSpan={4} className="text-center py-8">Belum ada artikel.</TableCell></TableRow>
                ) : (
                    posts.map((post) => (
                        <TableRow key={post.id}>
                            <TableCell className="font-medium max-w-md truncate">{post.title}</TableCell>
                            <TableCell><Badge variant="secondary">{post.category}</Badge></TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                                {new Date(post.created_at).toLocaleDateString('id-ID')}
                            </TableCell>
                            <TableCell className="text-right flex justify-end gap-2">
                                 <Button variant="outline" size="sm" disabled><Edit className="w-4 h-4" /></Button>
                                <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => handleDelete(post.id, post.title)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
      </div>
    </div>
  )
}