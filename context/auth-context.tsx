"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Usuario {
  id: string
  nombre: string
  email: string
  telefono?: string
  permisos?: {
    crearProductos: boolean
    editarProductos: boolean
    eliminarProductos: boolean
  }
  isAdmin?: boolean
}

const ADMIN_USER = {
  id: "admin-001",
  nombre: "Alejandro Hernan Roth",
  email: "Aidcom@Aidcom.com.ar",
  password: "LpErAfd",
  telefono: "+54 9 11 4416 5275",
  permisos: {
    crearProductos: true,
    editarProductos: true,
    eliminarProductos: true,
  },
  isAdmin: true,
}

interface AuthContextType {
  usuario: Usuario | null
  isLoggedIn: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  registro: (datos: { nombre: string; email: string; telefono: string; password: string }) => Promise<boolean>
  logout: () => void
  tienePermiso: (permiso: "crearProductos" | "editarProductos" | "eliminarProductos") => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("aidcom-usuario")
    if (savedUser) {
      try {
        setUsuario(JSON.parse(savedUser))
      } catch {
        setUsuario(null)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email.toLowerCase() === ADMIN_USER.email.toLowerCase() && password === ADMIN_USER.password) {
      const usuarioData: Usuario = {
        id: ADMIN_USER.id,
        nombre: ADMIN_USER.nombre,
        email: ADMIN_USER.email,
        telefono: ADMIN_USER.telefono,
        permisos: ADMIN_USER.permisos,
        isAdmin: ADMIN_USER.isAdmin,
      }
      setUsuario(usuarioData)
      localStorage.setItem("aidcom-usuario", JSON.stringify(usuarioData))
      return true
    }

    // Buscar en usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem("aidcom-usuarios") || "[]")
    const user = usuarios.find(
      (u: { email: string; password: string }) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    )

    if (user) {
      const usuarioData: Usuario = {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        telefono: user.telefono,
        permisos: user.permisos || {
          crearProductos: false,
          editarProductos: false,
          eliminarProductos: false,
        },
        isAdmin: false,
      }
      setUsuario(usuarioData)
      localStorage.setItem("aidcom-usuario", JSON.stringify(usuarioData))
      return true
    }
    return false
  }

  const registro = async (datos: {
    nombre: string
    email: string
    telefono: string
    password: string
  }): Promise<boolean> => {
    if (datos.email.toLowerCase() === ADMIN_USER.email.toLowerCase()) {
      return false
    }

    const usuarios = JSON.parse(localStorage.getItem("aidcom-usuarios") || "[]")

    if (usuarios.find((u: { email: string }) => u.email.toLowerCase() === datos.email.toLowerCase())) {
      return false
    }

    const nuevoUsuario = {
      id: Date.now().toString(),
      ...datos,
      permisos: {
        crearProductos: false,
        editarProductos: false,
        eliminarProductos: false,
      },
      isAdmin: false,
    }

    usuarios.push(nuevoUsuario)
    localStorage.setItem("aidcom-usuarios", JSON.stringify(usuarios))

    const usuarioData: Usuario = {
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      telefono: nuevoUsuario.telefono,
      permisos: nuevoUsuario.permisos,
      isAdmin: false,
    }
    setUsuario(usuarioData)
    localStorage.setItem("aidcom-usuario", JSON.stringify(usuarioData))
    return true
  }

  const logout = () => {
    setUsuario(null)
    localStorage.removeItem("aidcom-usuario")
  }

  const tienePermiso = (permiso: "crearProductos" | "editarProductos" | "eliminarProductos"): boolean => {
    if (!usuario) return false
    if (usuario.isAdmin) return true
    return usuario.permisos?.[permiso] || false
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isLoggedIn: !!usuario,
        isLoading,
        login,
        registro,
        logout,
        tienePermiso,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider")
  }
  return context
}
