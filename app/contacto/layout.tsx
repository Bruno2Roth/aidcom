import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Contacto y horarios de atención | Aidcom Argentina",
  description: "Encontrá los canales de contacto, horarios y ubicación de Aidcom para consultas sobre tecnología, servicios IT y energía solar.",
}

export default function RouteLayout({ children }: { children: ReactNode }) {
  return children
}
