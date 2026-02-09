"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateResourcePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [title, setTitle] = useState("")
  const [type, setType] = useState("")
  const [driveLink, setDriveLink] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()

    const { error } = await supabase
        .from('resources')
        .insert([{ title, type, drive_link: driveLink, description }])

    if (error) {
        alert("Error: " + error.message)
        setLoading(false)
    } else {
        alert("Resource berhasil diupload!")
        router.push("/admin/resources")
        router.refresh()
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/resources" className="text-sm text-muted-foreground hover:text-blue-600 flex items-center mb-2">
            <ArrowLeft className="w-4 h-4 mr-1" /> Kembali
        </Link>
        <h1 className="text-3xl font-bold">Upload Resource Baru</h1>
      </div>

      <Card>
        <CardHeader><CardTitle>Detail File</CardTitle></CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label>Nama File / Ebook</Label>
                    <Input placeholder="Contoh: Template Laporan Keuangan" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Tipe</Label>
                        <Select onValueChange={setType} required>
                            <SelectTrigger><SelectValue placeholder="Pilih Tipe" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Template">Template (Excel/Doc)</SelectItem>
                                <SelectItem value="Ebook">Ebook (PDF)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Link Download (G-Drive)</Label>
                        <Input placeholder="https://drive.google.com/..." value={driveLink} onChange={(e) => setDriveLink(e.target.value)} required />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Deskripsi</Label>
                    <Textarea placeholder="Jelaskan kegunaan file ini..." value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                <Button type="submit" className="w-full bg-blue-600" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin"/> : "Upload Resource"}
                </Button>
            </form>
        </CardContent>
      </Card>
    </div>
  )
}