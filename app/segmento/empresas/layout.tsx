import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Infraestructura IT para empresas | Aidcom Argentina",
  description: "Soluciones de infraestructura IT, ciberseguridad, nube y gestión tecnológica para empresas.",
}

export default function RouteLayout({ children }: { children: ReactNode }) {
  return children
}
