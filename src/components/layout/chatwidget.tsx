"use client"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* CHAT BOX WINDOW */}
      {isOpen && (
        <Card className="mb-4 w-80 shadow-2xl border-blue-100 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="bg-blue-600 p-4 rounded-t-lg flex justify-between items-center text-white">
                <div>
                    <h4 className="font-bold">ScaleBiz Support</h4>
                    <p className="text-xs text-blue-100">Online • Balas cepat</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                    <X className="w-5 h-5" />
                </button>
            </div>
            <div className="p-4 bg-slate-50 min-h-[200px] flex flex-col gap-3">
                <div className="bg-white p-3 rounded-lg rounded-tl-none text-sm text-slate-700 shadow-sm border self-start max-w-[90%]">
                    Halo! 👋 Ada yang bisa kami bantu seputar bisnis Anda hari ini?
                </div>
                <div className="bg-white p-3 rounded-lg rounded-tl-none text-sm text-slate-700 shadow-sm border self-start max-w-[90%]">
                    Silakan pilih topik bantuan:
                </div>
            </div>
            <div className="p-3 border-t bg-white space-y-2">
                <Link href="/faq" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start text-sm h-9 mb-2">
                        📚 Baca FAQ / Bantuan
                    </Button>
                </Link>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Chat Admin WhatsApp
                    </Button>
                </a>
            </div>
        </Card>
      )}

      {/* FLOATING BUTTON */}
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl border-4 border-white dark:border-slate-900 flex items-center justify-center transition-transform hover:scale-105"
      >
        {isOpen ? (
            <X className="w-8 h-8 text-white" />
        ) : (
            <MessageCircle className="w-8 h-8 text-white" />
        )}
      </Button>
    </div>
  )
}