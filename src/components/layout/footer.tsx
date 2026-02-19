import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-slate-50 dark:bg-slate-950">
      <div className="container px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          
          {/* BRANDING */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold tracking-tight flex gap-1">
                <span className="text-blue-600 dark:text-blue-400">ScaleBiz</span> 
                <span className="text-violet-600 dark:text-violet-400">Academy</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              Platform edukasi bisnis terpercaya untuk membantu UMKM Indonesia naik kelas melalui pembelajaran terstruktur dan komunitas supportif.
            </p>
            <div className="flex space-x-4">
              {/* Atribut target="_blank" ditambahkan agar link terbuka di tab baru */}
              <Link href="https://www.instagram.com/scalebiz_academy/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://www.youtube.com/@ValifyVibeBelajarDari" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-600">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-blue-600">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
               <Link href="https://www.instagram.com/scalebiz_academy/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>

          {/* COLUMN 1: BELAJAR */}
          <div>
            <h3 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Belajar</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/modul?level=pemula" className="hover:text-blue-600">Modul Pemula</Link></li>
              <li><Link href="/modul?level=menengah" className="hover:text-blue-600">Modul Menengah</Link></li>
              <li><Link href="/modul?level=lanjutan" className="hover:text-blue-600">Modul Advanced</Link></li>
              <li><Link href="/modul" className="hover:text-blue-600">Learning Path</Link></li>
            </ul>
          </div>

          {/* COLUMN 2: TOOLS */}
          <div>
            <h3 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Tools</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/tools/kalkulator-hpp" className="hover:text-blue-600">Kalkulator HPP</Link></li>
              <li><Link href="/resources" className="hover:text-blue-600">Template Bisnis</Link></li>
              <li><Link href="/resources" className="hover:text-blue-600">Ebook Gratis</Link></li>
              <li><Link href="/tools" className="hover:text-blue-600">Cek Kesehatan Bisnis</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: PERUSAHAAN */}
          <div>
            <h3 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Perusahaan</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {/* Tautan internal ini sudah terhubung dengan halaman yang baru dibuat */}
              <li><Link href="/tentang" className="hover:text-blue-600">Tentang Kami</Link></li>
              <li><Link href="/komunitas" className="hover:text-blue-600">Komunitas</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600">FAQ</Link></li>
              <li><Link href="/kontak" className="hover:text-blue-600">Kontak</Link></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; 2026 ScaleBiz Academy. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            {/* Tautan privasi dan term sudah terhubung */}
            <Link href="/privacy" className="hover:text-blue-600">Kebijakan Privasi</Link>
            <Link href="/terms" className="hover:text-blue-600">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}