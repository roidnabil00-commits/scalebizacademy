"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Play, Calculator, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const SLIDES = [
  {
    id: 1,
    image: "https://cdn.setneg.go.id/_multimedia/photo/20260123/0315WhatsApp_Image_2026-01-23_at_5.47.27_AM.jpeg",
    title: "Bangun Bisnis Impian Anda",
    desc: "Akses ribuan materi, modul video, dan tools eksklusif untuk membantu UMKM Indonesia naik kelas."
  },
  {
    id: 2,
    image: "https://i.imgur.com/WaCcDTe.jpeg",
    title: "Strategi Digital Marketing",
    desc: "Pelajari cara menjangkau jutaan pelanggan potensial dengan strategi yang terukur dan tepat sasaran."
  },
  {
    id: 3,
    image: "xander.png", // Pastikan file ini ada di public folder atau ganti URL valid
    title: "Manajemen Keuangan Modern",
    desc: "Kelola arus kas, hitung HPP, dan profitabilitas bisnis Anda dengan tools otomatis kami."
  }
]

interface HomeClientProps {
  latestModules: any[]
  latestPosts: any[]
}

export function HomeClient({ latestModules, latestPosts }: HomeClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* --- HERO SLIDER SECTION --- */}
      {/* Mobile: h-[85dvh] biar full tapi masih ngintip konten bawah dikit. Desktop: h-[650px] */}
      <section className="relative w-full h-[85dvh] md:h-[650px] overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${SLIDES[currentSlide].image})` }}
            />
            {/* GRADIENT OVERLAY: Profesional Look */}
            {/* Dari bawah gelap pekat, ke tengah semi-transparan, ke atas bening */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10" />
            {/* Tambahan overlay tipis rata biar teks putih selalu aman */}
            <div className="absolute inset-0 bg-black/20 z-10" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 container h-full flex flex-col justify-end pb-20 md:justify-center md:pb-0 px-6 md:px-12 max-w-screen-xl mx-auto">
            <motion.div
                key={currentSlide + "-text"}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="max-w-3xl space-y-4 md:space-y-6 text-center md:text-left"
            >
                <div className="flex justify-center md:justify-start">
                    <Badge className="bg-blue-600/90 backdrop-blur text-white border-0 px-3 py-1 text-[10px] md:text-sm uppercase tracking-wider mb-2 rounded-full shadow-lg shadow-blue-900/30">
                        New Era of Learning
                    </Badge>
                </div>
                
                {/* Font Size Mobile disesuaikan biar gak 'jebol' tapi tetap megah */}
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-lg">
                    {SLIDES[currentSlide].title}
                </h1>
                
                <p className="text-sm sm:text-base md:text-xl text-slate-200/90 max-w-2xl drop-shadow-md font-medium mx-auto md:mx-0 leading-relaxed">
                    {SLIDES[currentSlide].desc}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6 justify-center md:justify-start w-full md:w-auto">
                    <Link href="/register" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-8 text-sm md:text-base shadow-xl shadow-blue-900/20 border border-transparent rounded-full md:rounded-md">
                            Mulai Sekarang
                        </Button>
                    </Link>
                    <Link href="/modul" className="w-full sm:w-auto">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white border-white/40 hover:bg-white hover:text-slate-900 font-bold h-12 px-8 text-sm md:text-base transition-all rounded-full md:rounded-md">
                            Jelajahi Materi
                        </Button>
                    </Link>
                </div>
            </motion.div>
            
            {/* Indikator Slide */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
                {SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${
                            index === currentSlide ? "bg-blue-500 w-6" : "bg-white/30 w-1.5 hover:bg-white"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
      </section>

      {/* --- FITUR UNGGULAN (Floating Cards) --- */}
      <section className="w-full py-12 md:py-16 relative z-30 -mt-12 md:-mt-20 px-4 md:px-0">
        <div className="container px-0 md:px-6 max-w-screen-xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid gap-4 md:gap-6 md:grid-cols-3"
            >
                {[
                    { icon: Play, color: "text-blue-600", bg: "bg-blue-50", title: "Video Pembelajaran", desc: "Materi video HD yang mudah dipahami." },
                    { icon: Calculator, color: "text-violet-600", bg: "bg-violet-50", title: "Tools & Kalkulator", desc: "Hitung HPP & margin secara otomatis." },
                    { icon: TrendingUp, color: "text-green-600", bg: "bg-green-50", title: "Studi Kasus Nyata", desc: "Belajar dari keberhasilan bisnis lain." }
                ].map((item, idx) => (
                    <Card key={idx} className="border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none bg-white dark:bg-slate-900 rounded-xl md:rounded-lg">
                        <CardContent className="pt-6 pb-6 flex flex-row md:flex-col items-center text-left md:text-center gap-4 md:gap-4">
                            {/* Icon di kiri untuk mobile biar rapi */}
                            <div className={`p-3 md:p-4 rounded-xl shrink-0 ${item.bg} ${item.color} dark:bg-slate-800`}>
                                <item.icon className="w-6 h-6 md:w-8 md:h-8 fill-current" />
                            </div>
                            <div>
                                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                                <p className="text-xs md:text-sm text-muted-foreground mt-1 leading-snug">{item.desc}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </motion.div>
        </div>
      </section>

      {/* --- MODUL TERBARU --- */}
      <section className="w-full py-8 md:py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 md:px-6 max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-10 gap-2">
             <div className="text-left">
                <h2 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Modul Pilihan</h2>
                <p className="text-muted-foreground mt-1 text-sm md:text-base">Upgrade skill bisnis Anda minggu ini.</p>
             </div>
             <Link href="/modul" className="hidden md:flex items-center text-blue-600 font-semibold hover:underline text-sm">
                Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
             </Link>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
             {latestModules && latestModules.length > 0 ? (
                latestModules.map((modul, i) => {
                    const thumb = getThumbnail(modul.youtube_url);
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Link href={`/modul/${modul.slug}`}>
                                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-2 border-slate-200 dark:border-slate-800 cursor-pointer overflow-hidden group flex flex-col rounded-xl">
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
                                        {/* FIX ICON PLAY STYLE */}
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                                <Play className="w-5 h-5 md:w-6 md:h-6 text-blue-600 fill-blue-600 ml-1" />
                                            </div>
                                        </div>
                                        <Badge className="absolute top-3 right-3 bg-slate-900/70 backdrop-blur text-white border-0 hover:bg-slate-900 text-[10px] md:text-xs">
                                            {modul.level}
                                        </Badge>
                                    </div>

                                    <CardHeader className="p-4 pb-2">
                                        <div className="text-[10px] md:text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">
                                            {modul.category}
                                        </div>
                                        <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors text-base md:text-lg leading-snug">
                                            {modul.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0 flex-grow">
                                        <p className="text-muted-foreground text-xs md:text-sm line-clamp-2 mt-2">
                                            {modul.description}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0 border-t-0">
                                        <div className="text-xs md:text-sm font-medium text-slate-500 group-hover:text-blue-600 transition-colors flex items-center">
                                            Tonton Sekarang <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1"/>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Link>
                        </motion.div>
                    )
                })
             ) : (
                <div className="col-span-3 text-center py-10 text-muted-foreground">Belum ada modul.</div>
             )}
          </div>

          <div className="mt-6 md:mt-8 text-center md:hidden">
            <Link href="/modul">
                <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 font-medium rounded-full h-11">
                    Lihat Semua Modul
                </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- BLOG TERBARU --- */}
      <section className="w-full py-12 md:py-16 bg-white dark:bg-slate-950 border-t">
        <div className="container px-4 md:px-6 max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-10 gap-2">
             <div className="text-left">
                <h2 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Wawasan Bisnis</h2>
                <p className="text-muted-foreground mt-1 text-sm md:text-base">Bacaan ringan penuh daging.</p>
             </div>
             <Link href="/blog" className="hidden md:flex items-center text-blue-600 font-semibold hover:underline text-sm">
                Baca Artikel <ArrowRight className="ml-2 h-4 w-4" />
             </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
             {latestPosts && latestPosts.length > 0 ? (
                latestPosts.map((post, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <Link href={`/blog/${post.slug}`} className="group block h-full">
                            <div className="relative overflow-hidden rounded-xl aspect-[16/10] mb-3 md:mb-4 bg-slate-100 shadow-sm border border-slate-100 dark:border-slate-800">
                                {post.image_url && (
                                    <img 
                                        src={post.image_url} 
                                        alt={post.title} 
                                        className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}
                                <div className="absolute top-3 left-3 z-20">
                                    <Badge className="bg-white/95 text-slate-900 backdrop-blur-md hover:bg-white shadow-sm font-semibold text-[10px] md:text-xs">
                                        {post.category}
                                    </Badge>
                                </div>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                            <div className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                                <span>{new Date(post.created_at).toLocaleDateString("id-ID", { dateStyle: 'long' })}</span>
                            </div>
                        </Link>
                    </motion.div>
                ))
             ) : (
                <div className="col-span-3 text-center py-10 text-muted-foreground">Belum ada artikel.</div>
             )}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/blog">
                <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 font-medium rounded-full h-11">
                    Baca Semua Artikel
                </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* --- CTA BOTTOM --- */}
      <section className="w-full py-16 md:py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600/20 blur-3xl rounded-full pointer-events-none" />
        
        <div className="container px-4 md:px-6 max-w-screen-xl mx-auto text-center relative z-10">
             <h2 className="text-2xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6 leading-tight">Siap Mengubah <br className="md:hidden"/> Bisnis Anda?</h2>
             <p className="text-slate-300 max-w-2xl mx-auto mb-8 md:mb-10 text-sm md:text-xl leading-relaxed px-4">
                Ribuan pebisnis telah membuktikan metodenya. Sekarang giliran Anda untuk bergabung.
             </p>
             <Link href="/register">
                <Button size="lg" className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 md:h-14 px-10 text-base md:text-lg shadow-xl shadow-blue-900/20 hover:shadow-blue-900/40 transition-all hover:-translate-y-1 rounded-full md:rounded-md">
                    Gabung Gratis Sekarang
                </Button>
             </Link>
        </div>
      </section>

    </div>
  )
}