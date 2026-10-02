import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "ManageEngine: soluciones de gestión IT | Aidcom",
  description: "Explorá soluciones ManageEngine para monitoreo, gestión de servicios IT y administración de infraestructura.",
}

export default function RouteLayout({ children }: { children: ReactNode }) {
  return children
}
