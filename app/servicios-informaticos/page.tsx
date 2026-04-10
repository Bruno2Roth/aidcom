"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Wrench,
  Network,
  Server,
  Shield,
  Database,
  Users,
  CheckCircle2,
  Monitor,
  Wifi,
  HardDrive,
  Lock,
  Headphones,
  Zap,
  Cpu,
  ChevronRight,
  Sparkles,
  Cloud,
  Settings,
  Laptop,
  Globe,
} from "lucide-react"
import { useScrollNavigation } from "@/hooks/use-scroll-navigation"

const stats = [
  { value: "500+", label: "Empresas atendidas" },
  { value: "99.9%", label: "Uptime garantizado" },
  { value: "24/7", label: "Soporte técnico" },
  { value: "30+", label: "Años de experiencia" },
]

const categories = [
  { id: "mantenimiento", label: "Mantenimiento IT", icon: Wrench, gradient: "from-blue-500 to-cyan-500" },
  { id: "redes", label: "Redes y Conexión", icon: Network, gradient: "from-orange-500 to-amber-500" },
  { id: "servidores", label: "Servidores", icon: Server, gradient: "from-emerald-500 to-teal-500" },
  { id: "seguridad", label: "Seguridad IT", icon: Shield, gradient: "from-rose-500 to-pink-500" },
  { id: "backup", label: "Backup y Recuperación", icon: Database, gradient: "from-amber-500 to-orange-500" },
  { id: "consultoria", label: "Consultoría IT", icon: Users, gradient: "from-orange-500 to-amber-500" },
]

const categoryContent: Record<string, { title: string; description: string; features: string[] }> = {
  mantenimiento: {
    title: "Mantenimiento Informático",
    description:
      "Garantizamos que todos los equipos de tu empresa funcionen de manera óptima y sin interrupciones, con planes personalizados de mantenimiento preventivo y correctivo.",
    features: [
      "Limpieza de hardware y optimización de software",
      "Actualización de sistemas operativos y drivers",
      "Diagnóstico y reemplazo de componentes",
      "Recuperación de datos en caso de fallas",
      "Planes de mantenimiento mensuales y anuales",
      "Tiempo de respuesta garantizado",
    ],
  },
  redes: {
    title: "Redes y Conexión",
    description:
      "Diseño, instalación y configuración de redes LAN, WiFi y WAN para una comunicación eficiente y segura en toda tu organización.",
    features: [
      "Cableado estructurado cat 5e, 6 y 6a",
      "Switches y routers empresariales",
      "Redes WiFi de alto rendimiento",
      "Segmentación mediante VLANs",
      "VPNs para trabajo remoto seguro",
      "Monitoreo continuo de red",
    ],
  },
  servidores: {
    title: "Servidores Empresariales",
    description:
      "Implementación, configuración y mantenimiento de servidores físicos y virtuales adaptados a las necesidades específicas de tu empresa.",
    features: [
      "Windows Server y distribuciones Linux",
      "Active Directory y políticas GPO",
      "Servidores de archivos compartidos",
      "Virtualización con VMware/Hyper-V",
      "Servidores de correo y bases de datos",
      "Migración y actualización de sistemas",
    ],
  },
  seguridad: {
    title: "Seguridad Informática",
    description:
      "Soluciones integrales de ciberseguridad que protegen tu negocio contra todo tipo de amenazas digitales modernas.",
    features: [
      "Firewalls de última generación",
      "Sistemas de detección IDS/IPS",
      "Antivirus empresarial ESET",
      "Protección contra ransomware",
      "Análisis de vulnerabilidades",
      "Capacitación en seguridad para empleados",
    ],
  },
  backup: {
    title: "Backup y Recuperación",
    description:
      "Soluciones robustas de respaldo que garantizan la protección y recuperación rápida de tu información crítica.",
    features: [
      "Backup local en dispositivos NAS",
      "Backup en la nube con encriptación",
      "Estrategias de backup híbrido",
      "Backup de máquinas virtuales",
      "Políticas de retención personalizadas",
      "Pruebas periódicas de recuperación",
    ],
  },
  consultoria: {
    title: "Consultoría IT",
    description:
      "Servicios de consultoría especializada para ayudarte a tomar las mejores decisiones tecnológicas para tu negocio.",
    features: [
      "Análisis completo de infraestructura",
      "Identificación de oportunidades de mejora",
      "Planes de acción personalizados",
      "Selección de tecnología adecuada",
      "Estrategias de transformación digital",
      "Optimización de costos operativos",
    ],
  },
}

const products = [
  {
    icon: Monitor,
    title: "Workstations",
    description: "Equipos de alto rendimiento",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Server,
    title: "Servidores",
    description: "Infraestructura empresarial",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: Wifi,
    title: "Networking",
    description: "Conectividad profesional",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: HardDrive,
    title: "Storage",
    description: "Almacenamiento escalable",
    gradient: "from-amber-500 to-orange-500",
  },
  { icon: Shield, title: "Seguridad", description: "Protección integral", gradient: "from-rose-500 to-pink-500" },
  { icon: Cloud, title: "Cloud", description: "Soluciones en la nube", gradient: "from-sky-500 to-blue-500" },
  { icon: Laptop, title: "Notebooks", description: "Movilidad empresarial", gradient: "from-orange-500 to-amber-500" },
  { icon: Settings, title: "Soporte", description: "Asistencia técnica 24/7", gradient: "from-teal-500 to-cyan-500" },
]

