"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  UserCheck,
  Settings,
  Monitor,
  BarChart3,
  Shield,
  LineChart,
  Code,
  Building2,
  ChevronRight,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollNavigation } from "@/hooks/use-scroll-navigation"

type Product = {
  name: string
  description: string
}

type Domain = {
  id: string
  label: string
  icon: any
  gradient: string
  products: Product[]
}

const domains: Domain[] = [
  {
    id: "identidades",
    label: "Gestión de identidades y accesos",
    icon: UserCheck,
    gradient: "from-red-500 to-orange-500",
    products: [
      { name: "ADManager Plus", description: "Gestión y reportes de Active Directory" },
      { name: "ADSelfService Plus", description: "Autoservicio de contraseñas y SSO" },
      { name: "ADAudit Plus", description: "Auditoría de cambios en tiempo real" },
      { name: "Password Manager Pro", description: "Gestión de contraseñas privilegiadas" },
      { name: "PAM360", description: "Gestión de accesos privilegiados completa" },
      { name: "Key Manager Plus", description: "Gestión de claves SSH y certificados SSL" },
    ],
  },
  {
    id: "servicios",
    label: "Gestión de servicios empresariales",
    icon: Settings,
    gradient: "from-red-600 to-red-400",
    products: [
      { name: "ServiceDesk Plus", description: "Mesa de ayuda integral con ITIL" },
      { name: "SupportCenter Plus", description: "Soporte al cliente y CRM" },
      { name: "AssetExplorer", description: "Gestión de activos de TI" },
      { name: "ServiceDesk Plus MSP", description: "Mesa de ayuda para proveedores de servicios" },
    ],
  },
  {
    id: "endpoints",
    label: "Gestión y seguridad unificada de endpoints",
    icon: Monitor,
    gradient: "from-orange-500 to-red-500",
    products: [
      { name: "Endpoint Central", description: "Gestión unificada de endpoints" },
      { name: "Patch Manager Plus", description: "Gestión automatizada de parches" },
      { name: "Mobile Device Manager Plus", description: "Gestión de dispositivos móviles" },
      { name: "Remote Access Plus", description: "Soporte remoto seguro" },
      { name: "OS Deployer", description: "Despliegue de sistemas operativos" },
      { name: "Browser Security Plus", description: "Seguridad y gestión de navegadores" },
    ],
  },
  {
    id: "operaciones",
    label: "Gestión de operaciones de TI",
    icon: BarChart3,
    gradient: "from-red-400 to-orange-400",
    products: [
      { name: "OpManager", description: "Monitoreo de red y servidores" },
      { name: "Applications Manager", description: "Monitoreo de rendimiento de aplicaciones" },
      { name: "NetFlow Analyzer", description: "Análisis de tráfico de red" },
      { name: "Network Configuration Manager", description: "Gestión de configuraciones de red" },
      { name: "Firewall Analyzer", description: "Análisis de logs de firewall" },
      { name: "Site24x7", description: "Monitoreo cloud todo en uno" },
    ],
  },
  {
    id: "seguridad",
    label: "Seguridad de la información y gestión de eventos",
    icon: Shield,
    gradient: "from-red-500 to-red-300",
    products: [
      { name: "Log360", description: "SIEM unificado con UEBA" },
      { name: "EventLog Analyzer", description: "Gestión de logs y cumplimiento" },
      { name: "DataSecurity Plus", description: "Auditoría de archivos y DLP" },
      { name: "Vulnerability Manager Plus", description: "Gestión de vulnerabilidades" },
      { name: "Cloud Security Plus", description: "Seguridad para entornos cloud" },
    ],
  },
  {
    id: "analitica",
    label: "Analítica avanzada de TI",
    icon: LineChart,
    gradient: "from-orange-400 to-red-500",
    products: [
      { name: "Analytics Plus", description: "BI y analítica para ServiceDesk Plus" },
      { name: "Zoho Analytics", description: "Plataforma de inteligencia de negocios" },
      { name: "ADManager Plus Reports", description: "Reportes avanzados de AD" },
    ],
  },
  {
    id: "desarrollo",
    label: "Desarrollo de app low-code",
    icon: Code,
    gradient: "from-red-600 to-orange-400",
    products: [
      { name: "AppCreator", description: "Plataforma de desarrollo low-code" },
      { name: "Zoho Creator", description: "Aplicaciones empresariales a medida" },
    ],
  },
  {
    id: "msp",
    label: "Gestión de TI para MSPs",
    icon: Building2,
    gradient: "from-red-500 to-orange-600",
    products: [
      { name: "RMM Central", description: "Monitoreo y gestión remota" },
      { name: "ServiceDesk Plus MSP", description: "Mesa de ayuda multi-cliente" },
      { name: "Endpoint Central MSP", description: "Gestión de endpoints multi-tenant" },
      { name: "Patch Manager Plus MSP", description: "Gestión de parches para MSPs" },
    ],
  },
]

