"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import {
  Building2,
  Server,
  Shield,
  Headphones,
  Phone,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Network,
  Database,
  Cloud,
  Lock,
  BarChart3,
  Cpu,
  Users,
  Zap,
  Clock,
  Award,
  MessageCircle,
  Factory,
  Landmark,
  ShoppingBag,
  Stethoscope,
} from "lucide-react"

const useInView = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

function FloatingParticles({ count = 30 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-violet-400/40 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
          }}
        />
      ))}
    </div>
  )
}

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const increment = end / (duration / 16)
          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function EmpresasPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const heroRef = useRef<HTMLElement>(null)
  const casosRef = useInView()
  const serviciosRef = useInView()
  const solucionesRef = useInView()
  const statsRef = useInView()
  const ctaRef = useInView()

  useEffect(() => {
    setIsVisible(true)
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

  const servicios = [
    {
      icon: Server,
      title: "Infraestructura IT",
      desc: "Diseño, implementación y gestión de infraestructura tecnológica de alta disponibilidad para operaciones críticas.",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      icon: Shield,
      title: "Ciberseguridad",
      desc: "Protección integral de datos y sistemas con soluciones de seguridad empresarial de última generación.",
      gradient: "from-red-500 to-rose-600",
    },
    {
      icon: Cloud,
      title: "Soluciones Cloud",
      desc: "Migración, gestión y optimización de servicios en la nube con arquitecturas escalables.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Headphones,
      title: "Soporte 24/7",
      desc: "Mesa de ayuda y soporte técnico continuo para garantizar la continuidad de tu negocio.",
      gradient: "from-emerald-500 to-teal-500",
    },
  ]

  const soluciones = [
    {
      icon: Network,
      title: "Redes y Conectividad",
      items: ["Diseño de redes LAN/WAN", "WiFi empresarial", "VPN y acceso remoto", "Cableado estructurado"],
    },
    {
      icon: Database,
      title: "Servidores y Storage",
      items: [
        "Servidores físicos y virtuales",
        "Almacenamiento SAN/NAS",
        "Backup y recuperación",
        "Alta disponibilidad",
      ],
    },
    {
      icon: Lock,
      title: "Seguridad Avanzada",
      items: ["Firewalls y UTM", "Antivirus empresarial", "DLP y encriptación", "Auditorías de seguridad"],
    },
    {
      icon: BarChart3,
      title: "Gestión IT",
      items: ["Monitoreo de infraestructura", "Gestión de activos", "Help Desk", "ITIL y mejores prácticas"],
    },
  ]

  const casosDeUso = [
    {
      icon: Factory,
      title: "Industria",
      desc: "Automatización, control de procesos y sistemas SCADA para plantas industriales.",
      features: ["Redes industriales", "Servidores críticos", "Backup 24/7"],
      gradient: "from-orange-500 to-amber-600",
      image: "/industrial-factory-tech.jpg",
    },
    {
      icon: Landmark,
      title: "Finanzas",
      desc: "Infraestructura segura para bancos, aseguradoras y entidades financieras.",
      features: ["Ciberseguridad", "Compliance", "Alta disponibilidad"],
      gradient: "from-emerald-500 to-teal-600",
      image: "/financial-office-tech.jpg",
    },
    {
      icon: Stethoscope,
      title: "Salud",
      desc: "Sistemas de historia clínica, conectividad hospitalaria y telemedicina.",
      features: ["HIPAA compliant", "Redes seguras", "Backup médico"],
      gradient: "from-sky-500 to-blue-600",
      image: "/healthcare-technology.jpg",
    },
    {
      icon: ShoppingBag,
      title: "Retail",
      desc: "Soluciones de punto de venta, inventario y comercio electrónico.",
      features: ["POS integrado", "ERP conectado", "Soporte continuo"],
      gradient: "from-pink-500 to-rose-600",
      image: "/retail-store-technology.jpg",
    },
  ]

  const proceso = [
    { step: "01", title: "Diagnóstico", desc: "Analizamos tu infraestructura actual", icon: BarChart3 },
    { step: "02", title: "Propuesta", desc: "Diseñamos la solución ideal", icon: Cpu },
    { step: "03", title: "Implementación", desc: "Ejecutamos con mínimo impacto", icon: Zap },
    { step: "04", title: "Soporte", desc: "Acompañamiento continuo 24/7", icon: Headphones },
  ]

  return (
    <div className="overflow-hidden bg-slate-950">
      {/* Hero con imagen */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center px-4 py-20 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Fondos y efectos */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

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
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/25 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <FloatingParticles count={30} />

        <div className="relative mx-auto max-w-7xl w-full z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido */}
            <div
              className={`transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <Link
                href="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
                className="inline-flex items-center gap-2 text-violet-400 hover:text-purple-400 transition-colors mb-6"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                <span>Volver al inicio</span>
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-xl shadow-violet-500/30">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-400">
                  <Sparkles className="h-4 w-4" />
                  Soluciones Corporativas
                </span>
              </div>

              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Tecnología para{" "}
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Grandes Empresas
                </span>
              </h1>
              <p className="mt-6 text-xl text-white/60 max-w-xl leading-relaxed">
                Infraestructura IT de alta disponibilidad, ciberseguridad avanzada y soporte especializado 24/7 para
                operaciones críticas. Partner oficial de ManageEngine para Latinoamérica.
              </p>

              {/* Mini stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                {[
                  { value: "500+", label: "Empresas" },
                  { value: "24/7", label: "Soporte" },
                  { value: "99.9%", label: "Uptime" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-3 text-center backdrop-blur-sm"
                  >
                    <div className="text-xl font-bold text-violet-400">{stat.value}</div>
                    <div className="text-xs text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/servicios-informaticos"
                  onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
                  className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-violet-500/25"
                >
                  <Cpu className="h-5 w-5" />
                  <span>Ver Servicios IT</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contacto"
                  onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
                  className="group inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/10"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Contactar</span>
                </Link>
              </div>
            </div>

            {/* Imagen */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/20 border border-white/10">
                <Image
                  src="/corporate-data-center.jpg"
                  alt="Centro de datos corporativo"
                  width={600}
                  height={500}
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Floating cards */}
                <div className="absolute top-4 right-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-3 flex items-center gap-3 shadow-xl">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">ISO 27001</p>
                    <p className="text-white/60 text-xs">Seguridad certificada</p>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-3 flex items-center gap-3 shadow-xl">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Partner Oficial</p>
                    <p className="text-white/60 text-xs">ManageEngine LATAM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Casos de Uso por Industria */}
      <section
        ref={casosRef.ref as React.RefObject<HTMLElement>}
        className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-violet-950/10 to-slate-950" />

        <div className="relative mx-auto max-w-7xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${casosRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-400 mb-4">
              <Users className="h-4 w-4" />
              Industrias
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Soluciones por{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Sector
              </span>
            </h2>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              Experiencia comprobada en múltiples industrias con requerimientos específicos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {casosDeUso.map((caso, index) => {
              const IconComponent = caso.icon
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-violet-500/30 hover:-translate-y-2 ${casosRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Imagen */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={caso.image || "/placeholder.svg"}
                      alt={caso.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${caso.gradient} opacity-60`} />
                    <div className="absolute top-4 left-4">
                      <div
                        className={`h-12 w-12 rounded-xl bg-gradient-to-br ${caso.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2">{caso.title}</h3>
                    <p className="text-sm text-white/50 mb-4 leading-relaxed">{caso.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {caso.features.map((feature, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section
        ref={serviciosRef.ref as React.RefObject<HTMLElement>}
        className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />

        <div className="relative mx-auto max-w-7xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${serviciosRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Servicios{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Empresariales
              </span>
            </h2>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              Soluciones IT integrales diseñadas para las exigencias del mundo corporativo
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {servicios.map((servicio, index) => {
              const IconComponent = servicio.icon
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.05] hover:-translate-y-2 ${serviciosRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${servicio.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{servicio.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{servicio.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Áreas de Especialización */}
      <section
        ref={solucionesRef.ref as React.RefObject<HTMLElement>}
        className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-violet-950/10 to-slate-950" />

        <div className="relative mx-auto max-w-7xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${solucionesRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Áreas de{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Especialización
              </span>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {soluciones.map((solucion, index) => {
              const IconComponent = solucion.icon
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.05] ${solucionesRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 transition-all duration-300 group-hover:from-violet-500/30 group-hover:to-purple-500/30">
                    <IconComponent className="h-6 w-6 text-violet-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{solucion.title}</h3>
                  <ul className="space-y-2">
                    {solucion.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/50">
                        <CheckCircle className="h-4 w-4 text-violet-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Proceso de Trabajo */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-400 mb-4">
              <Clock className="h-4 w-4" />
              Proceso
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Cómo{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Trabajamos
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {proceso.map((paso, index) => {
              const IconComponent = paso.icon
              return (
                <div key={index} className="relative text-center">
                  {/* Línea conectora */}
                  {index < proceso.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-violet-500/50 to-transparent" />
                  )}

                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 mb-4 relative">
                    <IconComponent className="h-8 w-8 text-violet-400" />
                    <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 text-white text-xs font-bold flex items-center justify-center">
                      {paso.step.replace("0", "")}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{paso.title}</h3>
                  <p className="text-sm text-white/50">{paso.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        ref={statsRef.ref as React.RefObject<HTMLElement>}
        className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-violet-950/20 to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[150px]" />

        <div className="relative mx-auto max-w-5xl">
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-6 ${statsRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"} transition-all duration-1000`}
          >
            {[
              { value: 500, suffix: "+", label: "Empresas Confían", icon: Building2 },
              { value: 15, suffix: "+", label: "Años de Experiencia", icon: Award },
              { value: 50, suffix: "+", label: "Técnicos Certificados", icon: Users },
              { value: 99, suffix: ".9%", label: "Uptime Garantizado", icon: Zap },
            ].map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={index}
                  className="relative rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6 text-center backdrop-blur-sm overflow-hidden group hover:border-violet-500/40 transition-all duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <IconComponent className="h-8 w-8 text-violet-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section
        ref={ctaRef.ref as React.RefObject<HTMLElement>}
        className="relative px-4 py-24 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-violet-950/10 to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-[150px]" />

        <div
          className={`relative mx-auto max-w-4xl text-center transition-all duration-1000 ${ctaRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
        >
          <div className="rounded-3xl border border-violet-500/20 bg-violet-500/5 backdrop-blur-xl p-10 lg:p-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-400 mb-6">
              <Sparkles className="h-4 w-4" />
              Consultoría sin cargo
            </span>

            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl mb-4">
              ¿Listo para potenciar tu{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                infraestructura
              </span>
              ?
            </h2>
            <p className="text-white/60 mb-8 text-lg max-w-2xl mx-auto">
              Nuestro equipo de expertos está listo para ayudarte a diseñar la solución perfecta para tu empresa.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <a
                href="https://wa.me/5493517410586?text=Hola!%20Quiero%20información%20sobre%20soluciones%20IT%20para%20empresas"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-violet-500/25"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Contactar por WhatsApp</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="tel:+5493517410586"
                className="group inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                <span>Llamanos</span>
              </a>
            </div>

            {/* Badges de confianza */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: Clock, text: "Respuesta en 24hs" },
                { icon: CheckCircle, text: "Sin compromiso" },
                { icon: Award, text: "+15 años de experiencia" },
              ].map((badge, i) => {
                const IconComponent = badge.icon
                return (
                  <div key={i} className="flex items-center gap-2 text-sm text-white/50">
                    <IconComponent className="h-4 w-4 text-violet-400" />
                    {badge.text}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
