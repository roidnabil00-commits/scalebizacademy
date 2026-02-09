"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, LayoutDashboard, LogOut, User as UserIcon } from "lucide-react"
import { createClient } from "@/lib/supabase"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mainNav } from "@/config/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { SearchCommand } from "./searchcommand" // Import Search Component

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)
  
  // State User & Admin
  const [user, setUser] = React.useState<any>(null)
  const [isAdmin, setIsAdmin] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    checkUser()
  }, [])

  // Fungsi Cek User & Role dari Database
  const checkUser = async () => {
    const supabase = createClient()
    
    // 1. Ambil User Auth
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)

    // 2. Jika user login, cek role-nya di tabel 'users'
    if (user) {
        const { data: profile } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single()
        
        // Jika role admin, set state true
        if (profile?.role === 'admin') {
            setIsAdmin(true)
        }
    }
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    setIsAdmin(false)
    router.push("/login")
    router.refresh()
  }

  const getInitials = (email: string) => {
    return email ? email.substring(0, 2).toUpperCase() : "U"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 md:h-20 max-w-screen-2xl items-center justify-between px-4 md:px-12">
        
        {/* LOGO AREA */}
        <div className="flex items-center gap-2 shrink-0">
            <Link href="/" className="flex items-center space-x-2">
                <span className="text-lg md:text-2xl font-bold tracking-tight flex gap-1">
                  <span className="text-blue-600 dark:text-blue-400">ScaleBiz</span> 
                  <span className="text-violet-600 dark:text-violet-400">Academy</span>
                </span>
            </Link>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-blue-600",
                pathname === item.href ? "text-foreground font-bold" : "text-foreground/60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* ACTIONS AREA */}
        <div className="flex items-center gap-2 md:gap-4">
            
            {/* SEARCH BAR (Desktop Only) */}
            <div className="hidden md:block">
                <SearchCommand />
            </div>

            <ModeToggle />

            {/* DESKTOP USER MENU */}
            <div className="hidden md:flex items-center gap-2">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src="" alt="User" />
                                    <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
                                        {getInitials(user.email)}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">Akun Saya</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            
                            {/* TOMBOL ADMIN (Hanya muncul jika isAdmin = true) */}
                            {isAdmin && (
                                <DropdownMenuItem asChild>
                                    <Link href="/admin" className="cursor-pointer font-semibold text-blue-600">
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        Dashboard Admin
                                    </Link>
                                </DropdownMenuItem>
                            )}

                            <DropdownMenuItem asChild>
                                <Link href="/profile" className="cursor-pointer">
                                    <UserIcon className="mr-2 h-4 w-4" />
                                    Profile User
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                                <LogOut className="mr-2 h-4 w-4" />
                                Keluar (Logout)
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <>
                        <Link href="/login">
                            <Button variant="ghost" size="sm" className="text-sm font-medium">
                                Masuk
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 shadow-sm">
                                Daftar Gratis
                            </Button>
                        </Link>
                    </>
                )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <div className="md:hidden">
                {isMounted && (
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            
                            <div className="sr-only">
                                <SheetTitle>Menu Navigasi</SheetTitle>
                                <SheetDescription>Akses halaman utama ScaleBiz Academy</SheetDescription>
                            </div>
                            
                            {/* Mobile User Info */}
                            {user && (
                                <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center gap-3">
                                     <Avatar className="h-10 w-10 border">
                                        <AvatarFallback className="bg-blue-600 text-white font-bold">
                                            {getInitials(user.email)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-bold truncate">Halo, User</p>
                                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col space-y-4">
                                {/* Di Mobile, Search juga bisa diakses lewat menu atau button terpisah, 
                                    tapi untuk sekarang kita fokus ke menu navigasi */}
                                
                                {mainNav.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-base font-medium hover:text-blue-600 px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                                
                                <div className="h-px bg-border my-2" />
                                
                                {user ? (
                                    <>
                                        {/* MOBILE ADMIN BUTTON */}
                                        {isAdmin && (
                                            <Link href="/admin" onClick={() => setIsOpen(false)}>
                                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold justify-start mb-2">
                                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                                    Dashboard Admin
                                                </Button>
                                            </Link>
                                        )}

                                        <Link href="/profile" onClick={() => setIsOpen(false)}>
                                            <Button variant="outline" className="w-full justify-start">
                                                <UserIcon className="mr-2 h-4 w-4" />
                                                Profile User
                                            </Button>
                                        </Link>

                                        <Button variant="destructive" className="w-full justify-start mt-2" onClick={handleLogout}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Keluar
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" onClick={() => setIsOpen(false)}>
                                            <Button variant="ghost" className="w-full justify-start">
                                                Masuk
                                            </Button>
                                        </Link>
                                        <Link href="/register" onClick={() => setIsOpen(false)}>
                                            <Button className="w-full bg-blue-600 text-white font-bold">
                                                Daftar Gratis
                                            </Button>
                                        </Link>
                                    </>
                                )}

                            </div>
                        </SheetContent>
                    </Sheet>
                )}
            </div>
        </div>

      </div>
    </header>
  )
}