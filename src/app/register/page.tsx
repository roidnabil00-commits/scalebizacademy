"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Loader2, ArrowLeft, Mail, Lock, User, Phone } from "lucide-react" // Tambah icon Phone
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("") // State baru untuk No HP
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    
    // 1. Sign Up ke Auth Supabase
    // Data 'phone' dan 'full_name' kita kirim lewat 'options.data'
    // Nanti Trigger SQL yang akan menangkap data ini dan memasukkannya ke tabel 'users'
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, 
          phone: phone, // Kirim No HP
        },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // Tidak perlu insert manual ke tabel 'users' lagi, karena sudah dihandle Trigger SQL!
    // Jauh lebih aman dan rapi.

    setSuccess(true)
    setLoading(false)
    
    setTimeout(() => {
        router.push("/login")
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Beranda
        </Link>
      </div>

      <Card className="w-full max-w-md border-slate-200 shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
             <span className="text-2xl font-bold tracking-tight flex gap-1">
                <span className="text-blue-600">ScaleBiz</span> 
                <span className="text-violet-600">Academy</span>
             </span>
          </div>
          <CardTitle className="text-2xl font-bold">Buat Akun Baru</CardTitle>
          <CardDescription>
            Mulai perjalanan scale up bisnis Anda hari ini
          </CardDescription>
        </CardHeader>
        <CardContent>
          
          {success ? (
              <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Pendaftaran Berhasil!</h3>
                  <p className="text-muted-foreground">Silakan cek email Anda untuk verifikasi (jika diaktifkan) atau langsung login.</p>
                  <Button className="w-full bg-blue-600" onClick={() => router.push('/login')}>
                    Ke Halaman Login
                  </Button>
              </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
                
                {error && (
                    <Alert variant="destructive" className="bg-red-50 text-red-600 border-red-200">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                            id="name" 
                            placeholder="Nama Bisnis / Owner" 
                            className="pl-10"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* INPUT PHONE BARU */}
                <div className="space-y-2">
                    <Label htmlFor="phone">No. WhatsApp / HP</Label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                            id="phone" 
                            placeholder="0812..." 
                            className="pl-10"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            type="tel"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Bisnis</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="nama@bisnis.com" 
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                            id="password" 
                            type="password" 
                            placeholder="Minimal 6 karakter"
                            className="pl-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold" disabled={loading}>
                {loading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mendaftarkan...
                    </>
                ) : (
                    "Daftar Sekarang"
                )}
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                    Dengan mendaftar, Anda menyetujui <Link href="#" className="underline">Syarat & Ketentuan</Link> serta <Link href="#" className="underline">Kebijakan Privasi</Link> kami.
                </p>
            </form>
          )}

        </CardContent>
        {!success && (
            <CardFooter className="flex justify-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link href="/login" className="ml-1 font-semibold text-blue-600 hover:underline">
                Masuk disini
            </Link>
            </CardFooter>
        )}
      </Card>
    </div>
  )
}