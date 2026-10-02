import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Soluciones de ciberseguridad | Aidcom Argentina",
  description: "Soluciones de seguridad para dispositivos, redes e identidades en hogares y empresas. Conocé las opciones disponibles.",
}

export default function RouteLayout({ children }: { children: ReactNode }) {
  return children
}
