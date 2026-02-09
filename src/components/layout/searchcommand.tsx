"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
// FIX: LayoutDashboard ditambahkan ke import di bawah ini
import { Search, Calculator, BookOpen, PenTool, FileText, LayoutDashboard } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { searchGlobal, SearchResult } from "@/app/actions/search"

export function SearchCommand() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [loading, setLoading] = React.useState(false)

  // Shortcut Ctrl + K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Efek mengetik (Debounce)
  React.useEffect(() => {
    if (query.length < 3) {
        setResults([])
        return
    }

    const timer = setTimeout(async () => {
        setLoading(true)
        const data = await searchGlobal(query)
        setResults(data)
        setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2 text-muted-foreground bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Cari materi, tips...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
            placeholder="Ketik kata kunci (min 3 huruf)..." 
            value={query}
            onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>
            {loading ? "Sedang mencari..." : "Tidak ditemukan hasil."}
          </CommandEmpty>
          
          {/* HASIL PENCARIAN DINAMIS */}
          {results.length > 0 && (
            <CommandGroup heading="Hasil Pencarian">
                {results.map((item, index) => (
                    <CommandItem
                        key={index}
                        value={item.title + index}
                        onSelect={() => runCommand(() => router.push(item.url))}
                    >
                        {item.type === "Modul" && <BookOpen className="mr-2 h-4 w-4" />}
                        {item.type === "Blog" && <PenTool className="mr-2 h-4 w-4" />}
                        {item.type === "FAQ" && <FileText className="mr-2 h-4 w-4" />}
                        <div className="flex flex-col">
                            <span>{item.title}</span>
                            <span className="text-xs text-muted-foreground">{item.type}</span>
                        </div>
                    </CommandItem>
                ))}
            </CommandGroup>
          )}

          <CommandSeparator />

          <CommandGroup heading="Akses Cepat">
            <CommandItem onSelect={() => runCommand(() => router.push("/tools/hpp-calculator"))}>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Kalkulator HPP</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/modul"))}>
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Semua Modul</span>
            </CommandItem>
             <CommandItem onSelect={() => runCommand(() => router.push("/admin"))}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard Admin</span>
            </CommandItem>
          </CommandGroup>

        </CommandList>
      </CommandDialog>
    </>
  )
}