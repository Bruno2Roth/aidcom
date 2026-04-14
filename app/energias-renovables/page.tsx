"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sun, Home, CheckCircle2, Zap, Leaf, Battery, Wifi, Shield, Factory, Store } from "lucide-react"
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

const segmentos = [
  {
    id: "empresas",
    title: "Empresas",
    subtitle: "Soluciones fotovoltaicas industriales",
    description:
      "Sistemas de gran escala para reducir costos operativos y aumentar la sustentabilidad corporativa. Proyectos de alta potencia con ROI garantizado.",
    icon: Factory,
    color: "violet",
    href: "/energia-solar/empresas",
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/30",
    features: [
      { title: "Alta Potencia", desc: "Instalaciones de 50kW a varios MW", icon: Zap },
      { title: "ROI Optimizado", desc: "Retorno de inversión en 3-5 años", icon: Shield },
      { title: "Inyección a Red", desc: "Generá ingresos vendiendo energía", icon: Wifi },
    ],
    benefits: [
      "Reducción de hasta 80% en costos energéticos",
      "Beneficios fiscales",
      "Imagen sustentable",
      "Soporte técnico 24/7",
    ],
  },
  {
    id: "hogar",
    title: "Hogar, Oficina y Comercio",
    subtitle: "Energía solar para el día a día",
    description:
      "Paneles solares accesibles para viviendas, oficinas y comercios. Sistemas on-grid y off-grid adaptados a tu consumo y presupuesto.",
    icon: Home,
    color: "emerald",
    href: "/energia-solar/hogar-oficina-comercio",
    gradient: "from-emerald-500 to-cyan-500",
    bgGradient: "from-emerald-500/20 to-cyan-500/20",
    borderColor: "border-emerald-500/30",
    features: [
      { title: "Ahorro Mensual", desc: "Reducí tu factura de luz hasta 100%", icon: Zap },
      { title: "Fácil Instalación", desc: "Instalación profesional en días", icon: Battery },
      { title: "Monitoreo Smart", desc: "Controlá todo desde tu celular", icon: Store },
    ],
    benefits: ["Garantía de 25 años", "Instalación incluida", "Financiación disponible", "App de monitoreo"],
  },
]

export default function EnergiasRenovablesPage() {
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

  return (
    <div className="bg-slate-950 min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(16, 185, 129, 0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
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

        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/25 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-teal-500/15 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/40 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${6 + Math.random() * 6}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-shimmer" />
          <div
            className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-shimmer"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 z-10">
          <AnimatedSection className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
              <Sun className="w-4 h-4" />
              <span>Partner Oficial Huawei FusionSolar</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="text-white">Energías </span>
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent pb-2">
                Renovables
              </span>
            </h1>

            <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto">
              Soluciones de energía inteligentes para un mundo sustentable
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-xl mx-auto">
              {[
                { value: "25+", label: "Años garantía" },
                { value: "100%", label: "Ahorro posible" },
                { value: "0", label: "Emisiones CO2" },
              ].map((stat, i) => (
                <AnimatedSection key={i} delay={i * 150}>
                  <div className="text-center">
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

      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 8px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Elegí tu{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Solución
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Tenemos soluciones de energía solar adaptadas a cada necesidad
            </p>
          </AnimatedSection>

          {/* 2 Bloques principales */}
          <div className="grid gap-8 lg:grid-cols-2">
            {segmentos.map((segmento, index) => {
              const Icon = segmento.icon
              return (
                <AnimatedSection key={segmento.id} delay={index * 200}>
                  <Link
                    href={segmento.href}
                    className={`group relative flex flex-col h-full min-h-[520px] overflow-hidden rounded-3xl border ${segmento.borderColor} bg-slate-900/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(16,185,129,0.2)]`}
                  >
                    {/* Header del bloque con imagen de fondo */}
                    <div className={`relative p-8 pb-6 bg-gradient-to-br ${segmento.bgGradient}`}>
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
                      <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br ${segmento.gradient} opacity-20 rounded-full blur-3xl`} />
                      
                      <div className="relative flex items-start justify-between">
                        <div className="flex-1">
                          <div
                            className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${segmento.gradient} shadow-xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{segmento.title}</h3>
                          <p className={`text-${segmento.color}-400 font-medium text-lg`}>{segmento.subtitle}</p>
                        </div>
                        <div
                          className={`p-3 rounded-full bg-white/10 border border-white/10 group-hover:bg-gradient-to-r ${segmento.gradient} group-hover:border-transparent transition-all duration-300`}
                        >
                          <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                      <p className="relative mt-4 text-slate-300 leading-relaxed">{segmento.description}</p>
                    </div>

                    {/* Features */}
                    <div className="flex-1 p-8 pt-6 flex flex-col">
                      <div className="grid gap-3 sm:grid-cols-3 mb-6">
                        {segmento.features.map((feature, i) => {
                          const FeatureIcon = feature.icon
                          return (
                            <div
                              key={i}
                              className={`text-center p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 group-hover:bg-slate-800 group-hover:border-${segmento.color}-500/30 transition-all duration-300`}
                            >
                              <div className={`w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-br ${segmento.gradient} flex items-center justify-center`}>
                                <FeatureIcon className="w-5 h-5 text-white" />
                              </div>
                              <h4 className="text-sm font-semibold text-white mb-1">{feature.title}</h4>
                              <p className="text-xs text-slate-400">{feature.desc}</p>
                            </div>
                          )
                        })}
                      </div>

                      {/* Benefits list */}
                      <div className="grid grid-cols-2 gap-3 mt-auto">
                        {segmento.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                            <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${segmento.gradient} flex items-center justify-center flex-shrink-0`}>
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm text-slate-300">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hover effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${segmento.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                    />
                    
                    {/* Bottom glow on hover */}
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r ${segmento.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />
                  </Link>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Huawei Partner Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950" />

        <AnimatedSection className="relative mx-auto max-w-4xl z-10">
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-8 sm:p-12 text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/images/logo-huawei2.png"
                alt="Huawei FusionSolar"
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Partner Oficial Huawei FusionSolar</h3>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Más de 30 años de experiencia en tecnologías digitales. Soluciones fotovoltaicas inteligentes con garantía
              oficial y soporte técnico especializado.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {["Residential Smart PV", "Commercial Smart PV", "Utility-Scale Solutions"].map((item, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Bottom CTA */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-slate-900" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 8px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <AnimatedSection className="relative mx-auto max-w-4xl text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" />
            <span>Energía limpia para todos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Empezá a ahorrar con energías renovables
          </h2>

          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Contactanos hoy para una evaluación gratuita de tu proyecto y descubrí cuánto podés ahorrar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
            >
              <span>Solicitar presupuesto</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="https://wa.me/5491112345678"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-800 border border-slate-700 text-white font-semibold hover:bg-slate-700 hover:border-slate-600 transition-all"
            >
              Consultar por WhatsApp
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
