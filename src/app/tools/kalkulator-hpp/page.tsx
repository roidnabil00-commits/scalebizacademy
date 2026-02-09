import { HPPCalculator } from "@/components/tools/hppcalculator"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Kalkulator HPP UMKM - ScaleBiz Academy",
  description: "Hitung Harga Pokok Penjualan (HPP) dan tentukan harga jual produk Anda dengan akurat.",
}

export default function KalkulatorHPPPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* HEADER PAGE */}
      <div className="bg-white border-b">
        <div className="container py-8 px-6 md:px-12 max-w-screen-2xl">
             <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-600 mb-4 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Beranda
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Kalkulator HPP & Harga Jual</h1>
            <p className="text-slate-500 max-w-2xl">
                Gunakan alat bantu sederhana ini untuk menghitung modal per produk dan menentukan harga jual agar bisnis Anda tidak rugi.
            </p>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="container py-8 px-6 md:px-12 max-w-screen-2xl">
        <HPPCalculator />
      </div>

    </div>
  )
}