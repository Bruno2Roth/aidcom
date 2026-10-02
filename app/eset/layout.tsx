import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "ESET: soluciones de ciberseguridad | Aidcom",
  description: "Conocé las soluciones ESET para proteger dispositivos, servidores y datos. Consultá las licencias y opciones disponibles.",
}

export default function RouteLayout({ children }: { children: ReactNode }) {
  return children
}
