import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20">
      <div className="container max-w-screen-md px-6 py-12 mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-600 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Link>

        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Hubungi Kami</h1>
        <p className="text-lg text-muted-foreground mb-10">
            Punya pertanyaan seputar modul, tools, atau kerja sama? Jangan ragu untuk menghubungi tim ScaleBiz Academy.
        </p>

        <div className="grid gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">WhatsApp (Fast Response)</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">Senin - Jumat, 09:00 - 17:00 WIB</p>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Ganti nomor WA dengan nomor admin Anda */}
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-green-600 hover:bg-green-700">Chat via WhatsApp</Button>
                    </a>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">Email</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">Untuk keperluan bisnis dan partnership</p>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Ganti email di bawah ini */}
                    <a href="mailto:halo@scalebizacademy.com">
                        <Button variant="outline" className="w-full">halo@scalebizacademy.com</Button>
                    </a>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">Alamat Kantor</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">Headquarter ScaleBiz</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm">
                        Jl. Bisnis Merdeka No. 88, Kawasan Digital Center<br/>
                        Jakarta Selatan, Indonesia 12345
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}