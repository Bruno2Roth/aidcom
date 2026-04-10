"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  categoria: string
}

export interface ItemCarrito {
  producto: Producto
  cantidad: number
}

interface CartContextType {
  items: ItemCarrito[]
  agregarAlCarrito: (producto: Producto, cantidad?: number) => void
  quitarDelCarrito: (productoId: number) => void
  actualizarCantidad: (productoId: number, cantidad: number) => void
  vaciarCarrito: () => void
  totalItems: number
  totalPrecio: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("aidcom-carrito")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch {
        setItems([])
      }
    }
    setIsLoaded(true)
  }, [])

  // Guardar carrito en localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("aidcom-carrito", JSON.stringify(items))
    }
  }, [items, isLoaded])

  const agregarAlCarrito = (producto: Producto, cantidad = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.producto.id === producto.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.producto.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item,
        )
      }
      return [...prevItems, { producto, cantidad }]
    })
  }

  const quitarDelCarrito = (productoId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.producto.id !== productoId))
  }

  const actualizarCantidad = (productoId: number, cantidad: number) => {
    if (cantidad <= 0) {
      quitarDelCarrito(productoId)
      return
    }
    setItems((prevItems) => prevItems.map((item) => (item.producto.id === productoId ? { ...item, cantidad } : item)))
  }

  const vaciarCarrito = () => {
    setItems([])
  }

  const totalItems = items.reduce((total, item) => total + item.cantidad, 0)
  const totalPrecio = items.reduce((total, item) => total + item.producto.precio * item.cantidad, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        agregarAlCarrito,
        quitarDelCarrito,
        actualizarCantidad,
        vaciarCarrito,
        totalItems,
        totalPrecio,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart debe usarse dentro de un CartProvider")
  }
  return context
}
