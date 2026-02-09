import Link from "next/link"
import { notFound } from "next/navigation" // Untuk handle 404
import { createClient } from "@/lib/supabase"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Props type untuk Next.js 15+ (Params sekarang Promise)
interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate Metadata Dinamis untuk SEO
export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const supabase = createClient()
  const { data: post } = await supabase.from('blog_posts').select('title, excerpt').eq('slug', params.slug).single()
  
  if (!post) return { title: "Artikel Tidak Ditemukan" }
  
  return {
    title: `${post.title} - ScaleBiz Academy`,
    description: post.excerpt,
  }
}

export default async function BlogDetailPage(props: PageProps) {
  const params = await props.params;
  const supabase = createClient()

  // AMBIL DATA BERDASARKAN SLUG
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  // Jika tidak ketemu, tampilkan halaman 404
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20">
      
      {/* NAV BACK */}
      <div className="border-b sticky top-16 md:top-20 bg-white/95 dark:bg-slate-950/95 backdrop-blur z-20">
        <div className="container max-w-screen-lg py-4 px-6 md:px-12">
            <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Blog
            </Link>
        </div>
      </div>

      <article className="container max-w-screen-lg px-6 md:px-12 py-12">
        
        {/* HEADER ARTIKEL */}
        <div className="space-y-6 text-center mb-12">
            <Badge variant="secondary" className="px-4 py-1 text-base">{post.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.created_at).toLocaleDateString("id-ID", { dateStyle: 'long' })}</span>
                </div>
            </div>
        </div>

        {/* FEATURED IMAGE */}
        {post.image_url && (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 mb-12 shadow-lg">
                <img 
                    src={post.image_url} 
                    alt={post.title} 
                    className="object-cover w-full h-full"
                />
            </div>
        )}

        {/* CONTENT BODY */}
        <div className="prose prose-lg prose-blue dark:prose-invert mx-auto">
            {/* Render teks biasa dengan paragraph break sederhana */}
            {/* Note: Jika nanti mau pakai Rich Text Editor, disini pakai dangerouslySetInnerHTML */}
            {post.content.split('\n').map((paragraph: string, idx: number) => (
                <p key={idx}>{paragraph}</p>
            ))}
        </div>

        {/* AUTHOR BOX */}
        <div className="mt-16 bg-slate-50 dark:bg-slate-900 p-8 rounded-xl border flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shrink-0">
                SB
            </div>
            <div>
                <h4 className="font-bold text-lg">Tim Redaksi ScaleBiz</h4>
                <p className="text-muted-foreground">
                    Kami berdedikasi untuk menyajikan konten edukatif terbaik bagi UMKM Indonesia agar bisa naik kelas.
                </p>
            </div>
        </div>

      </article>

    </div>
  )
}