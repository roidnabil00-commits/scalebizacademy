"use client"

import { useState } from "react"
import { Plus, Trash2, Calculator, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface CostItem {
  id: string
  name: string
  cost: number
}

export function HPPCalculator() {
  const [productionQty, setProductionQty] = useState<number>(1)
  const [materials, setMaterials] = useState<CostItem[]>([{ id: '1', name: '', cost: 0 }])
  const [laborCosts, setLaborCosts] = useState<CostItem[]>([{ id: '2', name: '', cost: 0 }])
  const [overheadCosts, setOverheadCosts] = useState<CostItem[]>([{ id: '3', name: '', cost: 0 }])
  const [desiredMargin, setDesiredMargin] = useState<number>(30)

  // --- HELPER FORMATTING ---
  
  // Mengubah angka murni menjadi format tampilan (1000 -> 1.000)
  const formatDisplay = (value: number) => {
    if (value === 0) return ""
    return value.toLocaleString("id-ID")
  }

  // Mengubah tampilan berformat kembali menjadi angka murni (1.000 -> 1000)
  const parseValue = (value: string) => {
    return Number(value.replace(/\./g, "")) || 0
  }

  // Format akhir untuk mata uang Rupiah
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("id-ID", { 
      style: "currency", 
      currency: "IDR", 
      maximumFractionDigits: 0 
    }).format(num)
  }

  // --- LOGIC PERHITUNGAN ---
  const calculateTotal = (items: CostItem[]) => items.reduce((acc, item) => acc + (item.cost || 0), 0)

  const totalMaterial = calculateTotal(materials)
  const totalLabor = calculateTotal(laborCosts)
  const totalOverhead = calculateTotal(overheadCosts)
  const totalProductionCost = totalMaterial + totalLabor + totalOverhead
  
  const hppPerUnit = productionQty > 0 ? totalProductionCost / productionQty : 0
  const sellingPrice = hppPerUnit + (hppPerUnit * (desiredMargin / 100))
  const profitPerUnit = sellingPrice - hppPerUnit

  // --- FUNGSI AKSI ---
  const updateItem = (
    id: string, 
    field: keyof CostItem, 
    value: string, 
    items: CostItem[], 
    setter: React.Dispatch<React.SetStateAction<CostItem[]>>
  ) => {
    const finalValue = field === 'cost' ? parseValue(value) : value
    setter(items.map(item => item.id === id ? { ...item, [field]: finalValue } : item))
  }

  const addItem = (setter: React.Dispatch<React.SetStateAction<CostItem[]>>) => {
    setter(prev => [...prev, { id: Math.random().toString(), name: '', cost: 0 }])
  }

  const removeItem = (id: string, items: CostItem[], setter: React.Dispatch<React.SetStateAction<CostItem[]>>) => {
    if (items.length > 1) setter(items.filter(item => item.id !== id))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* INPUT AREA */}
      <div className="lg:col-span-2 space-y-6">
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
                type="text" 
                id="qty" 
                value={formatDisplay(productionQty)}
                onChange={(e) => setProductionQty(parseValue(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* BIAYA BAHAN BAKU */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Biaya Bahan Baku</CardTitle>
            <Button variant="outline" size="sm" onClick={() => addItem(setMaterials)}>
              <Plus className="w-4 h-4 mr-1" /> Tambah
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {materials.map((item, index) => (
              <div key={item.id} className="flex gap-4 items-end">
                <div className="grid gap-1.5 flex-1">
                  {index === 0 && <Label>Nama Bahan</Label>}
                  <Input 
                    placeholder="Contoh: Tepung" 
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value, materials, setMaterials)}
                  />
                </div>
                <div className="grid gap-1.5 w-1/3">
                  {index === 0 && <Label>Biaya (Rp)</Label>}
                  <Input 
                    type="text"
                    value={formatDisplay(item.cost)}
                    onChange={(e) => updateItem(item.id, 'cost', e.target.value, materials, setMaterials)}
                  />
                </div>
                <Button variant="ghost" size="icon" className="text-red-500" onClick={() => removeItem(item.id, materials, setMaterials)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* TENAGA KERJA & OVERHEAD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Tenaga Kerja</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => addItem(setLaborCosts)}><Plus className="w-4 h-4" /></Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {laborCosts.map((item) => (
                <div key={item.id} className="flex gap-2">
                  <Input placeholder="Nama Gaji" value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value, laborCosts, setLaborCosts)} />
                  <Input type="text" className="w-28" value={formatDisplay(item.cost)} onChange={(e) => updateItem(item.id, 'cost', e.target.value, laborCosts, setLaborCosts)} />
                  <Button variant="ghost" size="icon" className="text-red-500" onClick={() => removeItem(item.id, laborCosts, setLaborCosts)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Overhead</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => addItem(setOverheadCosts)}><Plus className="w-4 h-4" /></Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {overheadCosts.map((item) => (
                <div key={item.id} className="flex gap-2">
                  <Input placeholder="Contoh: Gas" value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value, overheadCosts, setOverheadCosts)} />
                  <Input type="text" className="w-28" value={formatDisplay(item.cost)} onChange={(e) => updateItem(item.id, 'cost', e.target.value, overheadCosts, setOverheadCosts)} />
                  <Button variant="ghost" size="icon" className="text-red-500" onClick={() => removeItem(item.id, overheadCosts, setOverheadCosts)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* RESULT AREA */}
      <div className="lg:col-span-1">
        <Card className="sticky top-24 border-blue-200 shadow-lg bg-blue-50/50">
          <CardHeader className="bg-blue-600 text-white rounded-t-lg">
            <CardTitle>Hasil Perhitungan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">HPP per Unit</p>
              <p className="text-2xl font-bold text-blue-700">{formatCurrency(hppPerUnit)}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Margin {desiredMargin}%</Label>
              </div>
              <Input 
                type="range" min="0" max="100" step="5"
                value={desiredMargin}
                onChange={(e) => setDesiredMargin(Number(e.target.value))}
              />
            </div>

            <Separator className="bg-blue-200" />
            <div className="bg-white p-4 rounded-lg border border-blue-100 text-center">
              <p className="text-sm text-muted-foreground mb-1">Rekomendasi Harga Jual</p>
              <p className="text-3xl font-extrabold text-green-600">{formatCurrency(sellingPrice)}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600" onClick={() => window.print()}>
              <Download className="w-4 h-4 mr-2" /> Simpan PDF
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}