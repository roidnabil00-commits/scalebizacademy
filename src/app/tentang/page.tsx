"use client"

import Link from "next/link"
import { ArrowLeft, BookOpen, Filter, Users, Award, CheckCircle2, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 font-sans">
      
      {/* 1. HERO SECTION: Bersih dan Terpusat */}
      <section className="bg-white dark:bg-slate-900 border-b pt-24 pb-20">
        <div className="container max-w-screen-lg px-6 mx-auto text-center relative">
          
          <div className="absolute top-0 left-6">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
            </Link>
          </div>
          
          <div className="max-w-3xl mx-auto mt-12 md:mt-8">
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium border border-blue-100 dark:border-blue-800">
                <Award className="w-4 h-4" /> Bagian dari Xander Academy
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
              Pusat Edukasi Bisnis <span className="text-blue-600">Gratis</span> <br/>Untuk UMKM Indonesia
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Kami merangkum ilmu-ilmu bisnis terbaik dari para ahli dan menyusunnya menjadi kurikulum yang sederhana, terarah, dan siap dipraktikkan.
            </p>
          </div>
        </div>
      </section>

      {/* 2. LATAR BELAKANG: Sederhana dan Jelas */}
      <section className="py-20">
        <div className="container max-w-screen-lg px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Menyaring Kebisingan Informasi</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-4">
              Saat ini, informasi tentang cara berbisnis sangat mudah ditemukan di media sosial. Banyak tokoh dan praktisi yang membagikan ilmu mereka secara gratis. Namun, informasi yang terpotong-potong seringkali membuat pemilik UMKM kebingungan menentukan langkah awal.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Oleh karena itu, <strong>ScaleBiz Academy</strong> hadir untuk mengumpulkan dan menyaring ilmu tersebut. Tujuan kami sederhana: memberikan akses pendidikan bisnis yang berkualitas dan terstruktur tanpa membebani UMKM dengan biaya kelas yang mahal.
            </p>
          </div>

          {/* 3. FITUR UTAMA: Grid 3 Kolom Simetris */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-slate-200 shadow-sm bg-white dark:bg-slate-900 dark:border-slate-800">
                <CardContent className="pt-8 text-center px-6 pb-8">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Filter className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">Kurasi Praktisi Ahli</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Menyeleksi strategi bisnis yang sudah tervalidasi dari para ahli dan praktisi terbaik di Indonesia.
                    </p>
                </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-sm bg-white dark:bg-slate-900 dark:border-slate-800">
                <CardContent className="pt-8 text-center px-6 pb-8">
                    <div className="w-14 h-14 bg-violet-50 text-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">Kurikulum Terarah</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Materi disusun secara bertahap, mulai dari level fundamental bisnis hingga strategi operasional lanjutan.
                    </p>
                </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-sm bg-white dark:bg-slate-900 dark:border-slate-800">
                <CardContent className="pt-8 text-center px-6 pb-8">
                    <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Users className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">100% Akses Gratis</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Berkomitmen untuk menghilangkan batasan biaya agar setiap pengusaha memiliki kesempatan yang sama.
                    </p>
                </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. PROFIL FOUNDER: Profesional & Elegan */}
      <section className="pb-20">
        <div className="container max-w-screen-lg px-6 mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                
                {/* PLACEHOLDER FOTO */}
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <img 
                        src="/xander.png" 
                        alt="Profil Bil Xander" 
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            // Fallback jika foto belum diganti
                            e.currentTarget.src = "https://ui-avatars.com/api/?name=Bil+Xander&background=f8fafc&color=0f172a&size=256";
                        }}
                    />
                </div>

                <div className="text-center md:text-left flex-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 rounded-full text-xs font-semibold mb-4">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" /> Manajemen
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Bil Xander</h2>
                    <p className="text-blue-600 font-medium mb-6">Founder & CEO, Xander Systems</p>
                    
                    <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                        <p>
                            Melalui ekosistem <strong>Xander Systems</strong> dan <strong>Xander Academy</strong>, Bil Xander mendedikasikan infrastruktur teknologi untuk membantu menyelesaikan masalah operasional bisnis di Indonesia.
                        </p>
                        <p>
                            "ScaleBiz Academy dibangun dari keinginan sederhana: memastikan tidak ada lagi UMKM yang tertinggal karena mereka tidak memiliki biaya untuk mempelajari fundamental bisnis yang benar."
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

     {/* 5. CALL TO ACTION: Rapi dan Langsung ke Tujuan */}
      <section className="pb-20">
        <div className="container max-w-screen-lg px-6 mx-auto">
          <div className="text-center bg-blue-600 rounded-2xl p-10 md:p-14 text-white shadow-lg">
              <h2 className="text-3xl font-bold mb-4">Mulai Perjalanan Bisnis Anda</h2>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                  Buat akun gratis Anda sekarang dan dapatkan akses ke seluruh modul pembelajaran serta alat kalkulasi bisnis kami.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Link href="/register">
                    <Button size="lg" className="bg-white text-blue-700 hover:bg-slate-100 font-semibold px-8 h-12 w-full sm:w-auto">
                        Daftar Gratis <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/modul">
                    {/* PERBAIKAN: Menambahkan bg-transparent agar background tidak menutupi teks */}
                    <Button size="lg" variant="outline" className="bg-transparent border-blue-200 text-white hover:bg-blue-700 hover:text-white font-medium px-8 h-12 w-full sm:w-auto">
                        Lihat Modul
                    </Button>
                  </Link>
              </div>
          </div>
        </div>
      </section>
    </div>
  )
}