import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Tienda de informática y tecnología | Aidcom Argentina",
  description: "Explorá productos de informática y tecnología de Aidcom. Consultá el catálogo y la disponibilidad de cada artículo.",
}

export default function RouteLayout({ children }: { children: ReactNode }) {
  return children
}
