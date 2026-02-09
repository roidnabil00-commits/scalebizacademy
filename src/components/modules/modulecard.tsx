import Link from "next/link"
import Image from "next/image"
import { PlayCircle, Clock, BarChart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

// Tipe data sesuai database Supabase
interface ModuleProps {
  id: string
  title: string
  slug: string
  category: string
  level: string
  duration: number
  youtube_url: string
}

// Fungsi Helper: Ambil ID Youtube untuk Thumbnail
function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export function ModuleCard({ module }: { module: ModuleProps }) {
  const videoId = getYouTubeId(module.youtube_url);
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` 
    : "/images/placeholder.jpg"; // Fallback jika link rusak

  // Warna Badge berdasarkan Level
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'pemula': return "bg-green-100 text-green-700 hover:bg-green-100";
      case 'menengah': return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
      case 'lanjutan': return "bg-red-100 text-red-700 hover:bg-red-100";
      default: return "bg-slate-100 text-slate-700";
    }
  }

  return (
    <Link href={`/modul/${module.slug}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border-slate-200">
        
        {/* THUMBNAIL AREA */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          {/* Kita pakai tag img biasa dulu biar gampang (Next Image butuh config domain) */}
          <img 
            src={thumbnailUrl} 
            alt={module.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayCircle className="w-12 h-12 text-white drop-shadow-lg" />
          </div>
          <div className="absolute top-2 right-2">
            <Badge className="bg-white/90 text-slate-900 hover:bg-white">
              {module.category}
            </Badge>
          </div>
        </div>

        {/* CONTENT AREA */}
        <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className={getLevelColor(module.level)}>
                    {module.level}
                </Badge>
            </div>
            <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                {module.title}
            </h3>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            Pelajari materi {module.category} untuk meningkatkan bisnis Anda.
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto flex items-center text-sm text-slate-500 gap-4">
            <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{module.duration} Menit</span>
            </div>
            <div className="flex items-center gap-1">
                <BarChart className="w-4 h-4" />
                <span>Terstruktur</span>
            </div>
        </CardFooter>

      </Card>
    </Link>
  )
}