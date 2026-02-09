import Link from "next/link"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Download } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function AdminResourcesList() {
  const supabase = createClient()
  const { data: resources } = await supabase.from('resources').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Kelola Resources</h1>
        <Link href="/admin/resources/create">
            <Button className="bg-blue-600"><Plus className="w-4 h-4 mr-2" /> Upload Baru</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead>Tipe</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {resources?.map((res) => (
                    <TableRow key={res.id}>
                        <TableCell className="font-medium">{res.title}</TableCell>
                        <TableCell><Badge variant="outline">{res.type}</Badge></TableCell>
                        <TableCell>
                            <a href={res.drive_link} target="_blank" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                                <Download className="w-3 h-3" /> Buka Link
                            </a>
                        </TableCell>
                        <TableCell className="text-right">
                            <Button variant="destructive" size="sm"><Trash2 className="w-4 h-4" /></Button>
                        </TableCell>
                    </TableRow>
                ))}
                {!resources?.length && <TableRow><TableCell colSpan={4} className="text-center py-8">Belum ada data.</TableCell></TableRow>}
            </TableBody>
        </Table>
      </div>
    </div>
  )
}