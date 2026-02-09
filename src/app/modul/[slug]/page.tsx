import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { ArrowLeft, Clock, BarChart, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Metadata SEO
export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const supabase = createClient()
  const { data } = await supabase.from('modules').select('title, description').eq('slug', params.slug).single()
  if (!data) return { title: "Modul Tidak Ditemukan" }
  return { title: `${data.title} - ScaleBiz Academy`, description: data.description }
}

export default async function ModulDetailPage(props: PageProps) {
  const params = await props.params;
  const supabase = createClient()

  const { data: modul } = await supabase
    .from('modules')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!modul) notFound()

  // Helper: Ambil Video ID dari URL Youtube biasa
  // Contoh: https://www.youtube.com/watch?v=ScMzIvxBSi4 -> ScMzIvxBSi4
  const getVideoId = (url: string) => {
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') return urlObj.pathname.slice(1);
        return urlObj.searchParams.get('v');
    } catch (e) {
        return null;
    }
  }

  const videoId = getVideoId(modul.youtube_url)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/* NAV BACK */}
      <div className="bg-white dark:bg-slate-900 border-b py-4 px-6 sticky top-0 z-10">
        <div className="container max-w-screen-xl">
            <Link href="/modul" className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-600">
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Materi
            </Link>
        </div>
      </div>

      <div className="container max-w-screen-xl px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KIRI: VIDEO PLAYER */}
        <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                {videoId ? (
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://www.youtube.com/embed/${videoId}?rel=0`} 
                        title={modul.title}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                ) : (
                    <div className="flex items-center justify-center h-full text-white">Video URL Error</div>
                )}
            </div>

            <div>
                <div className="flex items-center gap-3 mb-4">
                    <Badge>{modul.category}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {modul.duration} Menit
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <BarChart className="w-3 h-3" /> {modul.level}
                    </span>
                </div>
                <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{modul.title}</h1>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {modul.description}
                </p>
            </div>
        </div>

        {/* KANAN: MATERI TEXT / RINGKASAN */}
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
                    Poin Pembelajaran
                </h3>
                <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600">
                    {/* Render Text Content (bisa newline) */}
                    {modul.content ? (
                        modul.content.split('\n').map((line: string, i: number) => (
                            <p key={i} className="mb-2">{line}</p>
                        ))
                    ) : (
                        <p className="text-muted-foreground italic">Tidak ada ringkasan materi tertulis.</p>
                    )}
                </div>
                
                <div className="mt-8 pt-6 border-t">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Tandai Selesai</Button>
                </div>
            </div>
        </div>

      </div>
    </div>
  )
}