"use client";

import { useState } from "react";
import { Package, Save, CheckCircle2 } from "lucide-react";
import { updateStock } from "./actions";

export default function StockList({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  const handleInputChange = (variantId: string, value: string) => {
    setEditValues(prev => ({ ...prev, [variantId]: value }));
  };

  const handleSave = async (variantId: string) => {
    const newValStr = editValues[variantId];
    if (newValStr === undefined || newValStr === "") return;
    
    const newVal = parseFloat(newValStr);
    if (isNaN(newVal) || newVal < 0) return;

    setLoadingId(variantId);
    const result = await updateStock(variantId, newVal);
    
    if (result.success) {
      setProducts(products.map(p => ({
        ...p,
        variants: p.variants.map((v: any) => v.id === variantId ? { ...v, stockKg: newVal } : v)
      })));
      setSuccessId(variantId);
      setTimeout(() => setSuccessId(null), 2000);
      setEditValues(prev => {
        const next = { ...prev };
        delete next[variantId];
        return next;
      });
    } else {
      alert("Stok güncellenirken hata oluştu.");
    }
    setLoadingId(null);
  };

  return (
    <div className="space-y-6">
      {products.map(product => (
        <div key={product.id} className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
          <div className="bg-zinc-50 border-b border-zinc-200 p-4">
            <h3 className="font-bold text-zinc-900 flex items-center gap-2">
              <Package className="h-5 w-5 text-zinc-400" />
              {product.name}
            </h3>
          </div>
          
          <div className="divide-y divide-zinc-100">
            {product.variants.map((variant: any) => {
              const currentVal = editValues[variant.id] !== undefined ? editValues[variant.id] : variant.stockKg.toString();
              const isChanged = editValues[variant.id] !== undefined && parseFloat(editValues[variant.id]) !== variant.stockKg;
              
              return (
                <div key={variant.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-zinc-900">{variant.label} Paket</p>
                    <p className="text-xs text-zinc-500">Mevcut Stok: {variant.stockKg} kg</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={currentVal}
                      onChange={(e) => handleInputChange(variant.id, e.target.value)}
                      className="w-24 h-10 px-3 text-center border border-zinc-200 rounded-lg focus:ring-primary focus:border-primary"
                    />
                    <span className="text-xs font-medium text-zinc-500 w-6">kg</span>
                    
                    <button
                      disabled={!isChanged || loadingId === variant.id}
                      onClick={() => handleSave(variant.id)}
                      className={`h-10 px-4 rounded-lg flex items-center gap-2 font-bold text-sm transition-all ${
                        successId === variant.id 
                          ? "bg-green-100 text-green-700"
                          : isChanged 
                            ? "bg-primary text-white hover:bg-primary/90" 
                            : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                      }`}
                    >
                      {loadingId === variant.id ? (
                        <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : successId === variant.id ? (
                        <><CheckCircle2 className="h-4 w-4" /> Kaydedildi</>
                      ) : (
                        <><Save className="h-4 w-4" /> Güncelle</>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
