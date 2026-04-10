"use client"

import type React from "react"
import Link from "next/link"
import { ArrowRight, Factory, Shield, TrendingUp, Users, Award, Phone, CheckCircle2 } from "lucide-react"
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

export default function EmpresasEnergiaSolarPage() {
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
      icon: TrendingUp,
      title: "ROI Garantizado",
      description: "Retorno de inversión en 3-5 años con ahorros de hasta 80% en costos energéticos",
    },
    {
      icon: Shield,
      title: "Estabilidad Energética",
      description: "Protección contra aumentos tarifarios y garantía de suministro continuo",
    },
    {
      icon: Award,
      title: "Imagen Corporativa",
      description: "Fortalecé tu compromiso con la sustentabilidad y responsabilidad social",
    },
    {
      icon: Users,
      title: "Soporte Dedicado",
      description: "Equipo técnico especializado disponible 24/7 para tu empresa",
    },
  ]

  const sistemas = [
    {
      title: "Sistemas On-Grid",
      power: "50kW - 500kW",
      description: "Conexión a red con inyección de excedentes. Ideal para reducir costos operativos.",
      features: ["Venta de energía excedente", "Sin baterías requeridas", "Mantenimiento mínimo"],
    },
    {
      title: "Sistemas Off-Grid",
      power: "100kW - 1MW+",
      description: "Autonomía energética total con respaldo de baterías industriales.",
      features: ["Independencia energética", "Backup automático", "Control total del consumo"],
    },
    {
      title: "Sistemas Híbridos",
      power: "200kW - 2MW+",
      description: "Combinación de red y baterías para máxima eficiencia y respaldo.",
      features: ["Mejor de ambos mundos", "Gestión inteligente", "Máxima flexibilidad"],
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
            backgroundImage: `radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-25 blur-[150px] transition-all duration-1000 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(168, 85, 247, 0.4) 40%, transparent 70%)",
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.3}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/15 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 z-10">
          <AnimatedSection className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-8">
              <Factory className="w-4 h-4" />
              <span>Soluciones Industriales</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="text-white">Energía Solar para </span>
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                Empresas
              </span>
            </h1>

            <p className="mt-6 text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Reducí hasta 80% tus costos energéticos con sistemas fotovoltaicos de alta potencia. ROI garantizado en
              3-5 años con soporte técnico especializado.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]"
              >
                <span>Solicitar Evaluación</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#sistemas"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-800 border border-slate-700 text-white font-semibold hover:bg-slate-700 hover:border-slate-600 transition-all"
              >
                Ver Soluciones
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { value: "50kW-2MW", label: "Capacidad" },
                { value: "3-5 años", label: "ROI" },
                { value: "80%", label: "Ahorro" },
                { value: "24/7", label: "Soporte" },
              ].map((stat, i) => (
                <AnimatedSection key={i} delay={i * 150}>
                  <div className="text-center p-4 rounded-xl bg-slate-900/50 border border-violet-500/20">
                    <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
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
              ¿Por qué elegir energía solar{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                industrial?
              </span>
            </h2>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {beneficios.map((beneficio, index) => {
              const Icon = beneficio.icon
              return (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="group p-6 rounded-2xl bg-slate-900/50 border border-violet-500/20 hover:border-violet-500/50 transition-all hover:-translate-y-2">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 w-fit mb-4">
                      <Icon className="w-6 h-6 text-violet-400" />
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

      {/* Sistemas Section */}
      <section id="sistemas" className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-slate-950" />

        <div className="relative mx-auto max-w-7xl z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Sistemas{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Fotovoltaicos
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Soluciones adaptadas a las necesidades de tu empresa
            </p>
          </AnimatedSection>

          <div className="grid gap-8 lg:grid-cols-3">
            {sistemas.map((sistema, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <div className="group h-full p-8 rounded-2xl bg-slate-900/50 border border-violet-500/20 hover:border-violet-500/50 transition-all hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{sistema.title}</h3>
                    <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-sm font-semibold">
                      {sistema.power}
                    </span>
                  </div>
                  <p className="text-slate-400 mb-6 leading-relaxed">{sistema.description}</p>
                  <div className="space-y-3">
                    {sistema.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
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
          <div className="p-12 rounded-3xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/30">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Transformá tu empresa con energía solar
            </h2>

            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              Contactanos hoy para una evaluación técnica gratuita y descubrí cuánto puede ahorrar tu empresa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]"
              >
                <Phone className="w-5 h-5" />
                <span>Contactar Ahora</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
