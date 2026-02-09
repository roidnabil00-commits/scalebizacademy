import { createClient } from "@/lib/supabase"
import { ModuleCard } from "@/components/modules/modulecard"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Karena ini Server Component, kita bisa fetch data langsung tanpa useEffect
export default async function ModulPage() {
  const supabase = createClient()
  
  // Ambil data modul dari database
  const { data: modules, error } = await supabase
    .from('modules')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching modules:", error)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/* HEADER SECTION */}
      <div className="bg-white border-b py-12 px-6 md:px-12">
        <div className="container max-w-screen-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Modul Pembelajaran</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-8">
                Tingkatkan skill bisnis Anda dengan materi terstruktur dari para ahli. 
                Semua modul dapat diakses secara <span className="font-bold text-blue-600">GRATIS</span>.
            </p>

            {/* SEARCH BAR (Visual Only for now) */}
            <div className="flex gap-2 max-w-lg">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Cari materi belajar..." className="pl-10 h-12" />
                </div>
                <Button className="h-12 px-6 bg-blue-600 hover:bg-blue-700">Cari</Button>
            </div>
        </div>
      </div>

      {/* MODULES GRID */}
      <div className="container max-w-screen-2xl px-6 md:px-12 py-12">
        
        {/* Jika data kosong/loading */}
        {!modules || modules.length === 0 ? (
           <div className="text-center py-20">
             <p className="text-lg text-muted-foreground">Belum ada modul yang tersedia saat ini.</p>
           </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {modules.map((module) => (
                <ModuleCard key={module.id} module={module} />
            ))}
            </div>
        )}
        
      </div>
    </div>
  )
}