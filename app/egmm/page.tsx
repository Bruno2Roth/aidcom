"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Building2,
  FileText,
  Package,
  Users,
  Settings,
  Shield,
  ChevronDown,
  ChevronUp,
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
  LucideCheckCircle,
  Sparkles,
} from "lucide-react"
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
      "Presupuestos con vigencia y seguimiento de conversión",
      "Pedidos con confirmación automática de stock",
      "Remitos con trazabilidad completa de entregas",
      "Facturación electrónica AFIP homologada (A, B, C, E)",
      "Notas de crédito/débito electrónicas automáticas",
      "Cobranzas multimoneda con anticipos y saldos",
      "Cuenta corriente con análisis de morosidad",
      "Vendedores con comisiones y objetivos de venta",
      "Listas de precios ilimitadas con vigencias",
    ],
  },
  {
    icon: Truck,
    title: "Compras",
    features: [
      "Solicitudes de compra con aprobación multinivel",
      "Presupuestos comparativos de múltiples proveedores",
      "Pedidos a proveedores con seguimiento de entregas",
      "Recepción con control de calidad y conformidad",
      "Facturas con imputación automática a costos",
      "Órdenes de pago programadas por vencimientos",
      "Cuenta corriente con histórico de compras",
      "Control de precios y análisis de variaciones",
    ],
  },
  {
    icon: Package,
    title: "Stock y Producción",
    features: [
      "Movimientos en tiempo real con auditoria completa",
      "Productos con atributos variables (talle, color, modelo)",
      "Múltiples unidades de medida y equivalencias",
      "Órdenes de producción con consumo de insumos",
      "Productos compuestos con explosión de materiales",
      "Valorización FIFO, LIFO, PPP o última compra",
      "Gestión de lotes, series y vencimientos",
      "Control de stock mínimo con alertas automáticas",
      "Inventarios físicos con ajustes y diferencias",
      "Depósitos y ubicaciones físicas ilimitadas",
    ],
  },
  {
    icon: Wallet,
    title: "Tesorería",
    features: [
      "Caja diaria multimoneda con arqueos",
      "Gestión completa de cheques propios y diferidos",
      "Cartera de cheques de terceros con trazabilidad",
      "Conciliación bancaria automática",
      "Tarjetas de crédito con liquidaciones automáticas",
      "Cupones de pago y planes de financiación",
      "Proyección de flujo de fondos configurable",
      "Cobranzas programadas con recordatorios",
    ],
  },
]

