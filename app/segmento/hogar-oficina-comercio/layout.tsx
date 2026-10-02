import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Computadoras y tecnología para hogares y comercios | Aidcom",
  description: "Computadoras, notebooks, impresoras, insumos y conectividad para hogares, oficinas y comercios. Consultá productos y disponibilidad.",
}

export default function RouteLayout({ children }: { children: ReactNode }) {
  return children
}
