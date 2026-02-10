import Link from "next/link"
import { createClient } from "@/lib/supabase"
import { PlayCircle, Clock, BarChart, ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Update cache setiap 60 detik
export const revalidate = 60

interface ModulPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ModulPage({ searchParams }: ModulPageProps) {
  const supabase = createClient()
  
  // 1. SETUP PAGINATION
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  
  // --- ATUR BATAS PER HALAMAN DISINI ---
  const itemsPerPage = 9 
  // Kalau mau ngetes tombol muncul, ubah angka 6 jadi 1 sementara.
  
  const start = (currentPage - 1) * itemsPerPage
  const end = start + itemsPerPage - 1

  // 2. FETCH DATA + COUNT
  const { data: modules, count } = await supabase
    .from('modules')
    .select('*', { count: 'exact' }) // Request total jumlah data
    .order('created_at', { ascending: false })
    .range(start, end)

  // Hitung Total Halaman
  const totalPages = Math.ceil((count || 0) / itemsPerPage)

  // DEBUGGING: Cek Terminal VS Code saat buka halaman ini
  console.log("--- DEBUG PAGINATION MODUL ---")
  console.log("Total Data (Count):", count)
  console.log("Items Per Page:", itemsPerPage)
  console.log("Total Pages:", totalPages)
  console.log("Current Page:", currentPage)
  console.log("------------------------------")

  // Helper: Thumbnail YouTube
  const getThumbnail = (url: string) => {
    try {
        if (!url) return null;
        const urlObj = new URL(url);
        let videoId = null;
        if (urlObj.hostname === 'youtu.be') {
           videoId = urlObj.pathname.slice(1);
        } else if (urlObj.hostname.includes('youtube.com')) {
           videoId = urlObj.searchParams.get('v');
        }
        return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
    } catch (e) {
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/* HEADER */}
      <div className="bg-white dark:bg-slate-900 border-b py-12 px-6">
        <div className="container max-w-screen-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Modul Pembelajaran</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
                Akses materi video eksklusif untuk meningkatkan skill bisnis Anda.
            </p>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="container max-w-screen-2xl px-6 py-12">
        
        {modules && modules.length > 0 ? (
            <>
                {/* GRID MODUL */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {modules.map((modul) => {
                        const thumb = getThumbnail(modul.youtube_url);
                        return (
                            <Link key={modul.id} href={`/modul/${modul.slug}`} className="group">
                                <Card className="h-full border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all hover:-translate-y-2 overflow-hidden flex flex-col">
                                    
                                    {/* THUMBNAIL */}
                                    <div className="relative aspect-video bg-slate-200 overflow-hidden">
                                        {thumb ? (
                                            <img 
                                                src={thumb} 
                                                alt={modul.title} 
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-violet-600">
                                                <Play className="text-white w-12 h-12 opacity-80 fill-white" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                                <Play className="w-5 h-5 text-blue-600 fill-blue-600 ml-1" />
                                            </div>
                                        </div>
                                        <Badge className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white border-0 hover:bg-black/80">
                                            {modul.level}
                                        </Badge>
                                    </div>

                                    {/* INFO */}
                                    <CardHeader className="p-5 pb-2">
                                        <div className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">
                                            {modul.category}
                                        </div>
                                        <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors text-lg leading-snug">
                                            {modul.title}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent className="p-5 pt-0 flex-grow">
                                        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                                            {modul.description}
                                        </p>
                                    </CardContent>

                                    <CardFooter className="p-5 pt-0 border-t-0">
                                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 w-full">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                <span>{modul.duration} Menit</span>
                                            </div>
                                            <div className="flex items-center gap-1 ml-auto group-hover:text-blue-600 transition-colors">
                                                Tonton Sekarang &rarr;
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Link>
                        )
                    })}
                </div>

                {/* --- TOMBOL PAGINATION (PASTI MUNCUL JIKA HALAMAN > 1) --- */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 border-t pt-8">
                        {/* Tombol PREV */}
                        <Link 
                            href={currentPage > 1 ? `/modul?page=${currentPage - 1}` : '#'} 
                            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                        >
                            <Button variant="outline" disabled={currentPage <= 1}>
                                <ChevronLeft className="w-4 h-4 mr-2" /> Sebelumnya
                            </Button>
                        </Link>

                        {/* Info Halaman */}
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Halaman {currentPage} dari {totalPages}
                        </span>

                        {/* Tombol NEXT */}
                        <Link 
                            href={currentPage < totalPages ? `/modul?page=${currentPage + 1}` : '#'} 
                            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                        >
                             <Button variant="outline" disabled={currentPage >= totalPages}>
                                Selanjutnya <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                )}
            </>
        ) : (
            // STATE KOSONG
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-800">
                <PlayCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium">Belum ada modul tersedia</h3>
                <p className="text-muted-foreground">Admin sedang menyiapkan materi terbaik untuk Anda.</p>
            </div>
        )}
      </div>
    </div>
  )
}