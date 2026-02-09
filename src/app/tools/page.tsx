import Link from "next/link"
import { Calculator, FileSpreadsheet, TrendingUp, Lock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Business Tools - ScaleBiz Academy",
  description: "Kumpulan tools praktis untuk membantu operasional dan perhitungan bisnis UMKM.",
}

export default function ToolsPage() {
  const tools = [
    {
      title: "Kalkulator HPP & Harga Jual",
      description: "Hitung modal per unit dan tentukan harga jual yang menguntungkan dengan presisi.",
      icon: <Calculator className="w-10 h-10 text-blue-600" />,
      href: "/tools/kalkulator-hpp",
      status: "Tersedia",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Cek Kesehatan Bisnis",
      description: "Analisa kondisi finansial dan operasional bisnis Anda melalui kuesioner diagnosa.",
      icon: <TrendingUp className="w-10 h-10 text-slate-400" />,
      href: "#",
      status: "Segera Hadir",
      color: "bg-slate-50 border-slate-200 opacity-80"
    },
    {
      title: "Generator Invoice",
      description: "Buat invoice profesional dan kirim ke klien dalam hitungan detik.",
      icon: <FileSpreadsheet className="w-10 h-10 text-slate-400" />,
      href: "#",
      status: "Segera Hadir",
      color: "bg-slate-50 border-slate-200 opacity-80"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/* HEADER */}
      <div className="bg-white border-b py-12 px-6 md:px-12">
        <div className="container max-w-screen-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Business Tools</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
                Alat bantu praktis yang dirancang khusus untuk mempermudah operasional harian UMKM. 
                Hemat waktu, kurangi error.
            </p>
        </div>
      </div>

      {/* TOOLS GRID */}
      <div className="container max-w-screen-2xl px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {tools.map((tool, index) => (
                <Card key={index} className={`border-2 hover:shadow-md transition-all ${tool.color}`}>
                    <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-3 bg-white rounded-xl shadow-sm border">
                                {tool.icon}
                            </div>
                            {tool.status === "Segera Hadir" && (
                                <Badge variant="outline" className="text-slate-500 gap-1">
                                    <Lock className="w-3 h-3" /> Coming Soon
                                </Badge>
                            )}
                            {tool.status === "Tersedia" && (
                                <Badge className="bg-green-600 hover:bg-green-700">Gratis</Badge>
                            )}
                        </div>
                        <CardTitle className="text-xl">{tool.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-base text-slate-600">
                            {tool.description}
                        </CardDescription>
                    </CardContent>
                    <CardFooter>
                        {tool.status === "Tersedia" ? (
                            <Link href={tool.href} className="w-full">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 font-semibold">
                                    Gunakan Sekarang
                                </Button>
                            </Link>
                        ) : (
                            <Button disabled variant="secondary" className="w-full">
                                Dalam Pengembangan
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            ))}

        </div>
      </div>
    </div>
  )
}