const modulosContabilidad = [
  {
    icon: BookOpen,
    title: "Plan de Cuentas",
    features: [
      "Estructura jerárquica de hasta 8 niveles",
      "Cuentas de resultado y patrimoniales",
      "Ajuste por inflación según normas RT6",
      "Mayor analítico por cuenta y subcuenta",
      "Ejercicios fiscales y períodos mensuales",
      "Apertura y cierre automático de ejercicios",
    ],
  },
  {
    icon: FileSpreadsheet,
    title: "Asientos Contables",
    features: [
      "Libro Borrador para preparación",
      "Libro Diario con numeración automática",
      "Modelos reutilizables de asientos frecuentes",
      "Agrupamiento por tipo de operación",
      "Contabilización en pesos, dólares y otras monedas",
      "Distribución automática en centros de costos",
      "Reversión y ajustes de asientos históricos",
    ],
  },
  {
    icon: PieChart,
    title: "Balances e Informes",
    features: [
      "Balance de presentación según formato legal",
      "Balance de sumas y saldos detallado",
      "Comparativas por períodos y ejercicios",
      "Balance histórico, ajustado y actualizado",
      "Análisis vertical y horizontal automático",
      "Gráficos de evolución patrimonial",
    ],
  },
  {
    icon: Calculator,
    title: "Funciones Avanzadas",
    features: [
      "Contabilidad bimonetaria simultánea",
      "Ajuste por inflación 100% automático",
      "Revalúo técnico de activos",
      "Asientos tipo con variables dinámicas",
      "Integración total con Gestión Comercial",
      "Exportación a contador formato estándar",
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
  "Columnas personalizables: muestre solo la información que necesita ver",
  "Ordenamiento múltiple: ordene por varios campos simultáneamente",
  "Filtros avanzados: fecha, rango, contiene, mayor/menor que, entre otros",
  "Opciones de formato: márgenes, orientación, tamaño de letra, logos",
  "Listados estadísticos: sumas, promedios, porcentajes automáticos",
  "Exportación versátil: PDF para enviar, Excel para análisis, TXT para importar",
  "Rankings dinámicos: TOP de ventas por cliente, producto o zona",
  "Análisis predictivos: pedidos pendientes, proyecciones de stock",
  "Guardado de configuraciones: grabe sus listados favoritos y reutilícelos",
]

const faqs = [
  {
    q: "¿Qué ventaja tiene un sistema 'abierto' vs uno 'enlatado'?",
    a: "Un sistema abierto como EGMM está diseñado con arquitectura modular que permite agregar funcionalidades específicas sin límites. Por ejemplo, si necesita integración con un e-commerce, un sistema de picking por código de barras, o reportes especiales para su industria, podemos desarrollarlo. Los sistemas enlatados vienen cerrados y solo puede usar las funciones que trae de fábrica, sin posibilidad de adaptación a procesos únicos de su negocio.",
  },
  {
    q: "¿Cómo funciona la integración entre Gestión Comercial y Contabilidad?",
    a: "La integración es automática y bidireccional. Cada operación comercial (factura de venta, recibo de cobro, orden de pago) genera instantáneamente el asiento contable correspondiente según las reglas que configuramos juntos. Esto elimina la doble carga, reduce errores humanos y mantiene su contabilidad actualizada en tiempo real. Puede configurar qué operaciones se contabilizan automáticamente y personalizar los modelos de asientos según su plan de cuentas.",
  },
  {
    q: "¿Pueden migrar los datos de mi sistema actual?",
    a: "Sí, realizamos migraciones desde cualquier sistema (Tango, Bejerman, SAP, sistemas propios, planillas Excel, etc.). Importamos clientes, proveedores, productos con sus precios y costos, saldos de cuentas corrientes actualizados, stock valorizado y movimientos históricos de los últimos 12 meses (o más si lo necesita). El proceso incluye validación de datos, corrección de inconsistencias y pruebas antes de la puesta en producción.",
  },
  {
    q: "¿El sistema soporta facturación electrónica AFIP?",
    a: "Totalmente homologado. Emitimos facturas A, B, C, M, notas de crédito/débito electrónicas y facturas E de exportación. La integración con AFIP es directa: genera el comprobante en el sistema, presiona emitir y en segundos obtiene el CAE. También generamos archivos de regímenes de información (IVA compras/ventas, percepciones, retenciones) según calendario fiscal. Actualizamos automáticamente ante cambios normativos.",
  },
  {
    q: "¿Puedo gestionar múltiples empresas con el mismo sistema?",
    a: "Sí, EGMM es multiempresa nativo. Puede tener bases de datos completamente separadas (ideal para empresas independientes) o compartir maestros comunes como clientes, proveedores y productos (ideal para grupos empresarios). Desde un único escritorio puede operar todas sus empresas, cambiar entre ellas con un clic y generar reportes consolidados de todo el grupo. Cada empresa mantiene su propia contabilidad, facturación y datos fiscales independientes.",
  },
  {
    q: "¿Qué sucede si necesito una funcionalidad que no existe?",
    a: "Ese es el valor de un sistema abierto. Analizamos su requerimiento, elaboramos una propuesta de desarrollo con tiempos y costos, y una vez aprobado lo implementamos específicamente para usted. Ejemplos reales: integración con balanzas industriales, módulo de control de calidad con fotos, conexión con sistemas de punto de venta, generación de etiquetas con códigos QR, facturación recurrente automática. Su sistema crece con su negocio.",
  },
]

export default function EGMMPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
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

        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-25 blur-[150px] transition-all duration-1000 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(139, 92, 246, 0.4) 40%, transparent 70%)",
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.3}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/25 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />

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

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent animate-shimmer" />
          <div
            className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-violet-500/20 to-transparent animate-shimmer"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent animate-shimmer"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Hero Content */}
        <div
          className={`relative z-10 max-w-5xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
            <LucideDatabase className="w-4 h-4" />
            Sistemas de Gestión Empresarial
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">Sistemas de Gestión</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              EGMM
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Desarrollo e implementación de sistemas informáticos de gestión altamente parametrizables que se adaptan a
            la manera de operar de cada empresa. Sistemas abiertos con posibilidad de desarrollos adicionales
            específicos.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigateWithScroll("/egmm", "sistemas")}
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              Ver Sistemas
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white border border-white/20 rounded-xl hover:bg-white/5 transition-all duration-300"
            >
              Solicitar Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/10">
            {[
              { value: "+25", label: "Años de experiencia" },
              { value: "100%", label: "Personalizable" },
              { value: "24/7", label: "Soporte técnico" },
              { value: "AFIP", label: "Factura electrónica" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-indigo-400">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Características Generales */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-violet-950/20" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
              <Sparkles className="w-4 h-4" />
              Características
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Características{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Generales
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Todos nuestros sistemas comparten estas características que garantizan flexibilidad, seguridad y facilidad
              de uso para potenciar su negocio
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {caracteristicasGenerales.map((car, i) => (
              <div
                key={i}
                className="group relative p-8 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl hover:border-indigo-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <car.icon className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{car.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{car.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sistema de Gestión Comercial */}
      <section id="sistemas" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
              <Briefcase className="w-4 h-4" />
              Gestión Comercial
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Sistema de{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Gestión Comercial
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Solución integral para la gestión de ventas, compras, stock y tesorería de su empresa con integración
              completa entre módulos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {modulosGestionComercial.map((modulo, i) => (
              <div
                key={i}
                className="group relative p-10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex-shrink-0">
                      <modulo.icon className="w-10 h-10 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{modulo.title}</h3>
                      <p className="text-indigo-400 font-medium">Módulo completo</p>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {modulo.features.map((feature, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-4 text-gray-300 group/item hover:text-white transition-colors"
                      >
                        <div className="w-6 h-6 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-indigo-500/30 transition-colors">
                          <LucideCheckCircle className="w-4 h-4 text-indigo-400" />
                        </div>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sistema de Contabilidad */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">
              <Calculator className="w-4 h-4" />
              Contabilidad
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Sistema de <span className="text-violet-400">Contabilidad</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Gestión contable profesional con ajuste por inflación y contabilidad bimonetaria
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modulosContabilidad.map((modulo, i) => (
              <div
                key={i}
                className="group p-6 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl hover:border-violet-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
                  <modulo.icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-4">{modulo.title}</h3>
                <ul className="space-y-2">
                  {modulo.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-400 text-sm">
                      <LucideCheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listados y Reportes */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                <BarChart3 className="w-4 h-4" />
                Reportes
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Listados y Reportes <span className="text-indigo-400">Personalizables</span>
              </h2>
              <p className="text-gray-400 mb-8">
                Nuestros sistemas ofrecen una enorme flexibilidad para definir listados según sus necesidades,
                incluyendo columnas personalizables, filtros avanzados y múltiples formatos de exportación.
              </p>
              <ul className="space-y-4">
                {funcionesListados.map((funcion, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="w-6 h-6 bg-indigo-500/20 rounded-full flex items-center justify-center">
                      <LucideCheckCircle className="w-4 h-4 text-indigo-400" />
                    </div>
                    {funcion}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8">
                <div className="space-y-4">
                  {["Exportar a PDF", "Exportar a Excel", "Exportar a TXT", "Vista previa", "Imprimir directo"].map(
                    (item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                        <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-indigo-400" />
                        </div>
                        <span className="text-white font-medium">{item}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
              <Headphones className="w-4 h-4" />
              Servicios
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Servicios <span className="text-indigo-400">Incluidos</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              No solo proveemos el sistema, realizamos todas las tareas necesarias para que su empresa pueda operarlo
              eficientemente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviciosAdicionales.map((servicio, i) => (
              <div
                key={i}
                className="group p-6 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl hover:border-indigo-500/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <servicio.icon className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{servicio.title}</h3>
                <p className="text-gray-400">{servicio.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
              <MapPin className="w-4 h-4" />
              Ubicación
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Nuestra <span className="text-indigo-400">Oficina</span>
            </h2>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-white/10">
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
                  <p className="text-white font-medium">Paraná 552 7º 74</p>
                  <p className="text-gray-400 text-sm">C1017 CABA, Argentina</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="https://www.google.com/maps/dir//Paran%C3%A1+552,+C1017+CABA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            >
              <MapPin className="w-5 h-5" />
              Cómo llegar
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Preguntas <span className="text-indigo-400">Frecuentes</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                >
                  <span className="font-semibold text-white pr-4">{faq.q}</span>
                  {expandedFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contacto" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/30 to-transparent" />
        <div className="max-w-4xl mx-auto relative text-center">
          <div className="bg-gradient-to-br from-indigo-500/10 to-violet-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Listo para optimizar la gestión de su empresa?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Contáctenos para una demostración gratuita de nuestros sistemas y descubra cómo podemos ayudarle a mejorar
              sus procesos de gestión.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/5491112345678?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20los%20sistemas%20EGMM"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 hover:scale-105"
              >
                Solicitar Demo
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@egmm.com.ar"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all duration-300"
              >
                Enviar Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
