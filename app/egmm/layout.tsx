import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Software EGMM para gestión y facturación electrónica | Aidcom",
  description: "Conocé EGMM, software de gestión y facturación electrónica para empresas. Consultá sus funciones y opciones de implementación.",
}

export default function RouteLayout({ children }: { children: ReactNode }) {
  return children
}
