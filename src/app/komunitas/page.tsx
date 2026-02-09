import Link from "next/link"
import { Users, MessageCircle, Send, Gamepad2, Calendar, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "Komunitas ScaleBiz Academy",
  description: "Bergabung dengan ribuan pengusaha UMKM Indonesia untuk networking dan belajar bersama.",
}

export default function KomunitasPage() {
  const benefits = [
    "Networking dengan sesama pengusaha se-Indonesia",
    "Diskusi langsung dengan mentor ahli",
    "Info update algoritma dan tren pasar terbaru",
    "Kesempatan kolaborasi dan partnership bisnis"
  ]

  const events = [
    {
      title: "Webinar: Strategi TikTok 2026",
      date: "10 Februari 2026",
      time: "19.30 WIB",
      type: "Online (Zoom)",
      status: "Open"
    },
    {
      title: "Kopdar UMKM Jakarta",
      date: "25 Februari 2026",
      time: "13.00 WIB",
      type: "Offline (Jaksel)",
      status: "Waiting List"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/* HERO SECTION */}
      <div className="bg-white border-b">
        <div className="container py-16 px-6 md:px-12 max-w-screen-2xl text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100 px-3 py-1 text-sm">
                ScaleBiz Community
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900">
                Tumbuh Lebih Cepat Bersama <br className="hidden md:block"/>
                <span className="text-blue-600">Ribuan Pengusaha Lainnya</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
                Bisnis itu berat kalau dijalani sendirian. Bergabunglah sekarang untuk mendapatkan support system, mentor, dan teman seperjuangan.
            </p>
            
            {/* Quick Stats */}
            <div className="flex justify-center gap-8 md:gap-16 pt-4 border-t max-w-3xl mx-auto">
                <div>
                    <div className="text-2xl md:text-3xl font-bold text-slate-900">5,000+</div>
                    <div className="text-sm text-slate-500">Member Aktif</div>
                </div>
                <div>
                    <div className="text-2xl md:text-3xl font-bold text-slate-900">10+</div>
                    <div className="text-sm text-slate-500">Mentor Ahli</div>
                </div>
                <div>
                    <div className="text-2xl md:text-3xl font-bold text-slate-900">Weekly</div>
                    <div className="text-sm text-slate-500">Event Rutin</div>
                </div>
            </div>
        </div>
      </div>

      <div className="container max-w-screen-2xl px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* LEFT COLUMN: JOIN OPTIONS (2/3) */}
            <div className="lg:col-span-2 space-y-10">
                
                {/* 1. PLATFORM CARDS */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Users className="w-6 h-6 text-blue-600" />
                        Pilih Platform Favoritmu
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* WhatsApp */}
                        <Card className="border-green-200 bg-green-50/50 hover:shadow-lg transition-all hover:-translate-y-1">
                            <CardHeader className="pb-2">
                                <MessageCircle className="w-10 h-10 text-green-600 mb-2" />
                                <CardTitle className="text-green-800">WhatsApp</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-green-700/80">
                                    Diskusi intensif dan update cepat harian. Terbatas 1000 member/grup.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                                    Gabung Grup WA
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Telegram */}
                        <Card className="border-blue-200 bg-blue-50/50 hover:shadow-lg transition-all hover:-translate-y-1">
                            <CardHeader className="pb-2">
                                <Send className="w-10 h-10 text-blue-600 mb-2" />
                                <CardTitle className="text-blue-800">Telegram</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-blue-700/80">
                                    Channel satu arah untuk info materi, event, dan rekaman webinar.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    Join Channel
                                </Button>
                            </CardFooter>
                        </Card>

                         {/* Discord */}
                         <Card className="border-indigo-200 bg-indigo-50/50 hover:shadow-lg transition-all hover:-translate-y-1">
                            <CardHeader className="pb-2">
                                <Gamepad2 className="w-10 h-10 text-indigo-600 mb-2" />
                                <CardTitle className="text-indigo-800">Discord</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-indigo-700/80">
                                    Forum diskusi terstruktur per topik (Marketing, Ops, Finance).
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                    Masuk Server
                                </Button>
                            </CardFooter>
                        </Card>

                    </div>
                </section>

                <Separator />

                {/* 2. BENEFITS SECTION */}
                <section className="bg-white rounded-2xl p-8 border shadow-sm">
                    <h2 className="text-2xl font-bold mb-6">Kenapa Harus Gabung?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                                <span className="text-slate-700 font-medium">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </section>

                 {/* 3. GUIDELINES */}
                 <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-slate-900" />
                        Etika Komunitas
                    </h2>
                    <div className="bg-slate-100 rounded-xl p-6 text-slate-700 space-y-2 text-sm md:text-base">
                        <p>1. <strong>Dilarang Spam/Jualan Hard Selling</strong> tanpa izin admin.</p>
                        <p>2. Gunakan bahasa yang sopan dan profesional.</p>
                        <p>3. Dilarang membahas SARA dan Politik.</p>
                        <p>4. Saling membantu: Jika ada yang bertanya, bantu jawab jika tahu.</p>
                    </div>
                 </section>

            </div>

            {/* RIGHT COLUMN: EVENTS & INFO (1/3) */}
            <div className="lg:col-span-1 space-y-8">
                
                {/* UPCOMING EVENTS */}
                <Card className="border-2 border-blue-100 shadow-md">
                    <CardHeader className="bg-blue-50/50 border-b border-blue-100">
                        <CardTitle className="flex items-center gap-2 text-blue-800">
                            <Calendar className="w-5 h-5" />
                            Agenda Terdekat
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        {events.map((event, index) => (
                            <div key={index} className="relative pl-4 border-l-2 border-blue-200">
                                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-600" />
                                <h4 className="font-bold text-slate-900 leading-tight mb-1">{event.title}</h4>
                                <p className="text-sm text-slate-500 mb-2">{event.date} • {event.time}</p>
                                <div className="flex items-center justify-between">
                                    <Badge variant="secondary" className="text-xs">{event.type}</Badge>
                                    <span className={`text-xs font-semibold ${event.status === 'Open' ? 'text-green-600' : 'text-orange-500'}`}>
                                        {event.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter className="bg-slate-50 border-t pt-4">
                        <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700">
                            Lihat Jadwal Lengkap <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                    </CardFooter>
                </Card>

                {/* HELP BOX */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white text-center">
                    <h3 className="font-bold text-lg mb-2">Ingin jadi Mentor?</h3>
                    <p className="text-slate-300 text-sm mb-4">
                        Bagikan pengalaman bisnismu dan bantu UMKM lain tumbuh.
                    </p>
                    <Button variant="outline" className="w-full bg-transparent text-white border-white hover:bg-white hover:text-slate-900">
                        Hubungi Admin
                    </Button>
                </div>

            </div>

        </div>
      </div>
    </div>
  )
}