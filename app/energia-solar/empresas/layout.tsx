import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Energía solar para empresas | Aidcom",
  description: "Soluciones fotovoltaicas para empresas, dimensionadas según el consumo y las condiciones de cada proyecto. Consultá sistemas y presupuesto.",
}

export default function RouteLayout({ children }: { children: ReactNode }) {
  return children
}
