"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface ClienteInfo {
  nombre: string
  email: string
  telefono: string
  direccion?: string
  ciudad?: string
  codigoPostal?: string
  isAdmin?: boolean // Agregado campo para guardar estado de admin
}

interface ClienteContextType {
  cliente: ClienteInfo | null
  isLoaded: boolean
  guardarCliente: (info: ClienteInfo) => void
  actualizarCliente: (info: Partial<ClienteInfo>) => void
  limpiarCliente: () => void
  tieneInfoCompleta: boolean
}

const ClienteContext = createContext<ClienteContextType | undefined>(undefined)

const STORAGE_KEY = "aidcom-cliente-info"

export function ClienteProvider({ children }: { children: ReactNode }) {
  const [cliente, setCliente] = useState<ClienteInfo | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar información del cliente desde localStorage
  useEffect(() => {
    const savedCliente = localStorage.getItem(STORAGE_KEY)
    if (savedCliente) {
      try {
        setCliente(JSON.parse(savedCliente))
      } catch {
        setCliente(null)
      }
    }
    setIsLoaded(true)
  }, [])

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    if (isLoaded && cliente) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cliente))
    }
  }, [cliente, isLoaded])

  const guardarCliente = (info: ClienteInfo) => {
    setCliente(info)
  }

  const actualizarCliente = (info: Partial<ClienteInfo>) => {
    setCliente((prev) => {
      if (!prev) {
        return {
          nombre: info.nombre || "",
          email: info.email || "",
          telefono: info.telefono || "",
          direccion: info.direccion,
          ciudad: info.ciudad,
          codigoPostal: info.codigoPostal,
          isAdmin: info.isAdmin,
        }
      }
      return { ...prev, ...info }
    })
  }

  const limpiarCliente = () => {
    setCliente(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const tieneInfoCompleta = Boolean(cliente?.nombre?.trim() && cliente?.email?.trim() && cliente?.telefono?.trim())

  return (
    <ClienteContext.Provider
      value={{
        cliente,
        isLoaded,
        guardarCliente,
        actualizarCliente,
        limpiarCliente,
        tieneInfoCompleta,
      }}
    >
      {children}
    </ClienteContext.Provider>
  )
}

export function useCliente() {
  const context = useContext(ClienteContext)
  if (context === undefined) {
    throw new Error("useCliente debe usarse dentro de un ClienteProvider")
  }
  return context
}
