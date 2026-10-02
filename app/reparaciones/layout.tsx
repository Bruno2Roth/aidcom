import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Reparación de PC, notebooks e impresoras | Aidcom",
  description: "Servicio técnico para PC, notebooks e impresoras. Revisá las categorías de reparación y consultá el alcance del servicio.",
}

export default function RouteLayout({ children }: { children: ReactNode }) {
  return children
}
