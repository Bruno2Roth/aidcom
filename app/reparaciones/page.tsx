"use client"

import Link from "next/link"
import {
  ArrowRight,
  Cpu,
  HardDrive,
  Laptop,
  Monitor,
  Printer,
  Settings,
  Wrench,
} from "lucide-react"

const servicios = [
  {
    icon: Laptop,
    titulo: "Notebooks y laptops",
    detalle: "Pantallas, teclados, baterías y bisagras.",
  },
  {
    icon: Monitor,
    titulo: "PC de escritorio",
    detalle: "Diagnóstico y reparación de componentes.",
  },
  {
    icon: Printer,
    titulo: "Impresoras",
    detalle: "Servicio para impresoras láser e inkjet.",
  },
  {
    icon: HardDrive,
    titulo: "Recuperación de datos",
    detalle: "Evaluación de discos, SSD y pendrives.",
  },
  {
    icon: Settings,
    titulo: "Mantenimiento",
    detalle: "Limpieza, optimización y actualización.",
  },
  {
    icon: Cpu,
    titulo: "Mejoras de equipos",
    detalle: "RAM, SSD y otros componentes.",
  },
]

export default function ReparacionesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030712] text-white">
      <section className="relative px-4 pb-14 pt-24 sm:px-6 sm:pb-20 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(249, 115, 22, 0.28) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-500/15 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300">
              <Wrench className="h-4 w-4" aria-hidden="true" />
              Servicio técnico
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Reparación de equipos
              <span className="mt-2 block bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text pb-2 text-transparent">
                informáticos
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
              Servicio técnico para notebooks, PC e impresoras en Buenos Aires.
            </p>

            <Link
              href="/contacto"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 font-semibold text-slate-950 transition hover:from-orange-400 hover:to-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
            >
              Consultar por una reparación
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="servicios-reparacion" className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 id="servicios-reparacion" className="mb-8 text-center text-2xl font-bold sm:text-3xl">
            Servicios de reparación
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map(({ icon: Icon, titulo, detalle }) => (
              <article
                key={titulo}
                className="rounded-2xl border border-orange-500/20 bg-white/[0.03] p-6 transition-colors hover:border-orange-400/40 hover:bg-orange-500/[0.06]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold">{titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{detalle}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
