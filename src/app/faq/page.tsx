import { createClient } from "@/lib/supabase"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export const revalidate = 60 // Update data tiap 60 detik

export default async function FAQPage() {
  const supabase = createClient()
  
  // Ambil data FAQ dari database
  const { data: faqs } = await supabase
    .from('faq')
    .select('*')
    .order('created_at', { ascending: true })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/* HEADER */}
      <div className="bg-white dark:bg-slate-900 border-b py-12 px-6 text-center">
        <div className="container max-w-screen-md">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Pertanyaan Umum</h1>
            <p className="text-muted-foreground text-lg mb-8">
                Cari jawaban cepat seputar penggunaan platform dan materi bisnis.
            </p>
            
            {/* SEARCH VISUAL (Fungsionalitas search filter bisa via client side nanti, ini visual dulu) */}
            <div className="relative max-w-sm mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Cari pertanyaan..." className="pl-10" />
            </div>
        </div>
      </div>

      {/* FAQ LIST */}
      <div className="container max-w-screen-md px-6 py-12">
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl border shadow-sm">
            
            {faqs && faqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((item) => (
                        <AccordionItem key={item.id} value={item.id}>
                            <AccordionTrigger className="text-left font-medium text-slate-900 dark:text-slate-100">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : (
                <div className="text-center py-10 text-muted-foreground">
                    Belum ada pertanyaan yang ditambahkan.
                </div>
            )}

        </div>
      </div>
    </div>
  )
}