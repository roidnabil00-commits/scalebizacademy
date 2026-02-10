import Link from "next/link"
import { createClient } from "@/lib/supabase"
import { Search, Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export const metadata = {
  title: "Blog & Artikel Bisnis - ScaleBiz Academy",
  description: "Tips, trik, dan wawasan terbaru seputar dunia bisnis UMKM.",
}

export const revalidate = 60

// Interface untuk menangkap parameter URL (?page=2)
interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const supabase = createClient()
  
  // 1. KONFIGURASI PAGINATION
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const itemsPerPage = 6 // Menampilkan 6 artikel per halaman
  
  // Hitung Range untuk Supabase (0-5, 6-11, dst)
  const start = (currentPage - 1) * itemsPerPage
  const end = start + itemsPerPage - 1

  // 2. FETCH DATA DENGAN RANGE
  const { data: blogPosts, count } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact' }) // Minta total jumlah data
    .order('created_at', { ascending: false })
    .range(start, end) // Ambil hanya sebagian data

  // Hitung Total Halaman
  const totalPages = Math.ceil((count || 0) / itemsPerPage)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/* HEADER SECTION */}
      <div className="bg-white dark:bg-slate-900 border-b py-12 px-6 md:px-12">
        <div className="container max-w-screen-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog & Wawasan Bisnis</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-8">
                Kumpulan artikel praktis untuk membantu Anda mengambil keputusan bisnis yang lebih cerdas.
            </p>

            <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Cari topik..." className="pl-10 h-12" />
                </div>
                <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700">Cari</Button>
            </div>
        </div>
      </div>

      {/* BLOG GRID */}
      <div className="container max-w-screen-2xl px-6 md:px-12 py-12">
        
        {blogPosts && blogPosts.length > 0 ? (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {blogPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                            <Card className="h-full overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="relative aspect-[16/9] overflow-hidden bg-slate-200">
                                    {post.image_url ? (
                                        <img 
                                            src={post.image_url} 
                                            alt={post.title} 
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-slate-400">No Image</div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-white/90 text-slate-900 hover:bg-white backdrop-blur-sm">
                                            {post.category}
                                        </Badge>
                                    </div>
                                </div>

                                <CardHeader className="space-y-2 pb-2">
                                    <h2 className="text-xl font-bold leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            <span>{new Date(post.created_at).toLocaleDateString("id-ID")}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            <span>{post.author}</span>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                </CardContent>

                                <CardFooter className="pt-0">
                                    <div className="text-blue-600 text-sm font-semibold flex items-center group-hover:underline">
                                        Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* --- BAGIAN TOMBOL PAGINATION --- */}
                <div className="flex justify-center items-center gap-4">
                    {/* Tombol Previous */}
                    <Link href={`/blog?page=${currentPage - 1}`} className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}>
                        <Button variant="outline" disabled={currentPage <= 1}>
                            <ChevronLeft className="w-4 h-4 mr-2" /> Sebelumnya
                        </Button>
                    </Link>

                    <span className="text-sm font-medium text-slate-600">
                        Halaman {currentPage} dari {totalPages}
                    </span>

                    {/* Tombol Next */}
                    <Link href={`/blog?page=${currentPage + 1}`} className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}>
                         <Button variant="outline" disabled={currentPage >= totalPages}>
                            Selanjutnya <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </>
        ) : (
            <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">Belum ada artikel yang diterbitkan.</p>
            </div>
        )}

      </div>
    </div>
  )
}