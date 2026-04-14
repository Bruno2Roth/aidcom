"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Building2,
  FileText,
  Package,
  Users,
  Settings,
  Shield,
  ChevronDown,
  Briefcase,
  Calculator,
  LucideDatabase,
  Layers,
  Headphones,
  ArrowRight,
  Monitor,
  TrendingUp,
  FileSpreadsheet,
  Wallet,
  ShoppingCart,
  Truck,
  BookOpen,
  PieChart,
  MapPin,
  BarChart3,
  CheckCircle,
  Zap,
  Award,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollNavigation } from "@/hooks/use-scroll-navigation"

const caracteristicasGenerales = [
  {
    icon: Building2,
    title: "Multiempresa",
    desc: "Administre simultáneamente múltiples empresas con bases de datos independientes o compartidas según su estructura corporativa",
  },
  {
    icon: Users,
    title: "Multiusuario",
    desc: "Control granular de accesos por usuario, módulo y funcionalidad. Auditoría completa de operaciones",
  },
  {
    icon: Settings,
    title: "Altamente Configurable",
    desc: "Adapte comprobantes, formularios, campos y procesos sin programar. Personalización total según su negocio",
  },
  {
    icon: FileText,
    title: "Reportes Ilimitados",
    desc: "Diseñe y guarde sus propios listados con filtros, columnas y ordenamiento personalizados para cada necesidad",
  },
  {
    icon: Monitor,
    title: "Interfaz Intuitiva",
    desc: "Diseño moderno y funcional que reduce la curva de aprendizaje. Operación ágil para usuarios de cualquier nivel",
  },
  {
    icon: Headphones,
    title: "Ayuda Contextual",
    desc: "Documentación integrada y accesible desde cualquier pantalla. Videos tutoriales y guías paso a paso",
  },
  {
    icon: Shield,
    title: "Seguridad Robusta",
    desc: "Respaldos automáticos, cifrado de datos sensibles y auditoría completa de todas las operaciones críticas",
  },
  {
    icon: Layers,
    title: "Sistema Abierto",
    desc: "Arquitectura modular que permite desarrollos específicos sin límites. Integraciones con APIs externas disponibles",
  },
]

const modulosGestionComercial = [
  {
    icon: ShoppingCart,
    title: "Ventas",
    features: [
      "Facturación electrónica AFIP (A, B, C, E)",
      "Presupuestos, pedidos y remitos",
      "Cobranzas multimoneda con anticipos",
      "Cuenta corriente con análisis de morosidad",
      "Listas de precios ilimitadas con vigencias",
    ],
  },
  {
    icon: Truck,
    title: "Compras",
    features: [
      "Solicitudes con aprobación multinivel",
      "Presupuestos comparativos de proveedores",
      "Órdenes de pago por vencimientos",
      "Cuenta corriente con histórico",
      "Control de precios y variaciones",
    ],
  },
  {
    icon: Package,
    title: "Stock y Producción",
    features: [
      "Movimientos en tiempo real",
      "Atributos variables (talle, color, modelo)",
      "Valorización FIFO, LIFO, PPP",
      "Gestión de lotes, series y vencimientos",
      "Depósitos y ubicaciones ilimitadas",
    ],
  },
  {
    icon: Wallet,
    title: "Tesorería",
    features: [
      "Caja diaria multimoneda con arqueos",
      "Cheques propios, diferidos y de terceros",
      "Conciliación bancaria automática",
      "Tarjetas de crédito con liquidaciones",
      "Proyección de flujo de fondos",
    ],
  },
]

const modulosContabilidad = [
  {
    icon: BookOpen,
    title: "Plan de Cuentas",
    features: [
      "Estructura jerárquica hasta 8 niveles",
      "Ajuste por inflación RT6",
      "Ejercicios fiscales y períodos mensuales",
    ],
  },
  {
    icon: FileSpreadsheet,
    title: "Asientos Contables",
    features: [
      "Libro Diario con numeración automática",
      "Modelos reutilizables de asientos",
      "Contabilización multimoneda",
    ],
  },
  {
    icon: PieChart,
    title: "Balances e Informes",
    features: [
      "Balance según formato legal",
      "Comparativas por períodos",
      "Análisis vertical y horizontal",
    ],
  },
  {
    icon: Calculator,
    title: "Funciones Avanzadas",
    features: [
      "Contabilidad bimonetaria simultánea",
      "Ajuste por inflación automático",
      "Integración total con Gestión Comercial",
    ],
  },
]

