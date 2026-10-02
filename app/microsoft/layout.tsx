import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Microsoft 365 y Azure para empresas | Aidcom",
  description: "Conocé opciones de Microsoft 365, Azure y Windows Server para productividad, nube y administración IT.",
}

export default function RouteLayout({ children }: { children: ReactNode }) {
  return children
}
