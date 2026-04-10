"use client"

import type React from "react"
import Link from "next/link"
import { ArrowRight, Home, Wifi, Phone, CheckCircle2, DollarSign, Calendar, Shield } from "lucide-react"
import { useEffect, useRef, useState } from "react"

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`}
    >
      {children}
    </div>
  )
}

export default function HogarOficinaComercioPage() {
  const heroRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const beneficios = [
    {
      icon: DollarSign,
      title: "Ahorro Inmediato",
      description: "Reducí hasta 100% tu factura de luz desde el primer mes de instalación",
    },
    {
      icon: Calendar,
      title: "Instalación Rápida",
      description: "Sistema funcionando en días con instalación profesional incluida",
    },
    {
      icon: Shield,
      title: "Garantía Total",
      description: "25 años de garantía en paneles y 10 años en inversores",
    },
    {
      icon: Wifi,
      title: "Monitoreo Smart",
      description: "Controlá tu producción y consumo desde tu celular en tiempo real",
    },
  ]

  const soluciones = [
    {
      title: "Para tu Hogar",
      capacity: "3-10kW",
      description: "Ideal para viviendas unifamiliares. Eliminá tu factura de luz y valorizá tu propiedad.",
      includes: ["6-20 paneles solares", "Inversor inteligente", "App de monitoreo", "Instalación profesional"],
      price: "Desde $X.XXX.XXX",
    },
    {
      title: "Para tu Oficina",
      capacity: "10-30kW",
      description: "Reducí costos operativos y demostrá compromiso ambiental a tus clientes.",
      includes: ["20-60 paneles solares", "Inversor trifásico", "Sistema de monitoreo", "Soporte técnico"],
      price: "Desde $X.XXX.XXX",
    },
    {
      title: "Para tu Comercio",
      capacity: "15-50kW",
      description: "Optimizá tu rentabilidad con energía propia. ROI en menos de 5 años.",
      includes: ["30-100 paneles solares", "Inversores múltiples", "Gestión inteligente", "Mantenimiento incluido"],
      price: "Desde $X.XXX.XXX",
    },
  ]

  return (
    <div className="bg-slate-950 min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(16, 185, 129, 0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-25 blur-[150px] transition-all duration-1000 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.8) 0%, rgba(6, 182, 212, 0.4) 40%, transparent 70%)",
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.3}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 z-10">
          <AnimatedSection className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
              <Home className="w-4 h-4" />
              <span>Energía Solar Accesible</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="text-white">Energía Solar para </span>
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                tu Día a Día
              </span>
            </h1>

            <p className="mt-6 text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Paneles solares para hogares, oficinas y comercios. Reducí hasta 100% tu factura de luz con instalación
              profesional y financiación disponible.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
              >
                <span>Calcular Mi Ahorro</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#soluciones"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-800 border border-slate-700 text-white font-semibold hover:bg-slate-700 hover:border-slate-600 transition-all"
              >
                Ver Soluciones
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { value: "100%", label: "Ahorro posible" },
                { value: "25 años", label: "Garantía" },
                { value: "3-7 días", label: "Instalación" },
                { value: "12 cuotas", label: "Financiación" },
              ].map((stat, i) => (
                <AnimatedSection key={i} delay={i * 150}>
                  <div className="text-center p-4 rounded-xl bg-slate-900/50 border border-emerald-500/20">
                    <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        <div className="relative mx-auto max-w-7xl z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Por qué elegir energía{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                solar?
              </span>
            </h2>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {beneficios.map((beneficio, index) => {
              const Icon = beneficio.icon
              return (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="group p-6 rounded-2xl bg-slate-900/50 border border-emerald-500/20 hover:border-emerald-500/50 transition-all hover:-translate-y-2">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 w-fit mb-4">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{beneficio.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{beneficio.description}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Soluciones Section */}
      <section id="soluciones" className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-slate-950" />

        <div className="relative mx-auto max-w-7xl z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Soluciones{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Personalizadas
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Elegí el sistema ideal para tus necesidades</p>
          </AnimatedSection>

          <div className="grid gap-8 lg:grid-cols-3">
            {soluciones.map((solucion, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <div className="group h-full p-8 rounded-2xl bg-slate-900/50 border border-emerald-500/20 hover:border-emerald-500/50 transition-all hover:-translate-y-2">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{solucion.title}</h3>
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-semibold">
                      {solucion.capacity}
                    </span>
                  </div>
                  <p className="text-slate-400 mb-6 leading-relaxed">{solucion.description}</p>
                  <div className="space-y-3 mb-6">
                    {solucion.includes.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-slate-800">
                    <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      {solucion.price}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-slate-900" />

        <AnimatedSection className="relative mx-auto max-w-4xl text-center z-10">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Empezá a ahorrar hoy mismo</h2>

            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              Calculá tu ahorro y descubrí cuánto podés dejar de pagar en energía eléctrica.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
              >
                <Phone className="w-5 h-5" />
                <span>Solicitar Presupuesto</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
