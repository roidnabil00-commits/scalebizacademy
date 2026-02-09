"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Loader2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminModulList() {
  const [modules, setModules] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  // Fetch Data Client Side
  useEffect(() => {
    fetchModules()
  }, [])

  const fetchModules = async () => {
    const { data } = await supabase.from('modules').select('*').order('created_at', { ascending: false })
    setModules(data || [])
    setLoading(false)
  }

  // LOGIKA HAPUS
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Yakin ingin menghapus modul "${title}"?`)) return

    const { error } = await supabase.from('modules').delete().eq('id', id)
    
    if (error) {
        alert("Gagal menghapus: " + error.message)
    } else {
        // Refresh list tanpa reload page
        fetchModules()
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Kelola Modul</h1>
        <Link href="/admin/modul/create">
            <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Modul Baru
            </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Judul Modul</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                    <TableRow><TableCell colSpan={4} className="text-center py-8"><Loader2 className="animate-spin inline mr-2"/>Loading...</TableCell></TableRow>
                ) : modules.length === 0 ? (
                    <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Belum ada modul.</TableCell></TableRow>
                ) : (
                    modules.map((mod) => (
                        <TableRow key={mod.id}>
                            <TableCell className="font-medium">{mod.title}</TableCell>
                            <TableCell>{mod.category}</TableCell>
                            <TableCell>{mod.level}</TableCell>
                            <TableCell className="text-right flex justify-end gap-2">
                                <Button variant="outline" size="sm" disabled><Edit className="w-4 h-4" /></Button>
                                <Button 
                                    variant="destructive" 
                                    size="sm" 
                                    onClick={() => handleDelete(mod.id, mod.title)} // Trigger Delete
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