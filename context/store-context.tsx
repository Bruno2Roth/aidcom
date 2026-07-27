"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { productos as productosIniciales } from "@/data/productos"

export interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  categoria: string
  sinStock?: boolean
  pocoStock?: boolean
}

export interface Categoria {
  id: string
  nombre: string
  icono: string
}

interface StoreContextType {
  productos: Producto[]
  categorias: Categoria[]
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

const categoriasIniciales: Categoria[] = [
  { id: "notebooks", nombre: "Notebooks", icono: "Laptop" },
  { id: "pcs-desktop", nombre: "PCs Desktop", icono: "Monitor" },
  { id: "monitores", nombre: "Monitores", icono: "Monitor" },
  { id: "impresoras", nombre: "Impresoras", icono: "Printer" },
  { id: "redes", nombre: "Redes", icono: "Wifi" },
  { id: "accesorios-it", nombre: "Accesorios IT", icono: "Mouse" },
  { id: "tintas-y-consumibles", nombre: "Tintas y Consumibles", icono: "Droplet" },
]

export function StoreProvider({ children }: { children: ReactNode }) {
  const [productos] = useState<Producto[]>(productosIniciales)
  const [categorias] = useState<Categoria[]>(categoriasIniciales)

  return (
    <StoreContext.Provider value={{ productos, categorias }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore debe usarse dentro de un StoreProvider")
  }
  return context
}
