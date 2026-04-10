"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Shield,
  ShieldCheck,
  Lock,
  Eye,
  Server,
  AlertTriangle,
  Fingerprint,
  Cpu,
  ArrowRight,
  CheckCircle,
  FileText,
  Users,
  Network,
} from "lucide-react"
import { useScrollNavigation } from "@/hooks/use-scroll-navigation"

const categories = [
  { id: "antivirus", label: "Antivirus y Malware", icon: Shield, gradient: "from-blue-500 to-cyan-500" },
  { id: "empresarial", label: "Seguridad Empresarial", icon: Server, gradient: "from-blue-600 to-blue-400" },
  { id: "endpoints", label: "Protección de Endpoints", icon: Eye, gradient: "from-cyan-500 to-blue-500" },
  { id: "redes", label: "Seguridad de Redes", icon: Network, gradient: "from-blue-400 to-cyan-400" },
  { id: "identidades", label: "Gestión de Identidades", icon: Fingerprint, gradient: "from-blue-500 to-blue-300" },
  { id: "hogar", label: "Seguridad para el Hogar", icon: ShieldCheck, gradient: "from-cyan-400 to-blue-500" },
  { id: "movil", label: "Seguridad Móvil", icon: Users, gradient: "from-blue-600 to-cyan-400" },
  { id: "cloud", label: "Seguridad en la Nube", icon: Cpu, gradient: "from-blue-500 to-cyan-600" },
]

const categoryContent: Record<string, { title: string; description: string; features: string[] }> = {
  antivirus: {
    title: "Antivirus y Protección contra Malware",
    description:
      "Soluciones avanzadas de detección y eliminación de amenazas para proteger sus sistemas contra virus, ransomware, spyware y otras formas de malware.",
    features: [
      "Detección de malware en tiempo real con tecnología multicapa",
      "Protección contra ransomware y cifrado de archivos",
      "Análisis heurístico para detectar amenazas desconocidas",
      "Actualizaciones automáticas de firmas de virus",
      "Escaneo programado y bajo demanda",
      "Protección contra phishing y sitios web maliciosos",
    ],
  },
  empresarial: {
    title: "Seguridad Empresarial",
    description:
      "Soluciones integrales diseñadas para proteger la infraestructura corporativa, desde pequeñas empresas hasta grandes corporaciones.",
    features: [
      "Consola de administración centralizada",
      "Protección para servidores Windows y Linux",
      "Gestión de políticas de seguridad",
      "Reportes detallados y auditoría",
      "Integración con Active Directory",
      "Soporte técnico prioritario",
    ],
  },
  endpoints: {
    title: "Protección de Endpoints",
    description:
      "Seguridad avanzada para todos los dispositivos conectados a su red, incluyendo estaciones de trabajo, laptops y dispositivos móviles.",
    features: [
      "Control de dispositivos USB y periféricos",
      "Cifrado de discos y archivos",
      "Prevención de pérdida de datos (DLP)",
      "Gestión de parches y actualizaciones",
      "Control de aplicaciones",
      "Monitoreo de comportamiento",
    ],
  },
  redes: {
    title: "Seguridad de Redes",
    description:
      "Protección perimetral y segmentación de red para defender su infraestructura contra intrusiones y ataques externos.",
    features: [
      "Firewall de próxima generación",
      "Detección y prevención de intrusiones (IDS/IPS)",
      "VPN segura para acceso remoto",
      "Análisis de tráfico de red",
      "Protección contra ataques DDoS",
      "Segmentación de red y microsegmentación",
    ],
  },
  identidades: {
    title: "Gestión de Identidades",
    description:
      "Control de acceso y autenticación para garantizar que solo usuarios autorizados accedan a los recursos de la empresa.",
    features: [
      "Autenticación multifactor (MFA)",
      "Single Sign-On (SSO)",
      "Gestión de contraseñas empresarial",
      "Control de acceso basado en roles (RBAC)",
      "Auditoría de accesos",
      "Gestión de identidades privilegiadas (PIM)",
    ],
  },
  hogar: {
    title: "Seguridad para el Hogar",
    description:
      "Protección completa para dispositivos personales y familiares, manteniendo seguros a todos los miembros del hogar.",
    features: [
      "Protección para múltiples dispositivos",
      "Control parental avanzado",
      "Protección de privacidad en línea",
      "Gestor de contraseñas integrado",
      "Protección de webcam y micrófono",
      "Navegación segura para niños",
    ],
  },
  movil: {
    title: "Seguridad Móvil",
    description: "Protección especializada para smartphones y tablets, tanto Android como iOS.",
    features: [
      "Antivirus y antimalware móvil",
      "Protección antirrobo y localización",
      "Navegación segura en redes públicas",
      "Bloqueo de aplicaciones",
      "Auditoría de permisos de apps",
      "Protección de datos personales",
    ],
  },
  cloud: {
    title: "Seguridad en la Nube",
    description:
      "Protección para infraestructuras cloud y aplicaciones SaaS, garantizando la seguridad de sus datos en cualquier lugar.",
    features: [
      "Protección para Microsoft 365 y Google Workspace",
      "Seguridad para AWS, Azure y GCP",
      "CASB (Cloud Access Security Broker)",
      "Cifrado de datos en tránsito y reposo",
      "Monitoreo de actividad en la nube",
      "Cumplimiento normativo cloud",
    ],
  },
}

const products = [
  {
    icon: Shield,
    title: "ESET NOD32 Antivirus",
    description: "Protección básica contra malware y virus.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Lock,
    title: "ESET Home Security",
    description: "Protección completa para su vida digital.",
    gradient: "from-blue-600 to-blue-400",
  },
  {
    icon: ShieldCheck,
    title: "ManageEngine",
    description: "Gestión y seguridad unificada de endpoints.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Eye,
    title: "ESET PROTECT",
    description: "Soluciones de seguridad para empresas.",
    gradient: "from-blue-400 to-cyan-400",
  },
]

