import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12">
      <div className="container max-w-3xl px-6 mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-600 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
        </Link>

        <article className="prose prose-slate dark:prose-invert max-w-none">
            <h1>Kebijakan Privasi</h1>
            <p><strong>Terakhir diperbarui:</strong> 20 Februari 2026</p>
            
            <p>Selamat datang di ScaleBiz Academy. Kami sangat menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi yang Anda bagikan kepada kami.</p>

            <h2>1. Informasi yang Kami Kumpulkan</h2>
            <p>Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, seperti saat Anda membuat akun, berlangganan modul, atau berkomunikasi dengan kami. Ini mungkin termasuk: Nama lengkap, alamat email, nomor telepon, dan informasi profil bisnis Anda.</p>

            <h2>2. Bagaimana Kami Menggunakan Informasi Anda</h2>
            <p>Kami menggunakan informasi yang kami kumpulkan untuk:</p>
            <ul>
                <li>Menyediakan, memelihara, dan meningkatkan layanan platform kami.</li>
                <li>Memproses transaksi dan mengirimkan pemberitahuan terkait.</li>
                <li>Mengirimkan informasi teknis, pembaruan keamanan, dan pesan dukungan administratif.</li>
                <li>Merespons komentar, pertanyaan, dan permintaan layanan pelanggan Anda.</li>
            </ul>

            <h2>3. Keamanan Data</h2>
            <p>Kami menggunakan langkah-langkah keamanan administratif, teknis, dan fisik yang wajar untuk melindungi informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah (termasuk penggunaan protokol keamanan otentikasi Supabase).</p>

            <h2>4. Berbagi Informasi</h2>
            <p>Kami tidak akan menjual, menyewakan, atau memperdagangkan informasi pribadi Anda kepada pihak ketiga. Kami hanya dapat membagikan informasi dalam situasi yang diwajibkan oleh hukum atau untuk mematuhi proses hukum yang berlaku.</p>

            <h2>5. Hubungi Kami</h2>
            <p>Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di <a href="mailto:privacy@scalebizacademy.com">privacy@scalebizacademy.com</a>.</p>
        </article>
      </div>
    </div>
  )
}