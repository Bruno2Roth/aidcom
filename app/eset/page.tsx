"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Shield,
  Server,
  Smartphone,
  Cloud,
  Lock,
  Mail,
  Eye,
  CheckCircle2,
  Building2,
  Users,
  ArrowRight,
  ShieldCheck,
  Fingerprint,
  Database,
  Globe,
  Zap,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle,
} from "lucide-react"
import { useScrollNavigation } from "@/hooks/use-scroll-navigation"

const protectPlans = [
  {
    name: "ESET PROTECT Entry",
    description: "Protección lista para usar para todo tipo de endpoints",
    features: [
      "Consola de administración",
      "Protección moderna de endpoints",
      "Seguridad para servidores",
      "Antivirus de próxima generación",
      "Anti-Phishing",
      "Control de dispositivos",
    ],
    recommended: false,
  },
  {
    name: "ESET PROTECT Advanced",
    description: "Protección de endpoints y datos contra ransomware",
    features: [
      "Todo lo de Entry",
      "Defensa contra amenazas móviles",
      "Cifrado de disco completo",
      "Defensa avanzada contra amenazas",
      "Protección gratuita para móviles",
      "Sandbox en la nube",
    ],
    recommended: true,
  },
  {
    name: "ESET PROTECT Complete",
    description: "Protección multivectorial que reduce la superficie de ataque",
    features: [
      "Todo lo de Advanced",
      "Protección de aplicaciones en la nube",
      "Seguridad del servidor de correo",
      "Gestión de vulnerabilidades y parches",
      "Microsoft 365 y Google Workspace",
      "Protección de correo Exchange",
    ],
    recommended: false,
  },
  {
    name: "ESET PROTECT MDR",
    description: "Protección todo en uno con servicio MDR 24/7",
    features: [
      "Todo lo de Complete",
      "Detección y Respuesta Extendida (XDR)",
      "Servicio MDR 24/7",
      "Soporte Premium incluido",
      "Threat Intelligence",
      "ESET AI Advisor",
    ],
    recommended: false,
  },
]

const solutions = [
  {
    icon: Shield,
    title: "Protección de Endpoints",
    description:
      "Protección avanzada multicapa para computadoras y smartphones con tecnología exclusiva ESET LiveSense.",
  },
  {
    icon: Server,
    title: "Seguridad para Servidores",
    description:
      "Protección en tiempo real para los datos corporativos que viajan a través de los servidores generales.",
  },
  {
    icon: Smartphone,
    title: "Defensa Móvil",
    description: "Seguridad sólida para todos los dispositivos móviles Android e iOS dentro de la organización.",
  },
  {
    icon: Cloud,
    title: "Protección Cloud",
    description: "Protección avanzada para apps Microsoft 365 y Google Workspace con defensa proactiva.",
  },
  {
    icon: Lock,
    title: "Cifrado de Datos",
    description: "Solución de cifrado robusta para discos, particiones o dispositivos completos.",
  },
  {
    icon: Mail,
    title: "Seguridad de Correo",
    description: "Bloquea malware, spam y phishing a nivel de servidor antes de que lleguen a los usuarios.",
  },
  {
    icon: Fingerprint,
    title: "Autenticación MFA",
    description: "Autenticación multifactor que protege contra contraseñas débiles y accesos no autorizados.",
  },
  {
    icon: Eye,
    title: "XDR - Detección y Respuesta",
    description: "Capacidad para detectar amenazas, identificar comportamientos anómalos y remediar incidentes.",
  },
]

const benefits = [
  {
    icon: Zap,
    title: "Mínimo Impacto",
    description: "Bajo consumo de recursos del sistema",
  },
  {
    icon: Award,
    title: "+30 Años",
    description: "Experiencia en ciberseguridad",
  },
  {
    icon: Globe,
    title: "500K+ Clientes",
    description: "Empresas en 178 países",
  },
  {
    icon: Database,
    title: "13 Centros I+D",
    description: "Investigación global 24/7",
  },
]

const segments = [
  {
    icon: Users,
    title: "Pequeñas Empresas",
    description: "Soluciones fáciles de usar para negocios de hasta 25 dispositivos",
    features: ["Instalación simple", "Sin servidor requerido", "Consola en la nube"],
  },
  {
    icon: Building2,
    title: "Medianas Empresas",
    description: "Protección escalable para organizaciones de 26 a 250 dispositivos",
    features: ["Gestión centralizada", "Políticas personalizadas", "Reportes avanzados"],
  },
  {
    icon: Globe,
    title: "Grandes Corporaciones",
    description: "Seguridad empresarial con servicios MDR para +250 dispositivos",
    features: ["XDR avanzado", "Servicio MDR 24/7", "Threat Intelligence"],
  },
]

