import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Energía solar para hogares y comercios | Aidcom",
  description: "Sistemas fotovoltaicos para hogares, oficinas y comercios, dimensionados según el consumo y las características del lugar.",
}

export default function RouteLayout({ children }: { children: ReactNode }) {
  return children
}