const domainContent: Record<string, { title: string; description: string; products: Product[] }> = {
  identidades: {
    title: "Gestión de Identidades y Accesos (IAM)",
    description:
      "Soluciones completas para administrar identidades, controlar accesos y garantizar el cumplimiento de políticas de seguridad en toda la organización.",
    products: domains.find((d) => d.id === "identidades")?.products || [],
  },
  servicios: {
    title: "Gestión de Servicios Empresariales (ITSM)",
    description:
      "Plataformas de mesa de ayuda y gestión de servicios que mejoran la eficiencia operativa y la satisfacción del usuario final.",
    products: domains.find((d) => d.id === "servicios")?.products || [],
  },
  endpoints: {
    title: "Gestión Unificada de Endpoints (UEM)",
    description:
      "Administre y proteja todos los dispositivos de su organización desde una consola centralizada, incluyendo desktops, laptops, móviles y servidores.",
    products: domains.find((d) => d.id === "endpoints")?.products || [],
  },
  operaciones: {
    title: "Gestión de Operaciones de TI (ITOM)",
    description:
      "Monitoreo proactivo y gestión de la infraestructura de TI para garantizar disponibilidad, rendimiento y continuidad del negocio.",
    products: domains.find((d) => d.id === "operaciones")?.products || [],
  },
  seguridad: {
    title: "Seguridad de la Información (SIEM)",
    description:
      "Detección de amenazas, gestión de eventos de seguridad y cumplimiento normativo para proteger los activos más valiosos de su organización.",
    products: domains.find((d) => d.id === "seguridad")?.products || [],
  },
  analitica: {
    title: "Analítica Avanzada de TI",
    description:
      "Obtenga insights valiosos de sus datos de TI para tomar decisiones informadas y optimizar la operación de su infraestructura.",
    products: domains.find((d) => d.id === "analitica")?.products || [],
  },
  desarrollo: {
    title: "Desarrollo de Aplicaciones Low-Code",
    description:
      "Cree aplicaciones empresariales personalizadas sin necesidad de programación compleja, acelerando la transformación digital.",
    products: domains.find((d) => d.id === "desarrollo")?.products || [],
  },
  msp: {
    title: "Gestión de TI para MSPs",
    description:
      "Soluciones diseñadas específicamente para proveedores de servicios gestionados, con capacidades multi-tenant y facturación integrada.",
    products: domains.find((d) => d.id === "msp")?.products || [],
  },
}

const stats = [
  { value: "100+", label: "Clientes satisfechos" },
  { value: "24/7", label: "Soporte disponible" },
]

function FloatingParticles({ count = 30, color = "red" }: { count?: number; color?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => {
        const randomX = Math.random() * 100
        const randomY = Math.random() * 100
        const randomDelay = Math.random() * 5
        const randomDuration = 6 + Math.random() * 6

        return (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-float"
            style={{
              backgroundColor: color === "red" ? "rgba(239, 68, 68, 0.4)" : "rgba(96, 165, 250, 0.4)",
              left: `${randomX}%`,
              top: `${randomY}%`,
              animationDelay: `${randomDelay}s`,
              animationDuration: `${randomDuration}s`,
            }}
          />
        )
      })}
    </div>
  )
}

