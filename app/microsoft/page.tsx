"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Cloud,
  Shield,
  Users,
  Mail,
  FileText,
  Laptop,
  Building2,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Star,
  Zap,
  Globe,
  Server,
  Database,
  Headphones,
  Clock,
  TrendingUp,
  Award,
  ExternalLink,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollNavigation } from "@/hooks/use-scroll-navigation"

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
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
    return () => clearInterval(timer)
  }, [isVisible, end, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const products = [
  {
    icon: Cloud,
    title: "Microsoft 365",
    description: "Suite completa de productividad con Word, Excel, PowerPoint, Teams y más aplicaciones en la nube.",
    features: ["Word, Excel, PowerPoint", "Microsoft Teams", "OneDrive 1TB", "Outlook empresarial"],
  },
  {
    icon: Shield,
    title: "Microsoft Defender",
    description: "Protección avanzada contra amenazas para endpoints, identidades, correo y aplicaciones cloud.",
    features: ["Protección endpoints", "Seguridad de identidad", "Anti-phishing", "Detección de amenazas"],
  },
  {
    icon: Server,
    title: "Azure",
    description: "Plataforma de nube empresarial para hosting, bases de datos, IA y servicios de infraestructura.",
    features: ["Máquinas virtuales", "Bases de datos", "Servicios de IA", "Backup y recuperación"],
  },
  {
    icon: Users,
    title: "Windows Server",
    description: "Sistema operativo de servidor para gestión de redes, Active Directory y servicios empresariales.",
    features: ["Active Directory", "Hyper-V", "File Server", "Remote Desktop"],
  },
  {
    icon: Mail,
    title: "Exchange Online",
    description: "Correo empresarial con calendario, contactos y gestión de comunicaciones unificadas.",
    features: ["Correo 50GB+", "Calendario compartido", "Anti-spam avanzado", "Archivado ilimitado"],
  },
  {
    icon: FileText,
    title: "Windows 11 Pro",
    description: "Sistema operativo empresarial con seguridad avanzada y herramientas de productividad.",
    features: ["BitLocker", "Windows Hello", "Escritorio remoto", "Hyper-V"],
  },
]

const plans = [
  {
    name: "Business Basic",
    description: "Para pequeñas empresas que necesitan aplicaciones web y colaboración",
    features: ["Versiones web de Office", "Microsoft Teams", "OneDrive 1TB", "Exchange Online", "SharePoint"],
    highlighted: false,
    icon: Laptop,
  },
  {
    name: "Business Standard",
    description: "Suite completa con aplicaciones de escritorio y servicios en la nube",
    features: [
      "Apps de escritorio completas",
      "Microsoft Teams premium",
      "OneDrive 1TB",
      "Exchange Online",
      "Webinars y eventos",
      "Microsoft Bookings",
    ],
    highlighted: true,
    icon: Star,
  },
  {
    name: "Business Premium",
    description: "Productividad y seguridad avanzada para empresas que requieren protección",
    features: [
      "Todo de Business Standard",
      "Microsoft Defender",
      "Intune MDM",
      "Azure AD Premium",
      "Protección de información",
      "Windows 11 Business",
    ],
    highlighted: false,
    icon: Shield,
  },
]

const segments = [
  {
    icon: Laptop,
    title: "Pequeñas Empresas",
    description: "Soluciones accesibles para equipos de hasta 300 usuarios.",
    href: "/contacto",
    stats: "Hasta 300 usuarios",
  },
  {
    icon: Building2,
    title: "Empresas Medianas",
    description: "Microsoft 365 Enterprise con seguridad y cumplimiento.",
    href: "/contacto",
    stats: "Escalable sin límites",
  },
  {
    icon: GraduationCap,
    title: "Educación",
    description: "Licenciamiento académico para instituciones educativas.",
    href: "/contacto",
    stats: "Precios especiales",
  },
]

const benefits = [
  {
    icon: Zap,
    title: "Productividad",
    description: "Acceso desde cualquier lugar",
  },
  {
    icon: Shield,
    title: "Seguridad",
    description: "Defender integrado",
  },
  {
    icon: Globe,
    title: "Colaboración",
    description: "Teams hasta 10,000 usuarios",
  },
  {
    icon: Database,
    title: "1TB Storage",
    description: "OneDrive por usuario",
  },
]

const faqs = [
  {
    question: "¿Qué incluye una licencia de Microsoft 365?",
    answer:
      "Dependiendo del plan, incluye acceso a aplicaciones de Office (Word, Excel, PowerPoint), correo empresarial con Exchange, almacenamiento en OneDrive, Microsoft Teams para colaboración, y herramientas de seguridad.",
  },
  {
    question: "¿Puedo migrar mi correo actual a Microsoft 365?",
    answer:
      "Sí, realizamos migraciones completas desde cualquier plataforma de correo hacia Microsoft 365. El proceso incluye migración de correos, contactos, calendarios y configuración de dispositivos.",
  },
  {
    question: "¿Qué es Azure y para qué lo necesito?",
    answer:
      "Azure es la plataforma de nube de Microsoft que permite alojar servidores virtuales, bases de datos, aplicaciones web, backup en la nube y servicios de inteligencia artificial.",
  },
  {
    question: "¿Ofrecen soporte técnico para productos Microsoft?",
    answer:
      "Sí, como partners de Microsoft brindamos soporte técnico completo: configuración, resolución de problemas, actualizaciones y optimización de la plataforma.",
  },
]

export default function MicrosoftPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)
  const { navigateWithScroll } = useScrollNavigation()

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

  const scrollToProducts = () => {
    document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="overflow-hidden bg-[#030712]">
      {/* Hero Section - Same style as ESET */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0">
          {/* Radial dots pattern */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(0, 164, 239, 0.3) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Grid lines overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 164, 239, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 164, 239, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Animated orbs */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-25 blur-[150px] transition-all duration-1000 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 164, 239, 0.8) 0%, rgba(0, 120, 212, 0.4) 40%, transparent 70%)",
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.3}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-sky-500/25 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-sky-400/40 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${6 + Math.random() * 6}s`,
              }}
            />
          ))}
        </div>

        {/* Animated lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent animate-shimmer" />
          <div
            className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-shimmer"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        {/* Floating Microsoft logo */}
        <div
          className="absolute top-1/4 right-[15%] w-20 h-20 opacity-20 hidden lg:block animate-float"
          style={{ animationDuration: "8s" }}
        >
          <div className="grid grid-cols-2 gap-1.5 w-full h-full">
            <div className="bg-[#f25022] rounded" />
            <div className="bg-[#7fba00] rounded" />
            <div className="bg-[#00a4ef] rounded" />
            <div className="bg-[#ffb900] rounded" />
          </div>
        </div>

        {/* Content */}
        <div
          className={`relative z-10 max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Partner badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500/20 to-blue-500/20 border border-sky-400/30 backdrop-blur-sm mb-8">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span className="text-sm font-medium text-sky-300">Partner Autorizado Microsoft</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Microsoft 365
            <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              & Azure
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-4 leading-relaxed">
            Licenciamiento empresarial, Windows Server y soluciones de productividad.
          </p>
          <p className="text-base text-white/40 max-w-xl mx-auto mb-10">
            Potenciá tu empresa con las herramientas líderes en el mundo.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-6 text-base font-medium border-0"
            >
              <Link href="/contacto">
                Solicitar Cotización
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button
              onClick={scrollToProducts}
              size="lg"
              variant="outline"
              className="border-sky-400/30 text-white hover:bg-sky-500/10 bg-transparent px-8 py-6 text-base"
            >
              Ver Productos
            </Button>
          </div>

          {/* Stats grid - same style as ESET */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {benefits.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-sky-400" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                  <p className="text-xs text-white/40">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="productos" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030712]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Catálogo de Soluciones</h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Licenciamiento y servicios Microsoft para empresas de todos los tamaños
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-sky-500/30 hover:bg-white/[0.04]"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center mb-5">
                  <product.icon className="h-6 w-6 text-sky-400" />
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{product.title}</h3>
                <p className="text-sm text-white/40 mb-5 leading-relaxed">{product.description}</p>

                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-white/50">
                      <CheckCircle className="h-3.5 w-3.5 text-sky-500/60" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050810]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Planes Microsoft 365</h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Cada plan está diseñado para diferentes necesidades empresariales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl border p-6 transition-all duration-300 ${
                  plan.highlighted
                    ? "border-sky-500/50 bg-sky-500/5"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full text-xs font-medium text-white">
                    Recomendado
                  </div>
                )}

                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                  <plan.icon className={`h-5 w-5 ${plan.highlighted ? "text-sky-400" : "text-white/60"}`} />
                </div>

                <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-white/40 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-2xl font-bold text-white">Consultar</span>
                  <span className="text-xs text-white/30 ml-2">/ usuario / mes</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-white/60">
                      <CheckCircle className="h-4 w-4 text-sky-500 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white border-0"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  }`}
                >
                  <Link href="/contacto">Solicitar Cotización</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segments */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030712]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Soluciones por Segmento</h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Planes adaptados a las necesidades de cada tipo de organización
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {segments.map((segment, index) => (
              <Link
                key={index}
                href={segment.href}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center transition-all duration-300 hover:border-sky-500/30 hover:bg-white/[0.04]"
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex items-center justify-center mx-auto mb-5">
                  <segment.icon className="h-7 w-7 text-sky-400" />
                </div>
                <span className="inline-block px-2 py-1 rounded-full bg-white/5 text-[10px] font-medium text-white/50 mb-3">
                  {segment.stats}
                </span>
                <h3 className="text-lg font-semibold text-white mb-2">{segment.title}</h3>
                <p className="text-sm text-white/40">{segment.description}</p>
                <div className="mt-4 flex items-center justify-center gap-1 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                  Más info <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050810]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-medium text-white/60 mb-6">
                <Award className="h-3.5 w-3.5 text-sky-400" />
                ¿Por qué elegirnos?
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Partner Oficial con +20 años de experiencia
              </h2>
              <p className="text-white/40 mb-8 leading-relaxed">
                Como partners autorizados de Microsoft en Argentina, ofrecemos licenciamiento oficial, soporte técnico
                especializado y precios competitivos.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Headphones, text: "Soporte técnico local 24/7" },
                  { icon: TrendingUp, text: "Consultoría gratuita" },
                  { icon: Clock, text: "Activación inmediata" },
                  { icon: Shield, text: "Productos oficiales" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-sky-400" />
                    </div>
                    <span className="text-sm text-white/60">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 500, suffix: "+", label: "Empresas" },
                { value: 15000, suffix: "+", label: "Licencias" },
                { value: 98, suffix: "%", label: "Satisfacción" },
                { value: 4, suffix: "h", label: "Respuesta" },
              ].map((stat, index) => (
                <div key={index} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
                  <div className="text-3xl font-bold text-sky-400 mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030712]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Preguntas Frecuentes</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-white text-sm pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-white/40 transition-transform duration-300 flex-shrink-0 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? "max-h-48" : "max-h-0"
                  }`}
                >
                  <div className="px-5 pb-5">
                    <p className="text-sm text-white/40 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050810]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">¿Listo para potenciar tu empresa?</h2>
          <p className="text-white/40 mb-10 max-w-xl mx-auto">
            Contactanos para recibir asesoramiento personalizado y una cotización adaptada a tus necesidades.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-6 border-0"
            >
              <Link href="/contacto">
                Solicitar Cotización
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-sky-400/30 text-white hover:bg-sky-500/10 bg-transparent px-8 py-6"
            >
              <a
                href="https://api.whatsapp.com/send/?phone=5491149988089&text=Hola,%20me%20interesa%20información%20sobre%20Microsoft%20365"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