const faqs = [
  {
    question: "¿Puedo probar las soluciones ESET antes de comprarlas?",
    answer:
      "Sí, ofrecemos una prueba gratuita de 30 días de todas nuestras soluciones empresariales sin compromiso. Contacta con AIDCOM para solicitar tu demo.",
  },
  {
    question: "¿Cuál es la diferencia entre los niveles de ESET PROTECT?",
    answer:
      "Cada nivel incluye más capas de protección. Entry ofrece protección básica de endpoints, Advanced agrega cifrado y defensa móvil, Complete incluye protección de correo y nube, y MDR agrega servicios gestionados 24/7.",
  },
  {
    question: "¿ESET protege dispositivos móviles?",
    answer:
      "Sí, ESET ofrece protección completa para dispositivos Android e iOS, incluyendo antimalware, antirrobo y administración de dispositivos móviles (MDM).",
  },
  {
    question: "¿Qué sistemas operativos son compatibles?",
    answer:
      "ESET es compatible con Windows, Windows Server, macOS, Linux, Android e iOS. La protección cubre computadoras, servidores, tablets y smartphones.",
  },
]

export default function ESETPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
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

  return (
    <main className="overflow-hidden bg-[#030712]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0">
          {/* Radial dots pattern */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(132, 204, 22, 0.3) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Grid lines overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(132, 204, 22, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(132, 204, 22, 0.1) 1px, transparent 1px)
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
              "radial-gradient(circle, rgba(132, 204, 22, 0.8) 0%, rgba(34, 197, 94, 0.4) 40%, transparent 70%)",
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.3}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-lime-500/25 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-lime-400/40 rounded-full animate-float"
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
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-lime-500/30 to-transparent animate-shimmer" />
          <div
            className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent animate-shimmer"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        {/* Content */}
        <div
          className={`relative z-10 max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-lime-500/20 to-green-500/20 border border-lime-400/30 backdrop-blur-sm mb-8">
            <ShieldCheck className="w-4 h-4 text-lime-400" />
            <span className="text-sm font-medium text-lime-300">Partner Autorizado ESET Argentina</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Ciberseguridad
            <span className="block mt-2 bg-gradient-to-r from-lime-400 via-green-300 to-emerald-500 bg-clip-text text-transparent pb-2">
              de Próxima Generación
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-12 leading-relaxed">
            Protege tu empresa contra ransomware, phishing, amenazas de día cero y ataques dirigidos con la plataforma
            ESET PROTECT, líder mundial en ciberseguridad.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="group px-4 py-4 rounded-2xl bg-white/[0.03] border border-lime-500/20 backdrop-blur-sm transition-all duration-500 hover:bg-lime-500/10 hover:border-lime-400/40 hover:scale-105"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <benefit.icon className="w-6 h-6 text-lime-400 mx-auto mb-2" />
                <p className="text-base lg:text-lg font-bold bg-gradient-to-r from-lime-400 to-green-300 bg-clip-text text-transparent">
                  {benefit.title}
                </p>
                <p className="text-xs lg:text-sm text-white/40">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-lime-500 to-green-500 rounded-xl font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(132,204,22,0.6)]"
            >
              Solicitar cotización
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => navigateWithScroll("/eset", "planes")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-lime-500 to-emerald-500 rounded-xl font-semibold text-slate-900 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(132,204,22,0.6)]"
            >
              Ver planes
            </button>
          </div>
        </div>
      </section>

      {/* Gradient transition */}
      <div className="h-24 bg-gradient-to-b from-transparent via-lime-950/10 to-transparent" />

      {/* Solutions Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-lime-500/20 to-green-500/20 border border-lime-400/30 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-lime-400" />
              <span className="text-sm font-medium text-lime-300">Soluciones Integrales</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Protección{" "}
              <span className="bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
                Multicapa
              </span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Cada capa de seguridad trabaja en conjunto para detectar y neutralizar amenazas en todos los vectores de
              ataque.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white/[0.02] border border-lime-500/10 backdrop-blur-sm transition-all duration-500 hover:bg-lime-500/5 hover:border-lime-500/30 hover:scale-[1.02]"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-500/20 to-green-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <solution.icon className="w-6 h-6 text-lime-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{solution.title}</h3>
                <p className="text-sm text-white/50">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient transition */}
      <div className="h-24 bg-gradient-to-b from-transparent via-lime-950/10 to-transparent" />

      {/* Plans Section */}
      <section id="planes" className="relative py-24 px-4 sm:px-6 lg:px-8">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-lime-500/5 rounded-full blur-[150px]" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-lime-500/20 to-green-500/20 border border-lime-400/30 backdrop-blur-sm mb-6">
              <Shield className="w-4 h-4 text-lime-400" />
              <span className="text-sm font-medium text-lime-300">ESET PROTECT Platform</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Planes de{" "}
              <span className="bg-gradient-to-r from-lime-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
                Protección
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Elige el nivel de seguridad que mejor se adapte a las necesidades de tu organización.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-4">
            {protectPlans.map((plan, index) => (
              <div
                key={index}
                className={`group relative flex flex-col rounded-3xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 ${
                  plan.recommended
                    ? "bg-gradient-to-b from-lime-500/15 via-lime-500/10 to-green-500/5 border-2 border-lime-400/60 shadow-[0_0_60px_rgba(132,204,22,0.15)]"
                    : "bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/10 hover:border-lime-500/40 hover:shadow-[0_0_40px_rgba(132,204,22,0.1)]"
                }`}
              >
                {/* Recommended badge */}
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-6 py-2 bg-gradient-to-r from-lime-500 to-green-500 rounded-full text-sm font-bold text-white shadow-lg shadow-lime-500/30">
                      Recomendado
                    </div>
                  </div>
                )}

                {/* Card content */}
                <div className="p-8 flex flex-col flex-grow">
                  {/* Header */}
                  <div className={`${plan.recommended ? "mt-2" : ""}`}>
                    <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{plan.name}</h3>
                    <p className="text-sm text-white/50 mb-6 min-h-[40px]">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <span
                      className={`text-3xl font-bold ${plan.recommended ? "text-lime-400" : "bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent"}`}
                    >
                      Consultar Precio
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.recommended ? "bg-lime-500/20" : "bg-white/10"}`}
                        >
                          <CheckCircle2
                            className={`w-3.5 h-3.5 ${plan.recommended ? "text-lime-400" : "text-lime-400/80"}`}
                          />
                        </div>
                        <span className="text-sm text-white/70 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href="/contacto"
                    className={`group/btn relative w-full py-4 rounded-xl font-semibold text-center transition-all duration-300 overflow-hidden ${
                      plan.recommended
                        ? "bg-gradient-to-r from-lime-500 to-green-500 text-white hover:shadow-[0_0_40px_rgba(132,204,22,0.5)] hover:scale-[1.02]"
                        : "bg-white/[0.05] border border-white/20 text-white hover:bg-white/10 hover:border-lime-500/40"
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Solicitar cotización
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>

                {/* Decorative corner glow for recommended */}
                {plan.recommended && (
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-lime-500/20 rounded-full blur-3xl pointer-events-none" />
                )}
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10">
              <ShieldCheck className="w-5 h-5 text-lime-400" />
              <span className="text-sm text-white/60">Instalación sin costo</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10">
              <Award className="w-5 h-5 text-lime-400" />
              <span className="text-sm text-white/60">Soporte técnico especializado</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10">
              <Zap className="w-5 h-5 text-lime-400" />
              <span className="text-sm text-white/60">Prueba gratuita 30 días</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient transition */}
      <div className="h-24 bg-gradient-to-b from-transparent via-lime-950/10 to-transparent" />

      {/* Segments Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Soluciones por{" "}
              <span className="bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">Tamaño</span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Protección adaptada al tamaño y necesidades específicas de tu organización.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {segments.map((segment, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white/[0.02] border border-lime-500/10 backdrop-blur-sm transition-all duration-500 hover:bg-lime-500/5 hover:border-lime-500/30"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-500/20 to-green-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <segment.icon className="w-8 h-8 text-lime-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{segment.title}</h3>
                <p className="text-white/50 mb-6">{segment.description}</p>
                <ul className="space-y-2">
                  {segment.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle className="w-4 h-4 text-lime-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient transition */}
      <div className="h-24 bg-gradient-to-b from-transparent via-lime-950/10 to-transparent" />

      {/* FAQ Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Preguntas{" "}
              <span className="bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
                Frecuentes
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white/[0.02] border border-lime-500/10 overflow-hidden transition-all duration-300 hover:border-lime-500/30"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-white pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-lime-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-lime-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-white/60">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient transition */}
      <div className="h-24 bg-gradient-to-b from-transparent via-lime-950/10 to-transparent" />

      {/* CTA Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-lime-600/20 via-green-500/20 to-emerald-600/20" />
            <div className="absolute inset-0 backdrop-blur-sm" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle at center, rgba(132, 204, 22, 0.3) 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
              }}
            />
            <div className="relative p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Protege tu empresa con ESET</h2>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Contáctanos para una evaluación gratuita y descubre cómo ESET puede proteger tu negocio contra las
                amenazas modernas.
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-lime-500 to-green-500 rounded-xl font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(132,204,22,0.6)]"
              >
                Solicitar demo gratuita
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
