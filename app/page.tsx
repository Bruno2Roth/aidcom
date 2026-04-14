"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import {
  ShoppingCart,
  Cpu,
  Sun,
  Wrench,
  Shield,
  Award,
  Users,
  Headphones,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Server,
  Cloud,
  Zap,
  Lock,
  Monitor,
  Laptop,
  HardDrive,
  Wifi,
  Settings,
  TrendingUp,
  Clock,
  ThumbsUp,
  Truck,
  Home,
  CheckCircle2,
  Building2,
  Database,
  Battery,
  Package,
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
          className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-float"
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

const segmentosPrincipales = [
  {
    id: "hogar",
    title: "Hogar, Oficina y Comercio",
    subtitle: "Tecnología accesible para todos",
    description:
      "Equipamiento informático completo, redes WiFi, notebooks, computadoras y periféricos. Todo lo que necesitás para tu hogar, oficina o comercio.",
    icon: Home,
    gradient: "from-cyan-400 to-teal-500",
    bgGradient: "from-cyan-600/90 via-teal-700/85 to-slate-900/95",
    borderColor: "border-cyan-400/40",
    glowColor: "rgba(6,182,212,0.3)",
    href: "/segmento/hogar-oficina-comercio",
    image: "/images/tech-store.jpg",
    features: [
      { title: "Equipamiento", desc: "PCs y notebooks última generación", icon: Zap },
      { title: "Conectividad", desc: "Redes WiFi profesionales", icon: Settings },
      { title: "Soporte Smart", desc: "Asistencia técnica remota", icon: Home },
    ],
    benefits: ["Envío a todo el país", "Garantía oficial", "Financiación disponible", "Soporte técnico 24/7"],
    // </CHANGE>
  },
  {
    id: "empresas",
    title: "Empresas",
    subtitle: "Soluciones corporativas a gran escala",
    description:
      "Infraestructura IT de alto rendimiento, ciberseguridad empresarial, servidores dedicados, cloud computing y proyectos tecnológicos de gran envergadura.",
    icon: Building2,
    gradient: "from-indigo-400 to-violet-500",
    bgGradient: "from-indigo-600/90 via-violet-700/85 to-slate-900/95",
    borderColor: "border-indigo-400/40",
    glowColor: "rgba(99,102,241,0.3)",
    href: "/segmento/empresas",
    image: "/images/office-team.jpg",
    features: [
      { title: "Infraestructura IT", desc: "Servidores y soluciones escalables", icon: Zap },
      { title: "ROI Optimizado", desc: "Reducción de costos operativos", icon: Shield },
      { title: "Cloud Computing", desc: "Soluciones en la nube enterprise", icon: Wifi },
    ],
    benefits: [
      "Reducción de hasta 40% en costos IT",
      "Consultoría especializada",
      "Proyectos llave en mano",
      "Soporte técnico 24/7",
    ],
    // </CHANGE>
  },
]

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  const contactoRef = useInView()
  const segmentosRef = useInView()
  const partnersRef = useInView()

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

  const serviciosCore = [
    {
      icon: ShoppingCart,
      title: "Tienda Online",
      href: "https://www.mercadolibre.com.ar/pagina/aidcom",
      description: "Hardware, software y accesorios tecnológicos",
      gradient: "from-amber-500 to-orange-600",
      borderColor: "border-amber-500/30",
      hoverBorder: "hover:border-amber-400/60",
    },
    {
      icon: Cpu,
      title: "Servicios IT",
      href: "/servicios-informaticos",
      description: "Infraestructura y soporte técnico empresarial",
      gradient: "from-violet-500 to-purple-600",
      borderColor: "border-violet-500/30",
      hoverBorder: "hover:border-violet-400/60",
    },
    {
      icon: Sun,
      title: "Energías Renovables",
      href: "/energias-renovables",
      description: "Soluciones renovables para hogares y empresas",
      gradient: "from-emerald-500 to-green-600",
      borderColor: "border-emerald-500/30",
      hoverBorder: "hover:border-emerald-400/60",
    },
    {
      icon: Wrench,
      title: "Reparaciones",
      href: "/reparaciones",
      description: "Servicio técnico especializado",
      gradient: "from-sky-500 to-cyan-600",
      borderColor: "border-sky-500/30",
      hoverBorder: "hover:border-sky-400/60",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center overflow-hidden bg-slate-950 pt-0 pb-4"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div
            className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-30 transition-all duration-1000 ease-out"
            style={{
              background: "radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)",
              left: `${mousePosition.x * 0.3}%`,
              top: `${mousePosition.y * 0.3}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-[100px] animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-teal-500/15 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: "5s", animationDelay: "2s" }}
          />
        </div>

        <FloatingParticles count={40} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
          <div
            className={`text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-white/70">Soluciones tecnológicas de excelencia</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
              Tecnología Integral
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">
                para Hogares y Empresas
              </span>
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Desde equipamiento informático hasta energía solar, brindamos soluciones completas en toda Argentina
            </p>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {segmentosPrincipales.map((segmento, index) => {
                const Icon = segmento.icon
                return (
                  <Link
                    key={segmento.id}
                    href={segmento.href}
                    className={`group relative block overflow-hidden rounded-3xl border-2 ${segmento.borderColor} transition-all duration-500 hover:-translate-y-2 text-left h-[420px]`}
                    style={{
                      boxShadow: `0 20px 60px ${segmento.glowColor}`,
                    }}
                  >
                    {/* Imagen de fondo */}
                    <div className="absolute inset-0">
                      <Image
                        src={segmento.image || "/placeholder.svg"}
                        alt={segmento.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${segmento.bgGradient}`} />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                    </div>

                    {/* Contenido */}
                    <div className="relative h-full flex flex-col justify-between p-6 sm:p-7">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`inline-flex p-3.5 rounded-2xl bg-gradient-to-br ${segmento.gradient} shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                          >
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div
                            className={`p-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white group-hover:text-white transition-all duration-300`}
                          >
                            <ArrowRight className="w-5 h-5 text-white" />
                          </div>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                          {segmento.title}
                        </h3>
                        <p className="text-white/80 font-medium text-sm mb-3">{segmento.subtitle}</p>
                        <p className="text-white/70 text-sm leading-relaxed line-clamp-2">{segmento.description}</p>
                      </div>

                      <div>
                        <div className="grid grid-cols-3 gap-2.5 mb-4">
                          {segmento.features.map((feature, i) => {
                            const FeatureIcon = feature.icon
                            return (
                              <div
                                key={i}
                                className="text-center p-2.5 rounded-xl bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-colors border border-white/10"
                              >
                                <FeatureIcon className="w-4 h-4 mx-auto mb-1 text-white" />
                                <h4 className="text-[11px] font-semibold text-white mb-0.5 leading-tight">
                                  {feature.title}
                                </h4>
                                <p className="text-[9px] text-white/70 leading-tight">{feature.desc}</p>
                              </div>
                            )
                          })}
                        </div>

                        <div className="grid grid-cols-2 gap-1.5">
                          {segmento.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <CheckCircle2
                                className={`w-3.5 h-3.5 flex-shrink-0 ${segmento.id === "hogar" ? "text-cyan-400" : "text-indigo-400"}`}
                              />
                              <span className="text-[11px] text-white/90">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${segmento.gradient}`}
                    />
                  </Link>
                )
              })}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
              {serviciosCore.map((service, i) => {
                const IconComponent = service.icon
                return (
                  <Link
                    key={i}
                    href={service.href}
                    className={`group relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 backdrop-blur-md border border-slate-700/50 transition-all duration-500 hover:-translate-y-1`}
                    style={{
                      boxShadow: "0 4px 24px -4px rgba(0,0,0,0.3), inset 0 1px 0 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    {/* Subtle gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`}
                    />
                    
                    {/* Top accent line */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${service.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                    />

                    <div className="relative z-10 p-6 sm:p-7">
                      {/* Icon container with refined styling */}
                      <div className="flex justify-center mb-5">
                        <div
                          className={`relative p-4 rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                          style={{
                            boxShadow: `0 8px 32px -8px ${service.gradient.includes('amber') ? 'rgba(245,158,11,0.4)' : service.gradient.includes('violet') ? 'rgba(139,92,246,0.4)' : service.gradient.includes('emerald') ? 'rgba(16,185,129,0.4)' : 'rgba(14,165,233,0.4)'}`,
                          }}
                        >
                          <IconComponent className="w-6 h-6 text-white" strokeWidth={2} />
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="font-semibold text-white text-center text-base sm:text-lg mb-2 tracking-tight">
                        {service.title}
                      </h4>
                      
                      {/* Description */}
                      <p className="text-slate-400 text-center text-sm leading-relaxed">
                        {service.description}
                      </p>

                      {/* Subtle arrow indicator */}
                      <div className="flex justify-center mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className={`flex items-center gap-1.5 text-xs font-medium bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                          <span>Explorar</span>
                          <ArrowRight className="w-3.5 h-3.5" style={{ color: service.gradient.includes('amber') ? '#f59e0b' : service.gradient.includes('violet') ? '#8b5cf6' : service.gradient.includes('emerald') ? '#10b981' : '#0ea5e9' }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-12 bg-slate-950 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Envío nacional", desc: "A toda Argentina" },
              { icon: Clock, title: "Soporte 24/7", desc: "Siempre disponibles" },
              { icon: ThumbsUp, title: "Garantía oficial", desc: "Respaldo total" },
              { icon: TrendingUp, title: "+30 años", desc: "De experiencia" },
            ].map((item, i) => {
              const IconComponent = item.icon
              return (
                <div key={i} className="flex items-center gap-3 p-3">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                    <p className="text-white/50 text-xs">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Por qué elegirnos Section */}
      <section
        ref={segmentosRef.ref as React.RefObject<HTMLElement>}
        id="porque-elegirnos"
        className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Section header */}
          <div
            className={`text-center mb-16 transition-all duration-700 ${segmentosRef.isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Nosotros</span>
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Quiénes{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Somos</span>
            </h2>
            <p className="mt-6 text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              Con más de 30 años de experiencia en el mercado argentino, somos líderes en soluciones tecnológicas
              integrales. Nuestro compromiso es brindar servicios de excelencia que impulsen el crecimiento de nuestros
              clientes.
            </p>
          </div>

          {/* Benefits grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Experiencia Comprobada",
                description:
                  "Más de tres décadas en el mercado tecnológico argentino nos respaldan con miles de clientes satisfechos.",
                stat: "+30 años",
                color: "from-amber-400 to-yellow-400",
              },
              {
                title: "Soporte Técnico Real",
                description:
                  "Equipo técnico propio disponible para resolver cualquier inconveniente de forma rápida y efectiva.",
                stat: "24/7",
                color: "from-cyan-400 to-blue-400",
              },
              {
                title: "Garantía Oficial",
                description:
                  "Todos nuestros productos cuentan con garantía oficial del fabricante y respaldo de Aidcom.",
                stat: "100%",
                color: "from-emerald-400 to-teal-400",
              },
              {
                title: "Envío a Todo el País",
                description:
                  "Llegamos a cada rincón de Argentina con envíos seguros y tiempos de entrega garantizados.",
                stat: "Nacional",
                color: "from-orange-400 to-amber-400",
              },
              {
                title: "Partners Certificados",
                description: "Distribuidor autorizado de Microsoft, Adobe, ESET, Manage Engine, Canon, Toshiba y otras marcas líderes mundiales.",
                stat: "+10 marcas",
                color: "from-blue-400 to-cyan-400",
              },
              {
                title: "Soluciones Integrales",
                description:
                  "Desde hardware hasta energías renovables, cubrimos todas las necesidades tecnológicas de tu empresa.",
                stat: "360°",
                color: "from-yellow-400 to-amber-400",
              },
            ].map((benefit, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 border border-slate-700/50 hover:border-slate-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${segmentosRef.isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
              >
                <div className="p-6 relative z-10">
                  {/* Stat badge at top */}
                  <div className="mb-4">
                    <span
                      className={`inline-block text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${benefit.color}`}
                    >
                      {benefit.stat}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {benefit.description}
                  </p>
                </div>

                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Bottom accent line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className={`text-center mt-12 transition-all duration-700 delay-500 ${segmentosRef.isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              <span>Contactanos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section
        ref={partnersRef.ref as React.RefObject<HTMLElement>}
        id="partners"
        className="relative py-24 bg-slate-900 overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Section header */}
          <div
            className={`text-center mb-16 transition-all duration-700 ${partnersRef.isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-sm font-medium text-teal-400">Partners Oficiales</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Trabajamos con los{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">mejores</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Alianzas estratégicas con líderes mundiales en tecnología
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Lenovo",
                desc: "Hardware & Servidores",
                badge: "Partner",
                color: "text-red-400",
              },
              {
                name: "Microsoft",
                desc: "365 & Azure",
                badge: "Distribuidor",
                color: "text-blue-400",
              },
              {
                name: "ESET",
                desc: "Ciberseguridad",
                badge: "Partner Silver",
                color: "text-emerald-400",
              },
              {
                name: "EGMM",
                desc: "Sistemas de Gestión - Facturación Electronica",
                badge: "Distribuidor",
                color: "text-amber-400",
              },
            ].map((partner, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50"
              >
                <div className="relative">
                  {/* Badge */}
                  <span className={`text-[10px] uppercase tracking-wider ${partner.color} font-medium`}>
                    {partner.badge}
                  </span>

                  {/* Name & Description */}
                  <h4 className="text-xl font-bold text-white mt-3 mb-1">
                    {partner.name}
                  </h4>
                  <p className="text-white/40 text-sm">{partner.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </>
  )
}