export default function ManageEnginePage() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const heroRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
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
              backgroundImage: `radial-gradient(circle at center, rgba(239, 68, 68, 0.3) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Grid lines overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Orb that follows the mouse */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-25 blur-[150px] transition-all duration-1000 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(239, 68, 68, 0.8) 0%, rgba(251, 146, 60, 0.4) 40%, transparent 70%)",
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.3}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Animated orbs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-red-500/25 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-amber-500/15 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Floating Particles */}
        <FloatingParticles count={30} />

        {/* Shimmer lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400 to-transparent animate-shimmer" />
          <div
            className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent animate-shimmer"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        {/* Content */}
        <div
          className={`relative z-10 max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-red-300">Partner Oficial en Argentina</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-none">
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent animate-gradient-x">
              ManageEngine
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-12 leading-relaxed">
            Soluciones integrales de gestión y seguridad TI para empresas de todos los tamaños
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group px-6 py-4 rounded-2xl bg-white/[0.03] border border-red-500/20 backdrop-blur-sm transition-all duration-500 hover:bg-red-500/10 hover:border-red-400/40 hover:scale-105"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(239,68,68,0.6)]"
            >
              Solicitar demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Button
              onClick={() => navigateWithScroll("/manageengine", "dominios")}
              variant="outline"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 h-auto bg-white/5 border-2 border-white/30 rounded-xl font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
            >
              Explorar productos
            </Button>
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section id="dominios" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4 border border-red-500/20">
              Dominios de Gestión
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Soluciones para cada área de TI</h2>
            <p className="text-white/40 max-w-2xl mx-auto">
              Selecciona un dominio para explorar los productos disponibles
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Domains Menu */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-2 p-6 rounded-2xl bg-white/[0.02] border border-red-500/10 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Dominios de Gestión</h3>
                {domains.map((domain, index) => (
                  <button
                    key={domain.id}
                    onClick={() => setSelectedDomain(domain.id)}
                    className={`group w-full flex items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm transition-all duration-300 ${
                      selectedDomain === domain.id
                        ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/40 text-white"
                        : "text-white/50 hover:bg-red-500/10 hover:text-white"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                        selectedDomain === domain.id
                          ? "bg-red-500/20"
                          : "bg-red-500/10 group-hover:bg-red-500/20"
                      }`}
                    >
                      <domain.icon
                        className={`h-4 w-4 ${selectedDomain === domain.id ? "text-red-500" : "text-white/40 group-hover:text-red-400"}`}
                      />
                    </div>
                    <span className="flex-1 line-clamp-2">{domain.label}</span>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 text-red-400 transition-all duration-300 ${
                        selectedDomain === domain.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Panel */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white/[0.02] border border-red-500/10 backdrop-blur-sm p-8 min-h-[500px]">
                {!selectedDomain ? (
                  <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mb-6">
                      <Settings className="w-12 h-12 text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Bienvenido a ManageEngine</h3>
                    <p className="text-white/40 max-w-md">
                      Explora nuestras soluciones integrales de gestión y seguridad TI. Selecciona un dominio del menú
                      para comenzar.
                    </p>
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${domains.find((d) => d.id === selectedDomain)?.gradient} flex items-center justify-center`}
                      >
                        {(() => {
                          const Icon = domains.find((d) => d.id === selectedDomain)?.icon || Settings
                          return <Icon className="w-7 h-7 text-white" />
                        })()}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{domainContent[selectedDomain].title}</h3>
                    </div>

                    <p className="text-white/50 text-lg mb-8 leading-relaxed">
                      {domainContent[selectedDomain].description}
                    </p>

                    <h4 className="text-lg font-semibold text-white mb-4">Productos disponibles:</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {domainContent[selectedDomain].products.map((product, index) => (
                        <div
                          key={index}
                          className="group p-4 rounded-xl bg-red-500/5 border border-red-500/10 transition-all duration-300 hover:bg-red-500/10 hover:border-red-400/30"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                            <div>
                              <h5 className="font-semibold text-white mb-1">{product.name}</h5>
                              <p className="text-sm text-white/40">{product.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-red-600/20 via-orange-600/10 to-red-700/20 border border-red-500/20 p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.15),transparent_70%)]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent" />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Listo para optimizar tu gestión de TI?
              </h2>
              <p className="text-white/50 mb-8 max-w-xl mx-auto">
                Contactanos para una demostración gratuita y descubrí cómo ManageEngine puede transformar tu operación.
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(239,68,68,0.5)]"
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