const stats = [
  { value: "99.9%", label: "Tasa de detección" },
  { value: "24/7", label: "Monitoreo activo" },
  { value: "+500", label: "Empresas protegidas" },
  { value: "<1min", label: "Tiempo de respuesta" },
]

export default function SeguridadPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
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
              backgroundImage: `radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Grid lines overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
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
              "radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(6, 182, 212, 0.4) 40%, transparent 70%)",
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.3}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/25 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-indigo-500/15 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-float"
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
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-shimmer" />
          <div
            className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-shimmer"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        {/* Content */}
        <div
          className={`relative z-10 max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 backdrop-blur-sm mb-8">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Partner Oficial ESET & ManageEngine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Soluciones de
            <span className="block mt-2 bg-gradient-to-r from-blue-500 via-cyan-300 to-blue-500 bg-clip-text text-transparent pb-2">
              Seguridad
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-12 leading-relaxed">
            Protección integral para empresas y usuarios con las mejores soluciones del mercado
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group px-6 py-4 rounded-2xl bg-white/[0.03] border border-blue-500/20 backdrop-blur-sm transition-all duration-500 hover:bg-blue-500/10 hover:border-blue-400/40 hover:scale-105"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(59,130,246,0.6)]"
            >
              Solicitar consultoría
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => navigateWithScroll("/seguridad", "categorias")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/[0.03] border border-blue-500/20 rounded-xl font-semibold text-white transition-all duration-300 hover:bg-blue-500/10 backdrop-blur-sm"
            >
              Explorar soluciones
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categorias" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4 border border-blue-500/20">
              Categorías
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Protección para cada necesidad</h2>
            <p className="text-white/40 max-w-2xl mx-auto">
              Selecciona una categoría para explorar nuestras soluciones especializadas
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Categories Menu */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-2 p-6 rounded-2xl bg-white/[0.02] border border-blue-500/10 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Categorías de Seguridad</h3>
                {categories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`group w-full flex items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/40 text-white"
                        : "text-white/50 hover:bg-blue-500/10 hover:text-white"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        activeCategory === category.id
                          ? `bg-gradient-to-br ${category.gradient}`
                          : "bg-blue-500/10 group-hover:bg-blue-500/20"
                      }`}
                    >
                      <category.icon
                        className={`h-4 w-4 ${activeCategory === category.id ? "text-white" : "text-blue-400"}`}
                      />
                    </div>
                    <span className="flex-1">{category.label}</span>
                    <ArrowRight
                      className={`w-4 h-4 text-blue-400 transition-all duration-300 ${
                        activeCategory === category.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Panel */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white/[0.02] border border-blue-500/10 backdrop-blur-sm p-8 min-h-[500px]">
                {!activeCategory ? (
                  <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-6">
                      <Shield className="w-12 h-12 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Bienvenido a Soluciones de Seguridad</h3>
                    <p className="text-white/40 max-w-md">
                      Explora nuestras soluciones que combinan la potencia de ESET y ManageEngine. Selecciona una
                      categoría del menú para comenzar.
                    </p>
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${categories.find((c) => c.id === activeCategory)?.gradient} flex items-center justify-center`}
                      >
                        {(() => {
                          const Icon = categories.find((c) => c.id === activeCategory)?.icon || Shield
                          return <Icon className="w-7 h-7 text-white" />
                        })()}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{categoryContent[activeCategory].title}</h3>
                    </div>

                    <p className="text-white/50 text-lg mb-8 leading-relaxed">
                      {categoryContent[activeCategory].description}
                    </p>

                    <h4 className="text-lg font-semibold text-white mb-4">Características principales:</h4>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {categoryContent[activeCategory].features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 transition-all duration-300 hover:bg-blue-500/10 hover:border-blue-400/30"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-white/60">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-blue-950/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4 border border-blue-500/20">
              Productos
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Productos Destacados</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="group relative rounded-2xl bg-white/[0.02] border border-blue-500/10 p-6 transition-all duration-500 hover:bg-blue-500/10 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.2)] hover:border-blue-400/30"
              >
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}
                />

                <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${product.gradient} p-[1px] mb-5`}>
                  <div className="w-full h-full rounded-xl bg-[#030712] flex items-center justify-center">
                    <product.icon className="w-7 h-7 text-blue-400" />
                  </div>
                </div>

                <h3 className="relative text-lg font-bold text-white mb-2">{product.title}</h3>
                <p className="relative text-sm text-white/40">{product.description}</p>

                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: AlertTriangle, title: "Alto Rendimiento", description: "Mínimo impacto en el sistema" },
              { icon: FileText, title: "Detección en la Nube", description: "Protección actualizada en tiempo real" },
              { icon: Users, title: "Soporte Local", description: "Asistencia técnica en español" },
              { icon: Lock, title: "Encriptación", description: "Protección de datos sensibles" },
            ].map((feature, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-2xl bg-white/[0.02] border border-blue-500/10 transition-all duration-500 hover:bg-blue-500/10 hover:border-blue-400/30 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-4 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/40">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-blue-600/20 via-cyan-600/10 to-blue-700/20 border border-blue-500/20 p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Listo para proteger tu empresa?</h2>
              <p className="text-white/50 mb-8 max-w-xl mx-auto">
                Contactanos para una evaluación gratuita de seguridad y descubrí cómo podemos ayudarte.
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(59,130,246,0.5)]"
              >
                Solicitar evaluación gratuita
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
