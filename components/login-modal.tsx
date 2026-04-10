"use client"

import type React from "react"

import { useState } from "react"
import { X, User, Mail, Phone, LogIn, Loader2, Key } from "lucide-react"
import { useCliente } from "@/context/cliente-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const ADMIN_PASSWORD = "LpErAfd"

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { guardarCliente } = useCliente()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    adminPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido"
    if (!formData.email.trim()) newErrors.email = "El email es requerido"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email inválido"
    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es requerido"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    const isAdmin = formData.adminPassword === ADMIN_PASSWORD

    guardarCliente({
      nombre: formData.nombre.trim(),
      email: formData.email.trim(),
      telefono: formData.telefono.trim(),
      isAdmin,
    })

    setIsLoading(false)
    onClose()
    setFormData({ nombre: "", email: "", telefono: "", adminPassword: "" })
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Iniciar Sesión</h2>
              <p className="text-sm text-muted-foreground">Ingresá tus datos para continuar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="nombre" className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4 text-muted-foreground" />
                Nombre completo
              </Label>
              <Input
                id="nombre"
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Juan Pérez"
                className={`mt-1.5 ${errors.nombre ? "border-destructive" : ""}`}
              />
              {errors.nombre && <p className="mt-1 text-xs text-destructive">{errors.nombre}</p>}
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="juan@ejemplo.com"
                className={`mt-1.5 ${errors.email ? "border-destructive" : ""}`}
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="telefono" className="flex items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4 text-muted-foreground" />
                Teléfono
              </Label>
              <Input
                id="telefono"
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                placeholder="+54 11 1234-5678"
                className={`mt-1.5 ${errors.telefono ? "border-destructive" : ""}`}
              />
              {errors.telefono && <p className="mt-1 text-xs text-destructive">{errors.telefono}</p>}
            </div>

            <div>
              <Label
                htmlFor="adminPassword"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
              >
                <Key className="h-4 w-4" />
                Código de acceso (opcional)
              </Label>
              <Input
                id="adminPassword"
                type="password"
                value={formData.adminPassword}
                onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                placeholder="Dejá vacío si no tenés código"
                className="mt-1.5 border-border/50"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full bg-gradient-to-r from-emerald-500 to-cyan-500 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/40"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Iniciar Sesión
              </>
            )}
          </Button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Tus datos se guardan localmente para facilitar futuras compras.
          </p>
        </form>
      </div>
    </div>
  )
}
