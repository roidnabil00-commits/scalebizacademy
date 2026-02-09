"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, RefreshCcw, Calculator, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Tipe data untuk item biaya
interface CostItem {
  id: string
  name: string
  cost: number
}

export function HPPCalculator() {
  // --- STATE (PENYIMPANAN DATA SEMENTARA) ---
  const [productionQty, setProductionQty] = useState<number>(1)
  const [materials, setMaterials] = useState<CostItem[]>([{ id: '1', name: '', cost: 0 }])
  const [laborCosts, setLaborCosts] = useState<CostItem[]>([{ id: '1', name: '', cost: 0 }])
  const [overheadCosts, setOverheadCosts] = useState<CostItem[]>([{ id: '1', name: '', cost: 0 }])
  const [desiredMargin, setDesiredMargin] = useState<number>(30) // Default 30%

  // --- LOGIC PERHITUNGAN ---
  const calculateTotal = (items: CostItem[]) => items.reduce((acc, item) => acc + (Number(item.cost) || 0), 0)

  const totalMaterial = calculateTotal(materials)
  const totalLabor = calculateTotal(laborCosts)
  const totalOverhead = calculateTotal(overheadCosts)
  
  const totalProductionCost = totalMaterial + totalLabor + totalOverhead
  const hppPerUnit = productionQty > 0 ? totalProductionCost / productionQty : 0
  const sellingPrice = hppPerUnit + (hppPerUnit * (desiredMargin / 100))
  const profitPerUnit = sellingPrice - hppPerUnit

  // --- FUNGSI HELPER (TAMBAH/HAPUS BARIS) ---
  const addItem = (setter: React.Dispatch<React.SetStateAction<CostItem[]>>) => {
    setter(prev => [...prev, { id: Math.random().toString(), name: '', cost: 0 }])
  }

  const updateItem = (
    id: string, 
    field: keyof CostItem, 
    value: string | number, 
    items: CostItem[], 
    setter: React.Dispatch<React.SetStateAction<CostItem[]>>
  ) => {
    const newItems = items.map(item => item.id === id ? { ...item, [field]: value } : item)
    setter(newItems)
  }

  const removeItem = (id: string, items: CostItem[], setter: React.Dispatch<React.SetStateAction<CostItem[]>>) => {
    if (items.length > 1) {
      setter(items.filter(item => item.id !== id))
    }
  }

  // Format Rupiah
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* BAGIAN KIRI: INPUT DATA (2/3 Layar) */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* 1. INFO PRODUKSI */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-blue-600" />
                    Informasi Produksi
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="qty">Jumlah Hasil Produksi (Unit/Porsi)</Label>
                    <Input 
                        type="number" 
                        id="qty" 
                        placeholder="Contoh: 100" 
                        value={productionQty}
                        onChange={(e) => setProductionQty(Number(e.target.value))}
                        min={1}
                    />
                    <p className="text-xs text-muted-foreground">Total unit yang dihasilkan dalam satu kali proses produksi.</p>
                </div>
            </CardContent>
        </Card>

        {/* 2. BIAYA BAHAN BAKU */}
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Biaya Bahan Baku</CardTitle>
                <Button variant="outline" size="sm" onClick={() => addItem(setMaterials)}><Plus className="w-4 h-4 mr-1" /> Tambah Bahan</Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {materials.map((item, index) => (
                    <div key={item.id} className="flex gap-4 items-end">
                        <div className="grid gap-1.5 flex-1">
                            {index === 0 && <Label>Nama Bahan</Label>}
                            <Input 
                                placeholder="Contoh: Tepung Terigu" 
                                value={item.name}
                                onChange={(e) => updateItem(item.id, 'name', e.target.value, materials, setMaterials)}
                            />
                        </div>
                        <div className="grid gap-1.5 w-1/3">
                            {index === 0 && <Label>Biaya (Rp)</Label>}
                            <Input 
                                type="number" 
                                placeholder="0" 
                                value={item.cost === 0 ? '' : item.cost}
                                onChange={(e) => updateItem(item.id, 'cost', Number(e.target.value), materials, setMaterials)}
                            />
                        </div>
                        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => removeItem(item.id, materials, setMaterials)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
                <div className="pt-4 flex justify-end">
                    <p className="font-semibold text-sm">Subtotal Bahan: {formatRupiah(totalMaterial)}</p>
                </div>
            </CardContent>
        </Card>

        {/* 3. BIAYA OPERASIONAL & LAINNYA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base">Tenaga Kerja</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => addItem(setLaborCosts)}><Plus className="w-4 h-4" /></Button>
                </CardHeader>
                <CardContent className="space-y-3">
                    {laborCosts.map((item) => (
                        <div key={item.id} className="flex gap-2">
                            <Input placeholder="Karyawan/Tukang Masak" value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value, laborCosts, setLaborCosts)} />
                            <Input type="number" placeholder="Rp" className="w-24" value={item.cost === 0 ? '' : item.cost} onChange={(e) => updateItem(item.id, 'cost', Number(e.target.value), laborCosts, setLaborCosts)} />
                             <Button variant="ghost" size="icon" className="h-10 w-10 text-red-500" onClick={() => removeItem(item.id, laborCosts, setLaborCosts)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base">Overhead (Gas, Listrik, Kemasan)</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => addItem(setOverheadCosts)}><Plus className="w-4 h-4" /></Button>
                </CardHeader>
                <CardContent className="space-y-3">
                    {overheadCosts.map((item) => (
                        <div key={item.id} className="flex gap-2">
                            <Input placeholder="Item Overhead" value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value, overheadCosts, setOverheadCosts)} />
                            <Input type="number" placeholder="Rp" className="w-24" value={item.cost === 0 ? '' : item.cost} onChange={(e) => updateItem(item.id, 'cost', Number(e.target.value), overheadCosts, setOverheadCosts)} />
                             <Button variant="ghost" size="icon" className="h-10 w-10 text-red-500" onClick={() => removeItem(item.id, overheadCosts, setOverheadCosts)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>

      </div>

      {/* BAGIAN KANAN: HASIL PERHITUNGAN (Sticky) */}
      <div className="lg:col-span-1">
        <Card className="sticky top-24 border-blue-200 shadow-lg bg-blue-50/50">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                <CardTitle>Hasil Perhitungan</CardTitle>
                <CardDescription className="text-blue-100">Ringkasan HPP dan Harga Jual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total Modal Produksi</p>
                    <p className="text-xl font-bold">{formatRupiah(totalProductionCost)}</p>
                </div>
                
                <Separator className="bg-blue-200" />

                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-medium text-slate-900">HPP per Unit (Modal Dasar)</p>
                    <p className="text-2xl font-bold text-blue-700">{formatRupiah(hppPerUnit)}</p>
                </div>

                <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center">
                        <Label>Margin Keuntungan</Label>
                        <span className="font-bold">{desiredMargin}%</span>
                    </div>
                    <Input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="5"
                        value={desiredMargin}
                        onChange={(e) => setDesiredMargin(Number(e.target.value))}
                        className="cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Potensi Profit:</span>
                        <span className="text-green-600 font-bold">+{formatRupiah(profitPerUnit)} /unit</span>
                    </div>
                </div>

                <Separator className="bg-blue-200" />

                <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm text-center">
                    <p className="text-sm text-muted-foreground mb-1">Rekomendasi Harga Jual</p>
                    <p className="text-3xl font-extrabold text-green-600">{formatRupiah(sellingPrice)}</p>
                </div>

            </CardContent>
            <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => window.print()}>
                    <Download className="w-4 h-4 mr-2" />
                    Simpan / Cetak PDF
                </Button>
            </CardFooter>
        </Card>
      </div>

    </div>
  )
}