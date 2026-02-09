"use server"

import { createClient } from "@/lib/supabase"

export type SearchResult = {
  type: "Modul" | "Blog" | "FAQ"
  title: string
  url: string
  description?: string
}

export async function searchGlobal(query: string): Promise<SearchResult[]> {
  if (!query || query.length < 3) return []

  const supabase = createClient()
  const results: SearchResult[] = []

  // 1. Cari di Modul
  const { data: modules } = await supabase
    .from('modules')
    .select('title, slug, description')
    .ilike('title', `%${query}%`)
    .limit(3)

  if (modules) {
    modules.forEach(m => results.push({
        type: "Modul",
        title: m.title,
        url: `/modul/${m.slug}`,
        description: m.description
    }))
  }

  // 2. Cari di Blog
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('title, slug, excerpt')
    .ilike('title', `%${query}%`)
    .limit(3)

  if (posts) {
    posts.forEach(p => results.push({
        type: "Blog",
        title: p.title,
        url: `/blog/${p.slug}`,
        description: p.excerpt
    }))
  }

  // 3. Cari di FAQ
  const { data: faqs } = await supabase
    .from('faq')
    .select('question, answer')
    .ilike('question', `%${query}%`)
    .limit(3)

  if (faqs) {
    faqs.forEach(f => results.push({
        type: "FAQ",
        title: f.question,
        url: `/faq`,
        description: f.answer.substring(0, 50) + "..."
    }))
  }

  return results
}