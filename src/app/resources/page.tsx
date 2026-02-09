import { createClient } from "@/lib/supabase"
import { Search, FileText, Download, BookOpen, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Resources Gratis - ScaleBiz Academy",
  description: "Download template bisnis, ebook, dan checklist gratis untuk UMKM.",
}

// Helper Icon berdasarkan tipe
const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case 'ebook': return <BookOpen className="w-10 h-10 text-violet-500" />;
        case 'template': return <FileSpreadsheet className="w-10 h-10 text-green-500" />;
        default: return <FileText className="w-10 h-10 text-blue-500" />;
    }
}

export default async function ResourcesPage() {
  const supabase = createClient()
  
  // Ambil data resources (jika tabel kosong, akan tampil array kosong)
  const { data: resources } = await supabase
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/* HEADER */}
      <div className="bg-white border-b py-12 px-6 md:px-12">
        <div className="container max-w-screen-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Resources Center</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-8">
                Kumpulan dokumen siap pakai, ebook panduan, dan template kerja untuk mempercepat pertumbuhan bisnis Anda.
            </p>

            {/* SEARCH */}
            <div className="flex gap-2 max-w-lg">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Cari template atau ebook..." className="pl-10 h-12" />
                </div>
                <Button className="h-12 px-6 bg-blue-600 hover:bg-blue-700">Cari</Button>
            </div>
        </div>
      </div>

      {/* LIST RESOURCES */}
      <div className="container max-w-screen-2xl px-6 md:px-12 py-12">
        
        {!resources || resources.length === 0 ? (
            // TAMPILAN JIKA KOSONG (FALLBACK DUMMY DATA AGAR TIDAK BLANK SAAT DEV)
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {/* DUMMY CARD 1 */}
                 <Card className="hover:shadow-lg transition-all border-slate-200">
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                        <div className="p-3 bg-slate-50 rounded-xl border">{getIcon('template')}</div>
                        <Badge variant="outline">Template</Badge>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <CardTitle className="text-lg mb-2 line-clamp-2">Template Laporan Keuangan Bulanan</CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                            Excel sheet otomatis untuk mencatat arus kas masuk dan keluar. Cocok untuk UMKM F&B dan Retail.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full group">
                            <Download className="w-4 h-4 mr-2 group-hover:text-blue-600" />
                            Download Gratis
                        </Button>
                    </CardFooter>
                 </Card>

                 {/* DUMMY CARD 2 */}
                 <Card className="hover:shadow-lg transition-all border-slate-200">
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                        <div className="p-3 bg-slate-50 rounded-xl border">{getIcon('ebook')}</div>
                        <Badge variant="outline">Ebook</Badge>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <CardTitle className="text-lg mb-2 line-clamp-2">Panduan Digital Marketing 2026</CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                            Buku saku strategi pemasaran di TikTok dan Instagram khusus untuk brand lokal baru.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full group">
                            <Download className="w-4 h-4 mr-2 group-hover:text-blue-600" />
                            Download Gratis
                        </Button>
                    </CardFooter>
                 </Card>
            </div>
        ) : (
            // TAMPILAN JIKA ADA DATA DI SUPABASE
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {resources.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-all border-slate-200">
                        <CardHeader className="flex flex-row items-start justify-between pb-2">
                            <div className="p-3 bg-slate-50 rounded-xl border">{getIcon(item.type)}</div>
                            <Badge variant="outline">{item.type}</Badge>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <CardTitle className="text-lg mb-2 line-clamp-2">{item.title}</CardTitle>
                            <p className="text-sm text-muted-foreground line-clamp-3">
                                {item.description}
                            </p>
                        </CardContent>
                        <CardFooter>
                             <a href={item.drive_link} target="_blank" rel="noopener noreferrer" className="w-full">
                                <Button variant="outline" className="w-full group">
                                    <Download className="w-4 h-4 mr-2 group-hover:text-blue-600" />
                                    Download
                                </Button>
                            </a>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        )}

      </div>
    </div>
  )
}