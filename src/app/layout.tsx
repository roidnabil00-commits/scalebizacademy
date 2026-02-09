import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer"; 
import { ChatWidget } from "@/components/layout/chatwidget";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScaleBiz Academy - Platform Edukasi UMKM",
  description: "Scale Your Business, Achieve Your Dreams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body 
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col", // 2. TAMBAH flex flex-col
          inter.className
        )}
        suppressHydrationWarning
      >
        <Header />
        
        {/* 3. WRAP CHILDREN AGAR KONTEN MENGISI RUANG KOSONG */}
        <div className="flex-1">
          {children}
        </div>
        
        <Footer /> {/* 4. PASANG FOOTER DISINI */}
        <ChatWidget /> {/* Pasang disini */}
      </body>
    </html>
  );
}