export default function ServiciosInformaticosPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
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
              backgroundImage: `radial-gradient(circle at center, rgba(249, 115, 22, 0.3) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Grid lines overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
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
              "radial-gradient(circle, rgba(249, 115, 22, 0.8) 0%, rgba(251, 146, 60, 0.4) 40%, transparent 70%)",
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.3}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/25 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-orange-600/15 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-400/40 rounded-full animate-float"
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
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent animate-shimmer" />
          <div
            className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent animate-shimmer"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        {/* Content */}
        <div
          className={`relative z-10 max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-400/30 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-300">Servicio Técnico Profesional</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Soporte
            <span className="block mt-2 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent pb-2">
              Técnico
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-12 leading-relaxed">
            Equipo de profesionales certificados en reparación, mantenimiento y soporte de equipos informáticos para
            empresas y particulares.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group px-6 py-4 rounded-2xl bg-white/[0.03] border border-orange-500/20 backdrop-blur-sm transition-all duration-500 hover:bg-orange-500/10 hover:border-orange-400/40 hover:scale-105"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(249,115,22,0.6)]"
            >
              Solicitar consultoría
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => navigateWithScroll("/servicios-informaticos", "categorias")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/[0.03] border border-orange-500/20 rounded-xl font-semibold text-white transition-all duration-300 hover:bg-orange-500/10 backdrop-blur-sm"
            >
              Ver servicios
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categorias" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4 border border-orange-500/20">
              Servicios
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Soluciones para cada necesidad</h2>
            <p className="text-white/40 max-w-2xl mx-auto">
              Selecciona un servicio para explorar nuestras soluciones especializadas
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Categories Menu */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-2 p-6 rounded-2xl bg-white/[0.02] border border-orange-500/10 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Nuestros Servicios</h3>
                {categories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`group w-full flex items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-400/40 text-white"
                        : "text-white/50 hover:bg-orange-500/10 hover:text-white"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        activeCategory === category.id
                          ? `bg-gradient-to-br ${category.gradient}`
                          : "bg-orange-500/10 group-hover:bg-orange-500/20"
                      }`}
                    >
                      <category.icon
                        className={`h-4 w-4 ${activeCategory === category.id ? "text-white" : "text-orange-400"}`}
                      />
                    </div>
                    <span className="flex-1">{category.label}</span>
                    <ChevronRight
                      className={`w-4 h-4 text-orange-400 transition-all duration-300 ${
                        activeCategory === category.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Panel */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white/[0.02] border border-orange-500/10 backdrop-blur-sm p-8 min-h-[500px]">
                {!activeCategory ? (
                  <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mb-6">
                      <Cpu className="w-12 h-12 text-orange-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Bienvenido a Soporte Técnico</h3>
                    <p className="text-white/40 max-w-md">
                      Más de 30 años brindando soluciones tecnológicas integrales. Selecciona un servicio del menú para
                      conocer más.
                    </p>
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${categories.find((c) => c.id === activeCategory)?.gradient} flex items-center justify-center mb-6`}
                      >
                        {(() => {
                          const Icon = categories.find((c) => c.id === activeCategory)?.icon || Cpu
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
                          className="flex items-start gap-3 p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 transition-all duration-300 hover:bg-orange-500/10 hover:border-orange-400/30"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
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
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-orange-950/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4 border border-orange-500/20">
              Productos
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Soluciones Tecnológicas</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="group relative rounded-2xl bg-white/[0.03] border border-white/10 p-6 transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1"
              >
                <div className="relative w-14 h-14 rounded-xl bg-white/[0.05] flex items-center justify-center mb-5 group-hover:bg-white/[0.08] transition-colors duration-300">
                  <product.icon
                    className={`w-7 h-7 text-white/70 group-hover:text-white transition-colors duration-300`}
                  />
                </div>

                <h3 className="relative text-lg font-bold text-white mb-2">{product.title}</h3>
                <p className="relative text-sm text-white/50">{product.description}</p>
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
              { icon: Zap, title: "Respuesta Rápida", description: "Atención inmediata garantizada" },
              { icon: Globe, title: "Cobertura Total", description: "Servicio en todo el país" },
              { icon: Headphones, title: "Soporte 24/7", description: "Asistencia técnica continua" },
              { icon: Lock, title: "Seguridad", description: "Protección de datos certificada" },
            ].map((feature, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-2xl bg-white/[0.02] border border-orange-500/10 transition-all duration-500 hover:bg-orange-500/10 hover:border-orange-400/30 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 mb-4 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="relative text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="relative text-sm text-white/40">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-orange-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Trabajamos con las mejores marcas</h2>
            <p className="text-white/40">Partners tecnológicos de primer nivel</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {["Adobe", "HP", "Microsoft", "ESET", "Manage Engine", "Ubiquiti", "Canon", "Lenovo"].map((brand, index) => (
              <div
                key={brand}
                className="group px-6 py-3 rounded-lg bg-white/[0.02] border border-orange-500/10 transition-all duration-300 hover:bg-orange-500/10 hover:border-orange-400/30 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-lg font-semibold text-white/40 group-hover:text-white/80 transition-colors">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-violet-700/20 border border-violet-500/20 p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent" />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Necesitás más información?</h2>
              <p className="text-white/50 mb-8 max-w-xl mx-auto">
                Nuestro equipo está listo para asesorarte sin compromiso. Contanos qué necesitás y te ayudamos.
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(249,115,22,0.5)]"
              >
                Contactanos ahora
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
