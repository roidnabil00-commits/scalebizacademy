import Link from "next/link"
import { createClient } from "@/lib/supabase"
import { FileText, Download, FileSpreadsheet, File, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const revalidate = 60

interface ResourcesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ResourcesPage({ searchParams }: ResourcesPageProps) {
  const supabase = createClient()
  
  // 1. SETUP PAGINATION
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const itemsPerPage = 9 // Tampilkan 9 file per halaman (3 baris x 3 kolom)
  
  const start = (currentPage - 1) * itemsPerPage
  const end = start + itemsPerPage - 1

  // 2. FETCH DATA
  const { data: resources, count } = await supabase
    .from('resources')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(start, end)

  const totalPages = Math.ceil((count || 0) / itemsPerPage)

  // Helper Icon
  const getIcon = (type: string) => {
    if (type === 'Template') return <FileSpreadsheet className="w-8 h-8 text-green-600" />
    if (type === 'Ebook') return <FileText className="w-8 h-8 text-orange-600" />
    return <File className="w-8 h-8 text-blue-600" />
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/* HEADER */}
      <div className="bg-white dark:bg-slate-900 border-b py-12 px-6">
        <div className="container max-w-screen-xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Resources & Tools</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Download template, ebook, dan alat bantu kerja siap pakai untuk mempercepat bisnis Anda.
            </p>
            
            <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Cari file..." className="pl-10 h-12" />
            </div>
        </div>
      </div>

      {/* RESOURCES GRID */}
      <div className="container max-w-screen-xl px-6 py-12">
        
        {resources && resources.length > 0 ? (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {resources.map((res) => (
                        <Card key={res.id} className="hover:shadow-md transition-shadow border-slate-200 dark:border-slate-800 flex flex-col h-full">
                            <CardHeader className="flex flex-row gap-4 items-start space-y-0 pb-2">
                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
                                    {getIcon(res.type)}
                                </div>
                                <div className="min-w-0"> {/* min-w-0 fix text overflow */}
                                    <Badge variant="outline" className="mb-2">{res.type}</Badge>
                                    <CardTitle className="text-lg leading-tight truncate">{res.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription className="line-clamp-2 mt-2">
                                    {res.description}
                                </CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 font-semibold" size="sm">
                                    <a href={res.drive_link} target="_blank" rel="noopener noreferrer">
                                        <Download className="w-4 h-4 mr-2" /> Download
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* --- PAGINATION CONTROLS --- */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <Link href={currentPage > 1 ? `/resources?page=${currentPage - 1}` : '#'} className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}>
                            <Button variant="outline" disabled={currentPage <= 1}>
                                <ChevronLeft className="w-4 h-4 mr-2" /> Sebelumnya
                            </Button>
                        </Link>

                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Halaman {currentPage} dari {totalPages}
                        </span>

                        <Link href={currentPage < totalPages ? `/resources?page=${currentPage + 1}` : '#'} className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}>
                             <Button variant="outline" disabled={currentPage >= totalPages}>
                                Selanjutnya <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                )}
            </>
        ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-800">
                <File className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium">Belum ada resources</h3>
                <p className="text-muted-foreground">Admin belum mengupload file apapun.</p>
            </div>
        )}

      </div>
    </div>
  )
}