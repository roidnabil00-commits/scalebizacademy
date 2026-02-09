import { createClient } from "@/lib/supabase"
import { HomeClient } from "@/components/home/homeclient"

// Update data setiap 60 detik (ISR)
export const revalidate = 60

export default async function Home() {
  const supabase = createClient()

  // 1. AMBIL 3 MODUL TERBARU (Update: Tambah youtube_url)
  const { data: latestModules } = await supabase
    .from('modules')
    .select('title, slug, category, level, description, youtube_url') // <--- PENTING!
    .order('created_at', { ascending: false })
    .limit(3)

  // 2. AMBIL 3 BLOG TERBARU
  const { data: latestPosts } = await supabase
    .from('blog_posts')
    .select('title, slug, category, created_at, image_url')
    .order('created_at', { ascending: false })
    .limit(3)

  // 3. Render Tampilan Client
  return (
    <HomeClient 
      latestModules={latestModules || []} 
      latestPosts={latestPosts || []} 
    />
  )
}