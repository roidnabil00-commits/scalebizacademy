"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Save, Loader2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // Form State
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [category, setCategory] = useState("Umum")
  const [submitting, setSubmitting] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchFaqs()
  }, [])

  const fetchFaqs = async () => {
    const { data } = await supabase.from('faq').select('*').order('created_at', { ascending: false })
    setFaqs(data || [])
    setLoading(false)
  }

  const handleAddFaq = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const { error } = await supabase
        .from('faq')
        .insert([{ question, answer, category }])

    if (error) {
        alert("Gagal: " + error.message)
    } else {
        alert("FAQ Berhasil Ditambahkan!")
        setQuestion("")
        setAnswer("")
        fetchFaqs() // Refresh list
    }
    setSubmitting(false)
  }

  const handleDelete = async (id: string) => {
    if(!confirm("Yakin hapus?")) return;
    
    const { error } = await supabase.from('faq').delete().eq('id', id)
    if (!error) fetchFaqs()
  }

  return (
    <div className="space-y-8">
        <h1 className="text-3xl font-bold">Kelola FAQ (Tanya Jawab)</h1>

        {/* FORM INPUT */}
        <Card>
            <CardHeader><CardTitle>Tambah Pertanyaan Baru</CardTitle></CardHeader>
            <CardContent>
                <form onSubmit={handleAddFaq} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-3 space-y-2">
                            <Label>Pertanyaan</Label>
                            <Input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Contoh: Bagaimana cara ganti password?" required />
                        </div>
                        <div className="space-y-2">
                            <Label>Kategori</Label>
                            <Input value={category} onChange={e => setCategory(e.target.value)} placeholder="Umum" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Jawaban</Label>
                        <Textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Jelaskan jawabannya disini..." required />
                    </div>
                    <Button type="submit" className="bg-blue-600" disabled={submitting}>
                        {submitting ? <Loader2 className="animate-spin"/> : <><Plus className="w-4 h-4 mr-2"/> Tambah FAQ</>}
                    </Button>
                </form>
            </CardContent>
        </Card>

        {/* LIST FAQ */}
        <div className="bg-white rounded-lg border shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Pertanyaan</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {faqs.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <p className="font-medium">{item.question}</p>
                                <p className="text-xs text-muted-foreground truncate max-w-md">{item.answer}</p>
                            </TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                                    <Trash2 className="w-4 h-4"/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {faqs.length === 0 && !loading && (
                        <TableRow><TableCell colSpan={3} className="text-center py-8">Belum ada data FAQ.</TableCell></TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    </div>
  )
}