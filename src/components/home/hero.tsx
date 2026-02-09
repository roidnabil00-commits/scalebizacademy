import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 md:pt-20 lg:pt-32 pb-16">
      {/* Background Gradient Blob */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-[#3B82F6] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-[#8B5CF6] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
        
        <div className="mb-6 inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm">
          <span className="mr-2 rounded-full bg-[#3B82F6] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
            Baru
          </span>
          Platform Edukasi No.1 untuk UMKM
        </div>

        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
          Scale Your Business to <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
            The Next Level
          </span>
        </h1>

        <p className="mb-10 text-lg text-slate-600 md:text-xl max-w-2xl mx-auto">
          Akses gratis ke modul pembelajaran, tools praktis, dan komunitas pengusaha yang siap membantu bisnis Anda tumbuh lebih cepat.
        </p>

        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link href="/modul">
            <Button size="lg" className="h-12 px-8 text-base bg-[#3B82F6] hover:bg-blue-700 text-white w-full sm:w-auto">
              Mulai Belajar Gratis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/modul">
             <Button size="lg" variant="outline" className="h-12 px-8 text-base w-full sm:w-auto">
              Lihat Semua Modul
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 border-t pt-8">
            <div>
                <div className="text-3xl font-bold text-slate-900">50+</div>
                <div className="text-sm text-slate-500">Modul Gratis</div>
            </div>
            <div>
                <div className="text-3xl font-bold text-slate-900">10k+</div>
                <div className="text-sm text-slate-500">UMKM Terdaftar</div>
            </div>
            <div>
                <div className="text-3xl font-bold text-slate-900">100+</div>
                <div className="text-sm text-slate-500">Template Bisnis</div>
            </div>
            <div>
                <div className="text-3xl font-bold text-slate-900">4.9/5</div>
                <div className="text-sm text-slate-500">Rating Komunitas</div>
            </div>
        </div>

      </div>
    </section>
  )
}