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
}

export interface Categoria {
  id: string
  nombre: string
  icono: string
}

interface StoreContextType {
  productos: Producto[]
  categorias: Categoria[]
  agregarProducto: (producto: Omit<Producto, "id">) => void
  editarProducto: (id: number, producto: Partial<Producto>) => void
  eliminarProducto: (id: number) => void
  agregarCategoria: (categoria: Omit<Categoria, "id">) => void
  editarCategoria: (id: string, categoria: Partial<Categoria>) => void
  eliminarCategoria: (id: string) => void
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
  const [productos, setProductos] = useState<Producto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar datos desde localStorage o usar los iniciales
  useEffect(() => {
    const savedProductos = localStorage.getItem("aidcom-productos")
    const savedCategorias = localStorage.getItem("aidcom-categorias")

    if (savedProductos) {
      try {
        setProductos(JSON.parse(savedProductos))
      } catch {
        setProductos(productosIniciales)
      }
    } else {
      setProductos(productosIniciales)
    }

    if (savedCategorias) {
      try {
        setCategorias(JSON.parse(savedCategorias))
      } catch {
        setCategorias(categoriasIniciales)
      }
    } else {
      setCategorias(categoriasIniciales)
    }

    setIsLoaded(true)
  }, [])

  // Guardar en localStorage cuando cambien
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("aidcom-productos", JSON.stringify(productos))
    }
  }, [productos, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("aidcom-categorias", JSON.stringify(categorias))
    }
  }, [categorias, isLoaded])

  const agregarProducto = (producto: Omit<Producto, "id">) => {
    const newId = Math.max(...productos.map((p) => p.id), 0) + 1
    setProductos((prev) => [...prev, { ...producto, id: newId }])
  }

  const editarProducto = (id: number, productoActualizado: Partial<Producto>) => {
    setProductos((prev) => prev.map((p) => (p.id === id ? { ...p, ...productoActualizado } : p)))
  }

  const eliminarProducto = (id: number) => {
    setProductos((prev) => prev.filter((p) => p.id !== id))
  }

  const agregarCategoria = (categoria: Omit<Categoria, "id">) => {
    const id = categoria.nombre.toLowerCase().replace(/\s+/g, "-")
    setCategorias((prev) => [...prev, { ...categoria, id }])
  }

  const editarCategoria = (id: string, categoriaActualizada: Partial<Categoria>) => {
    setCategorias((prev) => prev.map((c) => (c.id === id ? { ...c, ...categoriaActualizada } : c)))
  }

  const eliminarCategoria = (id: string) => {
    setCategorias((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <StoreContext.Provider
      value={{
        productos,
        categorias,
        agregarProducto,
        editarProducto,
        eliminarProducto,
        agregarCategoria,
        editarCategoria,
        eliminarCategoria,
      }}
    >
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