const serviciosAdicionales = [
  {
    icon: Settings,
    title: "Instalación y Configuración",
    desc: "Realizamos la instalación completa del sistema, configuración de parámetros iniciales, estructuras de datos y parametrización según su forma de trabajo específica",
  },
  {
    icon: Users,
    title: "Capacitación Integral",
    desc: "Dictamos cursos presenciales o remotos para todo el personal. Material didáctico incluido, ejercicios prácticos y certificación de capacitación para usuarios",
  },
  {
    icon: LucideDatabase,
    title: "Migración de Datos",
    desc: "Importamos toda la información de su sistema anterior: clientes, proveedores, productos, saldos y movimientos históricos. Transición sin pérdida de datos",
  },
  {
    icon: TrendingUp,
    title: "Consultoría de Gestión",
    desc: "Analizamos sus procesos actuales y recomendamos mejoras operativas. Optimización de flujos de trabajo y definición de indicadores clave de gestión (KPIs)",
  },
  {
    icon: Headphones,
    title: "Soporte Continuo",
    desc: "Asistencia técnica por teléfono, email y acceso remoto. Actualizaciones gratuitas del sistema y asesoramiento en el uso de funcionalidades avanzadas",
  },
  {
    icon: Layers,
    title: "Desarrollos a Medida",
    desc: "Creamos módulos adicionales, reportes especiales, integraciones con otros sistemas y automatizaciones específicas según necesidades únicas de su empresa",
  },
]

const funcionesListados = [
  "Columnas personalizables por usuario",
  "Filtros avanzados: fecha, rango, contiene, mayor/menor",
  "Exportación a PDF, Excel y TXT",
  "Rankings dinámicos: TOP ventas por cliente o producto",
  "Guardado de configuraciones favoritas",
]

const faqs = [
  {
    q: "¿Qué ventaja tiene un sistema 'abierto' vs uno 'enlatado'?",
    a: "Un sistema abierto como EGMM está diseñado con arquitectura modular que permite agregar funcionalidades específicas sin límites. Por ejemplo, si necesita integración con un e-commerce, un sistema de picking por código de barras, o reportes especiales para su industria, podemos desarrollarlo. Los sistemas enlatados vienen cerrados y solo puede usar las funciones que trae de fábrica, sin posibilidad de adaptación a procesos únicos de su negocio.",
  },
  {
    q: "¿Cómo funciona la integración entre Gestión Comercial y Contabilidad?",
    a: "La integración es automática y bidireccional. Cada operación comercial (factura de venta, recibo de cobro, orden de pago) genera instantáneamente el asiento contable correspondiente según las reglas que configuramos juntos. Esto elimina la doble carga, reduce errores humanos y mantiene su contabilidad actualizada en tiempo real.",
  },
  {
    q: "¿Pueden migrar los datos de mi sistema actual?",
    a: "Sí, realizamos migraciones desde cualquier sistema (Tango, Bejerman, SAP, sistemas propios, planillas Excel, etc.). Importamos clientes, proveedores, productos con sus precios y costos, saldos de cuentas corrientes actualizados, stock valorizado y movimientos históricos de los últimos 12 meses (o más si lo necesita).",
  },
  {
    q: "¿El sistema soporta facturación electrónica AFIP?",
    a: "Totalmente homologado. Emitimos facturas A, B, C, M, notas de crédito/débito electrónicas y facturas E de exportación. La integración con AFIP es directa: genera el comprobante en el sistema, presiona emitir y en segundos obtiene el CAE.",
  },
  {
    q: "¿Puedo gestionar múltiples empresas con el mismo sistema?",
    a: "Sí, EGMM es multiempresa nativo. Puede tener bases de datos completamente separadas (ideal para empresas independientes) o compartir maestros comunes como clientes, proveedores y productos (ideal para grupos empresarios).",
  },
  {
    q: "¿Qué sucede si necesito una funcionalidad que no existe?",
    a: "Ese es el valor de un sistema abierto. Analizamos su requerimiento, elaboramos una propuesta de desarrollo con tiempos y costos, y una vez aprobado lo implementamos específicamente para usted. Su sistema crece con su negocio.",
  },
]

const benefits = [
  { icon: Zap, title: "Productividad", description: "Gestión integral en un solo sistema" },
  { icon: Shield, title: "Seguridad", description: "Respaldos y auditoría completa" },
  { icon: Award, title: "+25 Años", description: "Experiencia en gestión empresarial" },
  { icon: Clock, title: "24/7", description: "Soporte técnico continuo" },
]

