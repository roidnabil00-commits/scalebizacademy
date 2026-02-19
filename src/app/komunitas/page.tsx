"use client"

import Link from "next/link"
import { 
    ArrowLeft, MessageCircle, Send, Hash, Users, 
    Zap, ShieldCheck, Target, HeartHandshake, CheckCircle2, ArrowRight 
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function KomunitasPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16 md:pb-24 font-sans">
      
      {/* 1. HERO SECTION: Responsif & Rapi */}
      <section className="bg-white dark:bg-slate-900 border-b pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="container max-w-screen-lg px-4 md:px-6 mx-auto text-center relative">
          
          <div className="absolute top-0 left-4 md:left-6">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> <span className="hidden sm:inline">Kembali</span>
            </Link>
          </div>
          
          <div className="max-w-3xl mx-auto mt-10 md:mt-0">
            <div className="flex justify-center mb-6 md:mb-8">
              <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs md:text-sm font-medium border border-blue-100 dark:border-blue-800">
                <Users className="w-4 h-4" /> ScaleBiz Inner Circle
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight px-2">
              Lebih Cepat Sukses <br className="hidden md:block" /> <span className="text-blue-600">Dengan Circle yang Tepat.</span>
            </h1>
            
            <p className="text-base md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8 md:mb-12 px-4">
              Ilmu terbaik seringkali datang dari pengalaman sesama pengusaha. Bergabunglah dengan ekosistem bisnis paling suportif di Indonesia, 100% Gratis.
            </p>

            {/* Social Proof Elements */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">
                <div className="flex -space-x-2 md:-space-x-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white dark:border-slate-900 bg-blue-100 flex items-center justify-center text-[10px] md:text-xs">👨‍💼</div>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white dark:border-slate-900 bg-violet-100 flex items-center justify-center text-[10px] md:text-xs">👩‍💻</div>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white dark:border-slate-900 bg-green-100 flex items-center justify-center text-[10px] md:text-xs">🚀</div>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 flex items-center justify-center text-[10px] md:text-xs font-bold text-slate-600">+10k</div>
                </div>
                <span>Member aktif berdiskusi setiap hari</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PILIHAN PLATFORM KOMUNITAS: Grid yang Rapi */}
      <section className="py-16 md:py-24">
        <div className="container max-w-screen-xl px-4 md:px-6 mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">Pilih Jalur Diskusi Anda</h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">Kami menyediakan beberapa platform sesuai dengan gaya komunikasi dan kebutuhan Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* KARTU WHATSAPP */}
            <Card className="border border-slate-200 shadow-sm bg-white dark:bg-slate-900 hover:shadow-md transition-shadow flex flex-col h-full">
                <CardContent className="pt-8 px-6 pb-6 md:pt-10 md:px-8 md:pb-8 flex flex-col h-full">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 border border-green-100 mx-auto lg:mx-0">
                        <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />
                    </div>
                    <h3 className="font-bold text-xl md:text-2xl mb-3 text-slate-900 dark:text-white text-center lg:text-left">WhatsApp Group</h3>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-center lg:text-left">
                      Ruang ngobrol santai dan <i>fast-response</i>. Tanya jawab singkat, perkenalan bisnis, dan interaksi langsung sehari-hari.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-8 flex-grow">
                        <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Paling Cocok Untuk:</p>
                        <ul className="text-xs md:text-sm space-y-2.5 text-slate-700 dark:text-slate-300">
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Update kilat & info kopdar</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Tanya jawab ringan (Q&A)</li>
                        </ul>
                    </div>
                    {/* Ganti Link di Sini */}
                    <a href="https://chat.whatsapp.com/..." target="_blank" rel="noopener noreferrer" className="mt-auto">
                        <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold h-11 md:h-12">
                            Gabung WhatsApp
                        </Button>
                    </a>
                </CardContent>
            </Card>

            {/* KARTU TELEGRAM (Rekomendasi) */}
            <Card className="border-2 border-sky-400 dark:border-sky-700 shadow-md bg-white dark:bg-slate-900 flex flex-col h-full relative overflow-hidden transform lg:-translate-y-4">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-sky-500"></div>
                <div className="absolute top-5 right-[-35px] bg-sky-500 text-white text-[10px] font-bold py-1 px-10 transform rotate-45 tracking-wider shadow-sm">
                    REKOMENDASI
                </div>
                
                <CardContent className="pt-8 px-6 pb-6 md:pt-10 md:px-8 md:pb-8 flex flex-col h-full">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center mb-6 border border-sky-100 mx-auto lg:mx-0">
                        <Send className="w-7 h-7 md:w-8 md:h-8 ml-1" />
                    </div>
                    <h3 className="font-bold text-xl md:text-2xl mb-3 text-slate-900 dark:text-white text-center lg:text-left">Telegram Channel</h3>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-center lg:text-left">
                      Pusat informasi satu arah. Tidak ada obrolan bising, murni hanya pengumuman penting, materi, dan alat bantu bisnis.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-8 flex-grow">
                        <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Yang Akan Anda Dapatkan:</p>
                        <ul className="text-xs md:text-sm space-y-2.5 text-slate-700 dark:text-slate-300">
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" /> Info rilis modul & kelas baru</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" /> Link download template (Excel/PDF)</li>
                        </ul>
                    </div>
                    {/* Ganti Link di Sini */}
                    <a href="https://t.me/..." target="_blank" rel="noopener noreferrer" className="mt-auto">
                        <Button className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold h-11 md:h-12">
                            Gabung Telegram
                        </Button>
                    </a>
                </CardContent>
            </Card>

            {/* KARTU DISCORD */}
            <Card className="border border-slate-200 shadow-sm bg-white dark:bg-slate-900 hover:shadow-md transition-shadow flex flex-col h-full md:col-span-2 lg:col-span-1">
                <CardContent className="pt-8 px-6 pb-6 md:pt-10 md:px-8 md:pb-8 flex flex-col h-full">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mb-6 border border-indigo-100 mx-auto lg:mx-0">
                        <Hash className="w-7 h-7 md:w-8 md:h-8" />
                    </div>
                    <h3 className="font-bold text-xl md:text-2xl mb-3 text-slate-900 dark:text-white text-center lg:text-left">Discord Server</h3>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-center lg:text-left">
                      Forum diskusi mendalam. Topik dipisah per ruangan (Marketing, Keuangan, Operasional) agar mudah dicari dan dibaca.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-8 flex-grow">
                        <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Paling Cocok Untuk:</p>
                        <ul className="text-xs md:text-sm space-y-2.5 text-slate-700 dark:text-slate-300">
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" /> Bedah studi kasus bisnis spesifik</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" /> Diskusi terstruktur & Voice Chat</li>
                        </ul>
                    </div>
                    {/* Ganti Link di Sini */}
                    <a href="https://discord.gg/..." target="_blank" rel="noopener noreferrer" className="mt-auto">
                        <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold h-11 md:h-12">
                            Gabung Discord
                        </Button>
                    </a>
                </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* 3. AUDIENS & BUDAYA (Grid Fleksibel) */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-y">
        <div className="container max-w-screen-xl px-4 md:px-6 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Siapa saja di dalam? */}
            <div className="order-2 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                    <Target className="w-6 h-6 md:w-8 md:h-8 text-blue-600" /> Profil Member
                </h3>
                <div className="space-y-8">
                    <div className="flex gap-4 md:gap-6">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-1 border border-blue-100">
                            <span className="font-bold text-blue-600 text-lg">1</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg md:text-xl mb-2 text-slate-900 dark:text-white">Perintis Bisnis (Pemula)</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">Mereka yang baru merancang ide atau baru berjalan di bawah 1 tahun. Fokus mencari fundamental yang benar agar tidak salah langkah.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 md:gap-6">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-1 border border-blue-100">
                            <span className="font-bold text-blue-600 text-lg">2</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg md:text-xl mb-2 text-slate-900 dark:text-white">Pemilik UMKM Aktif</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">Bisnis sudah berjalan namun sering terjebak dalam masalah operasional, HPP bocor, atau penjualan stagnan. Mencari solusi scale-up.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 md:gap-6">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-1 border border-blue-100">
                            <span className="font-bold text-blue-600 text-lg">3</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg md:text-xl mb-2 text-slate-900 dark:text-white">Profesional & Freelancer</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">Mereka yang memiliki keahlian spesifik (desain, marketing, finance) dan ingin berjejaring atau menawarkan jasa ke ekosistem UMKM.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Budaya & Aturan (Kotak Highlight) */}
            <div className="bg-slate-50 dark:bg-slate-800 p-6 md:p-10 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm order-1 lg:order-2">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-green-600" /> Aturan Main
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm md:text-base leading-relaxed">
                    Kami menjaga ketat kualitas diskusi. Melanggar aturan di bawah ini akan mengakibatkan pengeluaran (kick) dari grup secara permanen.
                </p>
                <ul className="space-y-6">
                    <li className="flex gap-4 items-start bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                        <Zap className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                        <div>
                            <strong className="block text-slate-900 dark:text-white text-base md:text-lg mb-1">Zero Spam Policy</strong>
                            <span className="text-sm text-slate-600 dark:text-slate-400">Dilarang keras membagikan link afiliasi, MLM, judi, atau promosi pinjol.</span>
                        </div>
                    </li>
                    <li className="flex gap-4 items-start bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                        <HeartHandshake className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                        <div>
                            <strong className="block text-slate-900 dark:text-white text-base md:text-lg mb-1">Hari Promosi Terjadwal</strong>
                            <span className="text-sm text-slate-600 dark:text-slate-400">Promosi bisnis Anda hanya diizinkan pada jadwal tertentu agar grup tidak menjadi papan iklan.</span>
                        </div>
                    </li>
                    <li className="flex gap-4 items-start bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                        <Users className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                        <div>
                            <strong className="block text-slate-900 dark:text-white text-base md:text-lg mb-1">Saling Menghargai</strong>
                            <span className="text-sm text-slate-600 dark:text-slate-400">Gunakan bahasa yang sopan. Tidak ada pertanyaan yang bodoh. Kita semua di sini untuk belajar.</span>
                        </div>
                    </li>
                </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FAQ KOMUNITAS: Rapi dan Proporsional */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl px-4 md:px-6 mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">Pertanyaan Seputar Komunitas</h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">Masih ragu untuk bergabung? Berikut beberapa jawaban untuk Anda.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 md:p-8 shadow-sm">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b-slate-100 dark:border-b-slate-800">
                    <AccordionTrigger className="text-left font-semibold text-base md:text-lg py-4 hover:no-underline hover:text-blue-600 transition-colors">Apakah masuk komunitas ini benar-benar gratis?</AccordionTrigger>
                    <AccordionContent className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed pb-6">
                    Ya, 100% gratis. Anda tidak akan dipungut biaya bulanan atau tahunan untuk berada di dalam grup WhatsApp, Telegram, maupun Discord kami.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b-slate-100 dark:border-b-slate-800">
                    <AccordionTrigger className="text-left font-semibold text-base md:text-lg py-4 hover:no-underline hover:text-blue-600 transition-colors">Apakah saya boleh masuk ke ketiga grup sekaligus?</AccordionTrigger>
                    <AccordionContent className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed pb-6">
                    Tentu saja boleh! Namun kami sangat menyarankan Anda untuk setidaknya masuk ke <strong>Telegram Channel</strong> agar tidak tertinggal info rilis modul, dan pilih antara WA atau Discord untuk berdiskusi sesuai kenyamanan Anda.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-none">
                    <AccordionTrigger className="text-left font-semibold text-base md:text-lg py-4 hover:no-underline hover:text-blue-600 transition-colors">Bisnis saya belum jalan, baru ide saja. Boleh gabung?</AccordionTrigger>
                    <AccordionContent className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed pb-2">
                    Sangat disarankan. Bergabung dari awal justru menghindarkan Anda dari kesalahan fatal (trial & error) yang sering dialami oleh pemula, karena Anda bisa belajar dari pengalaman senior di grup.
                    </AccordionContent>
                </AccordionItem>
              </Accordion>
          </div>
        </div>
      </section>

    </div>
  )
}