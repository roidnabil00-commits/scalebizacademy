"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Loader2, User, Mail, Calendar, LogOut, Save, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [user, setUser] = useState<any>(null)
  
  // State untuk data profil
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [joinDate, setJoinDate] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  useEffect(() => {
    getProfile()
  }, [])

  // 1. Ambil Data User dari Supabase
  const getProfile = async () => {
    const supabase = createClient()
    
    // Cek Sesi Auth
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push("/login")
      return
    }

    setUser(user)
    setEmail(user.email || "")
    setJoinDate(new Date(user.created_at).toLocaleDateString("id-ID", {
        day: 'numeric', month: 'long', year: 'numeric'
    }))

    // Ambil data detail dari tabel 'users' (jika ada)
    const { data: profile } = await supabase
      .from('users')
      .select('name')
      .eq('id', user.id)
      .single()

    if (profile) {
        setName(profile.name)
    } else {
        // Fallback jika tidak ada di tabel users, ambil dari metadata auth
        setName(user.user_metadata.full_name || "User ScaleBiz")
    }

    setLoading(false)
  }

  // 2. Fungsi Update Profil
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    setMessage(null)
    
    const supabase = createClient()

    // Update ke tabel 'users'
    const { error } = await supabase
        .from('users')
        .upsert({ 
            id: user.id, 
            email: email,
            name: name,
            // updated_at: new Date() // jika ada kolom ini
        })

    // Update juga metadata Auth (supaya sinkron)
    const { error: authError } = await supabase.auth.updateUser({
        data: { full_name: name }
    })

    if (error || authError) {
        setMessage({ type: 'error', text: "Gagal memperbarui profil." })
    } else {
        setMessage({ type: 'success', text: "Profil berhasil diperbarui!" })
        setIsEditing(false)
        router.refresh() // Refresh agar header update
    }

    setUpdating(false)
  }

  // 3. Fungsi Logout
  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  // Helper Inisial Nama
  const getInitials = (text: string) => {
    return text ? text.substring(0, 2).toUpperCase() : "U"
  }

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
                <AvatarImage src="" />
                <AvatarFallback className="bg-blue-600 text-white text-2xl font-bold">
                    {getInitials(name)}
                </AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{name}</h1>
                <p className="text-muted-foreground">{email}</p>
            </div>
            <div className="flex gap-2">
                 <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    <Edit2 className="w-4 h-4 mr-2" /> 
                    {isEditing ? "Batal Edit" : "Edit Profil"}
                 </Button>
                 <Button variant="destructive" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                 </Button>
            </div>
        </div>

        {/* ALERT MESSAGE */}
        {message && (
            <Alert className={message.type === 'success' ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}>
                <AlertDescription>{message.text}</AlertDescription>
            </Alert>
        )}

        {/* MAIN CARD */}
        <Card className="shadow-lg border-slate-200 dark:border-slate-800">
            <CardHeader>
                <CardTitle>Informasi Akun</CardTitle>
                <CardDescription>Kelola detail informasi pribadi Anda disini.</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-6">
                
                {/* FORM EDIT / VIEW */}
                <form onSubmit={handleUpdateProfile}>
                    <div className="grid gap-6">
                        
                        {/* Nama Lengkap */}
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <User className="w-4 h-4 text-slate-500" /> Nama Lengkap
                            </Label>
                            {isEditing ? (
                                <Input 
                                    id="name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    className="bg-white"
                                />
                            ) : (
                                <div className="p-3 bg-slate-50 rounded-md border text-slate-700 font-medium">
                                    {name}
                                </div>
                            )}
                        </div>

                        {/* Email (Read Only) */}
                        <div className="grid gap-2">
                            <Label className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-slate-500" /> Email
                            </Label>
                            <div className="p-3 bg-slate-100 rounded-md border text-slate-500 cursor-not-allowed">
                                {email}
                            </div>
                            <p className="text-[10px] text-muted-foreground ml-1">Email tidak dapat diubah.</p>
                        </div>

                        {/* Join Date */}
                        <div className="grid gap-2">
                            <Label className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-slate-500" /> Bergabung Sejak
                            </Label>
                            <div className="p-3 bg-slate-50 rounded-md border text-slate-700">
                                {joinDate}
                            </div>
                        </div>

                        {/* Save Button (Only if editing) */}
                        {isEditing && (
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 mt-2" disabled={updating}>
                                {updating ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                Simpan Perubahan
                            </Button>
                        )}

                    </div>
                </form>

            </CardContent>
            
            {!isEditing && (
                 <CardFooter className="bg-slate-50/50 border-t p-6">
                    <div className="text-sm text-muted-foreground">
                        Ingin mengubah password? <Button variant="link" className="px-1 text-blue-600 h-auto p-0">Reset Password via Email</Button> (Coming Soon).
                    </div>
                </CardFooter>
            )}
        </Card>

      </div>
    </div>
  )
}