export default function EGMMPage() {
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

  return (
    <main className="overflow-hidden bg-[#030712]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Animated orbs */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-25 blur-[150px] transition-all duration-1000 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(139, 92, 246, 0.4) 40%, transparent 70%)",
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.3}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/25 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-indigo-400/40 rounded-full animate-float"
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
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent animate-shimmer" />
          <div
            className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent animate-shimmer"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        {/* Content */}
        <div
          className={`relative z-10 max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-400/30 backdrop-blur-sm mb-8">
            <LucideDatabase className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">Sistemas de Gestión Empresarial</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Sistemas de Gestión
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              EGMM
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-4 leading-relaxed">
            Desarrollo e implementación de sistemas informáticos de gestión altamente parametrizables.
          </p>
          <p className="text-base text-white/40 max-w-xl mx-auto mb-10">
            Sistemas abiertos que se adaptan a la manera de operar de cada empresa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={() => navigateWithScroll("/egmm", "sistemas")}
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-8 py-6 text-base font-medium border-0"
            >
              Ver Sistemas
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-indigo-400/30 text-white hover:bg-indigo-500/10 bg-transparent px-8 py-6 text-base"
            >
              <Link href="/contacto">Solicitar Demo</Link>
            </Button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {benefits.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-indigo-400" />
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

      {/* Características Generales */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030712]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Características Generales</h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Todos nuestros sistemas comparten estas características que garantizan flexibilidad, seguridad y facilidad de uso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {caracteristicasGenerales.map((car, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-indigo-500/30 hover:bg-white/[0.04]"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-5">
                  <car.icon className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{car.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{car.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sistema de Gestión Comercial */}
      <section id="sistemas" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050810]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-medium text-white/60 mb-6">
              <Briefcase className="h-3.5 w-3.5 text-indigo-400" />
              Gestión Comercial
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Sistema de Gestión Comercial</h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Solución integral para la gestión de ventas, compras, stock y tesorería con integración completa entre módulos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {modulosGestionComercial.map((modulo, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-indigo-500/30 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    <modulo.icon className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{modulo.title}</h3>
                    <p className="text-xs text-indigo-400">Módulo completo</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {modulo.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/50">
                      <CheckCircle className="h-3.5 w-3.5 text-indigo-500/60 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sistema de Contabilidad */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030712]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-medium text-white/60 mb-6">
              <Calculator className="h-3.5 w-3.5 text-violet-400" />
              Contabilidad
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Sistema de Contabilidad</h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Gestión contable profesional con ajuste por inflación y contabilidad bimonetaria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modulosContabilidad.map((modulo, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.04]"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-5">
                  <modulo.icon className="h-6 w-6 text-violet-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-4">{modulo.title}</h3>
                <ul className="space-y-2">
                  {modulo.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-white/50">
                      <CheckCircle className="h-3.5 w-3.5 text-violet-500/60 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listados y Reportes + Por qué elegirnos */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050810]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Listados */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-medium text-white/60 mb-6">
                <BarChart3 className="h-3.5 w-3.5 text-indigo-400" />
                Reportes
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Listados y Reportes Personalizables
              </h2>
              <p className="text-white/40 mb-8 leading-relaxed">
                Enorme flexibilidad para definir listados según sus necesidades, con columnas personalizables, filtros avanzados y múltiples formatos de exportación.
              </p>
              <ul className="space-y-3">
                {funcionesListados.map((funcion, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                    <CheckCircle className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    {funcion}
                  </li>
                ))}
              </ul>
            </div>

            {/* Por qué elegirnos */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-medium text-white/60 mb-6">
                <Award className="h-3.5 w-3.5 text-indigo-400" />
                ¿Por qué elegirnos?
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                +25 años implementando sistemas de gestión
              </h2>
              <p className="text-white/40 mb-8 leading-relaxed">
                Brindamos implementación completa, capacitación y soporte continuo para que su empresa opere el sistema eficientemente desde el primer día.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Headphones, text: "Soporte técnico local 24/7" },
                  { icon: TrendingUp, text: "Consultoría de gestión incluida" },
                  { icon: LucideDatabase, text: "Migración de datos desde cualquier sistema" },
                  { icon: Layers, text: "Desarrollos a medida sin límites" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-indigo-400" />
                    </div>
                    <span className="text-sm text-white/60">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Adicionales */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030712]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Servicios Incluidos</h2>
            <p className="text-white/40 max-w-xl mx-auto">
              No solo proveemos el sistema, realizamos todas las tareas necesarias para que su empresa pueda operarlo eficientemente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviciosAdicionales.map((servicio, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-indigo-500/30 hover:bg-white/[0.04]"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-5">
                  <servicio.icon className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{servicio.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{servicio.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050810]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Nuestra Oficina</h2>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016896455!2d-58.38897062346894!3d-34.60373645749673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac9e8e0e43f%3A0x6d93e2b2c0b0e1e0!2sParan%C3%A1+552%2C%20C1017%20CABA!5e0!3m2!1ses!2sar!4v1699999999999!5m2!1ses!2sar"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
            <div className="absolute bottom-6 left-6 bg-[#030712]/90 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Paraná 552 7º 74</p>
                  <p className="text-white/40 text-xs">C1017 CABA, Argentina</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a
              href="https://www.google.com/maps/dir//Paran%C3%A1+552,+C1017+CABA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition-all duration-300"
            >
              <MapPin className="w-4 h-4" />
              Cómo llegar
            </a>
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
                  <span className="font-medium text-white text-sm pr-4">{faq.q}</span>
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
                    <p className="text-sm text-white/40 leading-relaxed">{faq.a}</p>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Listo para optimizar la gestión de su empresa?
          </h2>
          <p className="text-white/40 mb-10 max-w-xl mx-auto">
            Contáctenos para una demostración gratuita y descubra cómo podemos mejorar sus procesos de gestión.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-8 py-6 border-0"
            >
              <Link href="/contacto">
                Solicitar Demo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-indigo-400/30 text-white hover:bg-indigo-500/10 bg-transparent px-8 py-6"
            >
              <a href="mailto:info@egmm.com.ar">
                Enviar Email
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
