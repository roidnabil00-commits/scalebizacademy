import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12">
      <div className="container max-w-3xl px-6 mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-600 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
        </Link>

        <article className="prose prose-slate dark:prose-invert max-w-none">
            <h1>Syarat & Ketentuan</h1>
            <p><strong>Terakhir diperbarui:</strong> 20 Februari 2026</p>
            
            <p>Dengan mengakses atau menggunakan platform ScaleBiz Academy, Anda setuju untuk terikat oleh Syarat dan Ketentuan berikut.</p>

            <h2>1. Penggunaan Layanan</h2>
            <p>Anda setuju untuk menggunakan layanan ini hanya untuk tujuan yang sah dan sesuai dengan Syarat ini. Anda dilarang menggunakan layanan kami dengan cara yang dapat merusak, melumpuhkan, membebani, atau mengganggu server kami atau jaringan yang terhubung ke server kami.</p>

            <h2>2. Akun Pengguna</h2>
            <p>Anda bertanggung jawab untuk menjaga kerahasiaan kata sandi akun Anda dan atas semua aktivitas yang terjadi di bawah akun Anda. Anda harus segera memberi tahu kami jika ada penggunaan tidak sah atas akun Anda.</p>

            <h2>3. Penggunaan Tools & Kalkulator HPP</h2>
            <p>Fitur <em>Tools</em> dan Kalkulator HPP disediakan "sebagaimana adanya" untuk tujuan edukasi dan estimasi. ScaleBiz Academy tidak bertanggung jawab atas kerugian finansial yang mungkin timbul dari keputusan bisnis yang diambil berdasarkan hasil kalkulasi sistem kami. Keputusan bisnis sepenuhnya merupakan tanggung jawab pengguna.</p>

            <h2>4. Hak Kekayaan Intelektual</h2>
            <p>Semua konten yang tersedia di platform ini, termasuk namun tidak terbatas pada video modul, teks, grafik, logo, dan perangkat lunak, adalah milik ScaleBiz Academy atau dilisensikan kepada kami dan dilindungi oleh undang-undang hak cipta.</p>

            <h2>5. Perubahan Syarat</h2>
            <p>Kami berhak memodifikasi atau mengganti Syarat ini kapan saja. Perubahan material akan diberitahukan melalui email atau pemberitahuan di situs web kami sebelum perubahan berlaku efektif.</p>

        </article>
      </div>
    </div>
  )
}