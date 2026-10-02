import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Soporte IT para empresas | Servicios informáticos Aidcom",
  description: "Mantenimiento IT, redes, servidores, seguridad, backup y consultoría tecnológica para empresas. Consultá el alcance de cada servicio.",
}

export default function RouteLayout({ children }: { children: ReactNode }) {
  return children
}
