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

// IMPORT KOMPONEN EDITOR BARU
import RichTextEditor from "@/components/ui/rich-text-editor" 

export default function CreateBlogPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [category, setCategory] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [excerpt, setExcerpt] = useState("")
  
  // Content sekarang akan berisi HTML string (misal: "<p>Halo <b>Dunia</b></p>")
  const [content, setContent] = useState("") 

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTitle(val)
    setSlug(val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Validasi: Cek apakah konten editor kosong (atau hanya tag p kosong)
    if (!title || !slug || !content || content === '<p></p>' || !category) {
        alert("Mohon lengkapi Judul, Slug, Kategori, dan Isi Konten!")
        setLoading(false)
        return
    }

    const supabase = createClient()
    console.log("Mencoba kirim data ke Supabase...")

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        alert("Sesi habis. Silakan login ulang.")
        router.push("/login")
        return
    }

    const { data, error } = await supabase
        .from('blog_posts')
        .insert([{ 
            title, 
            slug, 
            category, 
            image_url: imageUrl, 
            excerpt, 
            content, // Ini sekarang menyimpan HTML
            author: user.user_metadata.full_name || 'Admin' 
        }])
        .select()

    if (error) {
        console.error("Error Upload:", error)
        alert(`GAGAL: ${error.message}`)
    } else {
        alert("SUKSES! Artikel berhasil diterbitkan.")
        router.push("/admin/blog")
        router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      
      {/* HEADER */}
      <div className="mb-6">
        <Link href="/admin/blog" className="text-sm text-muted-foreground hover:text-blue-600 flex items-center mb-2">
            <ArrowLeft className="w-4 h-4 mr-1" /> Kembali
        </Link>
        <h1 className="text-3xl font-bold">Tulis Artikel Baru</h1>
      </div>

      <form onSubmit={handleSubmit}>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* KIRI: EDITOR UTAMA */}
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardContent className="pt-6 space-y-6">
                        <div className="space-y-2">
                            <Label>Judul Artikel <span className="text-red-500">*</span></Label>
                            <Input 
                                className="text-lg font-medium"
                                placeholder="Judul artikel yang menarik..." 
                                value={title} 
                                onChange={handleTitleChange} 
                                required 
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label>Isi Konten <span className="text-red-500">*</span></Label>
                            
                            {/* GANTI TEXTAREA DENGAN RICH TEXT EDITOR */}
                            <RichTextEditor 
                                content={content} 
                                onChange={setContent} 
                            />
                            
                            <p className="text-xs text-muted-foreground mt-1">
                                Tekan 'CMD+B' untuk tebal, 'CMD+I' untuk miring. Blok teks untuk opsi lainnya.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* KANAN: META DATA & TOMBOL */}
            <div className="space-y-6">
                 <Card>
                    <CardHeader><CardTitle className="text-base">Pengaturan Publikasi</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Slug (URL) <span className="text-red-500">*</span></Label>
                            <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
                        </div>
                        
                        <div className="space-y-2">
                            <Label>Kategori <span className="text-red-500">*</span></Label>
                            <Select onValueChange={setCategory} required>
                                <SelectTrigger><SelectValue placeholder="Pilih Kategori" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Marketing">Marketing</SelectItem>
                                    <SelectItem value="Keuangan">Keuangan</SelectItem>
                                    <SelectItem value="Operasional">Operasional</SelectItem>
                                    <SelectItem value="Teknologi">Teknologi</SelectItem>
                                    <SelectItem value="Mindset">Mindset</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>URL Gambar Cover</Label>
                            <Input placeholder="https://..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                        </div>

                        <div className="space-y-2">
                            <Label>Ringkasan (Excerpt)</Label>
                            <Textarea 
                                className="h-32 text-sm" 
                                placeholder="Tulis ringkasan singkat untuk tampilan kartu di halaman depan..." 
                                value={excerpt} 
                                onChange={(e) => setExcerpt(e.target.value)} 
                            />
                        </div>

                        <div className="pt-4">
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold h-12 text-base" disabled={loading}>
                                {loading ? (
                                    <><Loader2 className="w-5 h-5 mr-2 animate-spin"/> Menerbitkan...</>
                                ) : (
                                    "Terbitkan Artikel Sekarang"
                                )}
                            </Button>
                        </div>

                    </CardContent>
                </Card>
            </div>

          </div>
      </form>

    </div>
  )
}