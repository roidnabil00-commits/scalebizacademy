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

export default function CreateModulePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Form States
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState("")
  const [duration, setDuration] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("") // Ini nanti bisa jadi Rich Text Editor

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTitle(val)
    setSlug(val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()

    console.log("Sedang mengirim data...")

    const { error } = await supabase
        .from('modules')
        .insert([{
            title,
            slug,
            category,
            level,
            duration: Number(duration),
            youtube_url: youtubeUrl,
            description,
            content
        }])
        .select()

    if (error) {
        console.error("Error Upload:", error) // Cek console merah
        alert("GAGAL UPLOAD: " + error.message + "\n(Cek detail di Console F12)")
        setLoading(false)
    } else {
        alert("BERHASIL! Modul sudah masuk database.")
        router.push("/admin/modul") 
        router.refresh()
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/modul" className="text-sm text-muted-foreground hover:text-blue-600 flex items-center mb-2">
            <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke List Modul
        </Link>
        <h1 className="text-3xl font-bold">Tambah Modul Baru</h1>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Detail Modul</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Judul Modul</Label>
                        <Input placeholder="Contoh: Digital Marketing 101" value={title} onChange={handleTitleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label>Slug (URL Otomatis)</Label>
                        <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label>Kategori</Label>
                        <Select onValueChange={setCategory} required>
                            <SelectTrigger><SelectValue placeholder="Pilih Kategori" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Marketing">Marketing</SelectItem>
                                <SelectItem value="Keuangan">Keuangan</SelectItem>
                                <SelectItem value="Operasional">Operasional</SelectItem>
                                <SelectItem value="Mindset">Mindset</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Level</Label>
                        <Select onValueChange={setLevel} required>
                            <SelectTrigger><SelectValue placeholder="Pilih Level" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Pemula">Pemula</SelectItem>
                                <SelectItem value="Menengah">Menengah</SelectItem>
                                <SelectItem value="Lanjutan">Lanjutan</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Durasi (Menit)</Label>
                        <Input type="number" placeholder="15" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Link YouTube</Label>
                    <Input placeholder="https://youtube.com/watch?v=..." value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} required />
                </div>

                <div className="space-y-2">
                    <Label>Deskripsi Singkat</Label>
                    <Textarea placeholder="Penjelasan singkat tentang modul ini..." value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                <div className="space-y-2">
                    <Label>Isi Materi (Ringkasan/Poin)</Label>
                    <Textarea className="min-h-[200px]" placeholder="Tulis poin-poin pembelajaran disini..." value={content} onChange={(e) => setContent(e.target.value)} />
                    <p className="text-xs text-muted-foreground">Tips: Gunakan enter untuk paragraf baru.</p>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                    {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Menyimpan...</> : "Simpan & Upload Modul"}
                </Button>

            </form>
        </CardContent>
      </Card>
    </div>
  )
}