import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Energías renovables y energía solar | Aidcom Argentina",
  description: "Conocé las soluciones de energía solar de Aidcom para hogares, comercios y empresas, con alternativas según cada proyecto.",
}

export default function RouteLayout({ children }: { children: ReactNode }) {
  return children
}
