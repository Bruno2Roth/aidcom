"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import {
  Home,
  Monitor,
  Printer,
  Wrench,
  ShoppingCart,
  Mail,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Laptop,
  Headphones,
  Shield,
  Zap,
  Lightbulb,
  Users,
  Clock,
  Award,
  Package,
  Router,
  Wifi,
  HardDrive,
  Cpu,
  Smartphone,
  Star,
  Truck,
  CreditCard,
  ThumbsUp,
  MessageCircle,
  ChevronRight,
  Briefcase,
  Store,
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

function FloatingParticles({ count = 30, color = "sky" }: { count?: number; color?: string }) {
  const colorClass = color === "sky" ? "bg-sky-400/40" : "bg-blue-400/40"
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 ${colorClass} rounded-full animate-float`}
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

export default function HogarOficinaComercioPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const heroRef = useRef<HTMLElement>(null)
  const serviciosRef = useInView()
  const productosRef = useInView()
  const beneficiosRef = useInView()
  const testimonialsRef = useInView()
  const marcasRef = useInView()
  const tipsRef = useInView()

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
      icon: Monitor,
      title: "Computadoras y Notebooks",
      desc: "Equipos de escritorio y portátiles para todas las necesidades, desde uso básico hasta gaming y diseño profesional.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Printer,
      title: "Impresoras e Insumos",
      desc: "Impresoras, cartuchos, toners y todo lo necesario para tu oficina o comercio.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Wrench,
      title: "Service y Reparación",
      desc: "Servicio técnico especializado para computadoras, notebooks, impresoras y más.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Router,
      title: "Redes y Conectividad",
      desc: "Instalación de redes WiFi, cableado estructurado y soluciones de conectividad empresarial.",
      gradient: "from-sky-500 to-blue-500",
    },
  ]

  const productos = [
    {
      icon: Laptop,
      title: "Notebooks",
      items: ["Notebooks básicas", "Notebooks para trabajo", "Gaming laptops", "Ultrabooks"],
    },
    {
      icon: Monitor,
      title: "Escritorio",
      items: ["PCs armadas", "Monitores", "Teclados y mouse", "Webcams"],
    },
    {
      icon: Printer,
      title: "Impresión",
      items: ["Impresoras inkjet", "Impresoras láser", "Multifunción", "Insumos"],
    },
    {
      icon: Headphones,
      title: "Accesorios",
      items: ["Auriculares", "Cables y adaptadores", "Almacenamiento", "Periféricos"],
    },
  ]

  const beneficios = [
    { icon: Shield, title: "Garantía oficial", desc: "Todos nuestros productos con garantía" },
    { icon: Zap, title: "Entrega rápida", desc: "Envíos a todo el país" },
    { icon: Wrench, title: "Soporte técnico", desc: "Atención personalizada" },
    { icon: Lightbulb, title: "Asesoramiento", desc: "Te ayudamos a elegir" },
  ]

  const testimonials = [
    {
      name: "María González",
      role: "Propietaria de comercio",
      text: "Excelente servicio y atención. Compramos toda la tecnología para nuestra tienda con Aidcom.",
      rating: 5,
    },
    {
      name: "Carlos Ramírez",
      role: "Profesional independiente",
      text: "La notebook que compré superó mis expectativas. Ideal para trabajar desde casa.",
      rating: 5,
    },
    {
      name: "Laura Fernández",
      role: "Gerente de oficina",
      text: "Equipamos toda nuestra oficina con ellos. Muy profesionales y precios competitivos.",
      rating: 5,
    },
  ]

  const marcasDestacadas = [
    { name: "HP", icon: Laptop },
    { name: "Lenovo", icon: Monitor },
    { name: "Dell", icon: Cpu },
    { name: "Logitech", icon: Headphones },
    { name: "Samsung", icon: Smartphone },
    { name: "TP-Link", icon: Wifi },
  ]

  const techTips = [
    {
      icon: Cpu,
      title: "Elegí el procesador correcto",
      desc: "Para uso de oficina un i5 o Ryzen 5 es suficiente. Para diseño o gaming, optá por i7/Ryzen 7 o superior.",
    },
    {
      icon: HardDrive,
      title: "SSD es indispensable",
      desc: "Un disco SSD mejora drásticamente la velocidad de tu equipo. Mínimo 256GB para uso básico.",
    },
    {
      icon: Wifi,
      title: "Red WiFi optimizada",
      desc: "Un router de buena calidad y bien ubicado hace la diferencia en la velocidad de conexión.",
    },
  ]

  const casosDeUso = [
    {
      icon: Home,
      title: "Para tu Hogar",
      description: "Trabajo remoto, estudio online, entretenimiento y conectividad familiar",
      features: [
        "Notebooks para toda la familia",
        "Router WiFi de alta velocidad",
        "Impresora multifunción",
        "Smart TV y streaming",
      ],
      image: "/modern-home-office-with-laptop.jpg",
      color: "from-sky-500 to-cyan-500",
    },
    {
      icon: Briefcase,
      title: "Para tu Oficina",
      description: "Productividad, colaboración y herramientas profesionales para tu equipo",
      features: [
        "Monitores profesionales",
        "Periféricos ergonómicos",
        "Equipos de videoconferencia",
        "Soluciones de backup",
      ],
      image: "/professional-small-office-workspace.jpg",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Store,
      title: "Para tu Comercio",
      description: "Punto de venta, gestión de inventario y atención al cliente",
      features: ["Sistemas POS", "Impresoras de tickets", "Lectores de código", "Computadoras all-in-one"],
      image: "/small-retail-store-with-computer.jpg",
      color: "from-emerald-500 to-teal-500",
    },
  ]

  const procesoCompra = [
    { step: "01", title: "Elegí", desc: "Explorá nuestro catálogo y seleccioná lo que necesitás", icon: ShoppingCart },
    {
      step: "02",
      title: "Consultá",
      desc: "Nuestros asesores te ayudan a elegir la mejor opción",
      icon: MessageCircle,
    },
    { step: "03", title: "Pagá", desc: "Hasta 12 cuotas sin interés con todas las tarjetas", icon: CreditCard },
    { step: "04", title: "Recibí", desc: "Envío gratis en 24-48hs o retirá en nuestro local", icon: Truck },
  ]

  const productosDestacados: {
    name: string
    category: string
    price: string
    image: string
    badge: string
  }[] = [
    // Agregar productos aquí
  ]

  return (
    <div className="overflow-hidden bg-slate-950">
      {/* Hero Section - Enhanced with better layout */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center px-4 py-24 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(14, 165, 233, 0.3) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-25 blur-[150px] transition-all duration-1000 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(14, 165, 233, 0.8) 0%, rgba(59, 130, 246, 0.4) 40%, transparent 70%)",
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

        <FloatingParticles count={40} color="sky" />

        <div className="relative mx-auto max-w-7xl w-full z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div
              className={`transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <Link
                href="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
                className="inline-flex items-center gap-2 text-sky-400 hover:text-cyan-400 transition-colors mb-6"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                <span>Volver al inicio</span>
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-xl shadow-sky-500/30">
                  <Home className="h-8 w-8 text-white" />
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-400">
                  <Sparkles className="h-4 w-4" />
                  Soluciones personales y profesionales
                </span>
              </div>

              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
                Tecnología para{" "}
                <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                  tu día a día
                </span>
              </h1>
              <p className="text-xl text-white/70 max-w-2xl leading-relaxed mb-8">
                Equipamiento de calidad para el hogar, oficina y comercio. Computadoras, notebooks, impresoras y
                accesorios con garantía oficial y soporte técnico especializado.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="text-2xl font-bold text-sky-400">500+</div>
                  <div className="text-xs text-white/60">Productos</div>
                </div>
                <div className="text-center p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="text-2xl font-bold text-sky-400">24hs</div>
                  <div className="text-xs text-white/60">Entrega</div>
                </div>
                <div className="text-center p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="text-2xl font-bold text-sky-400">12</div>
                  <div className="text-xs text-white/60">Cuotas s/int</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://www.mercadolibre.com.ar/pagina/aidcom"
                  onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
                  className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-sky-500/25"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Explorar Tienda</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contacto"
                  onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
                  className="group inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/10"
                >
                  <Mail className="h-5 w-5" />
                  <span>Contactar</span>
                </Link>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-sky-500/20">
                <Image
                  src="/images/small-retail-store.jpg"
                  alt="Tecnología para hogar, oficina y comercio"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 to-transparent" />
              </div>
              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Garantía Oficial</p>
                    <p className="text-white/60 text-sm">En todos los productos</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Envío Gratis</p>
                    <p className="text-white/60 text-xs">Compras +$100.000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-24 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-400 mb-6">
              <Users className="h-4 w-4" />
              Soluciones a medida
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
              Tecnología para cada{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">necesidad</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Ya sea para trabajar, estudiar o emprender, tenemos la solución perfecta para vos
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {casosDeUso.map((caso, index) => {
              const IconComponent = caso.icon
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] transition-all duration-500 hover:border-sky-500/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-500/10"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={caso.image || "/placeholder.svg"}
                      alt={caso.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${caso.color} opacity-60`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${caso.color} shadow-lg`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{caso.title}</h3>
                    <p className="text-white/60 mb-6">{caso.description}</p>
                    <ul className="space-y-3">
                      {caso.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                          <CheckCircle className="h-4 w-4 text-sky-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="https://www.mercadolibre.com.ar/pagina/aidcom"
                      className="mt-6 inline-flex items-center gap-2 text-sky-400 font-semibold hover:text-sky-300 transition-colors group/link"
                    >
                      Ver productos
                      <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Servicios Section - Enhanced */}
      <section
        ref={serviciosRef.ref as React.RefObject<HTMLElement>}
        className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />

        <div className="relative mx-auto max-w-7xl">
          <div
            className={`text-center transition-all duration-1000 mb-16 ${serviciosRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
          >
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
              Nuestros{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">Servicios</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Soluciones tecnológicas completas adaptadas a tus necesidades específicas
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {servicios.map((servicio, index) => {
              const IconComponent = servicio.icon
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 backdrop-blur-sm transition-all duration-500 hover:border-sky-500/30 hover:bg-white/[0.08] hover:-translate-y-2 hover:shadow-xl hover:shadow-sky-500/10 ${serviciosRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${servicio.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{servicio.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{servicio.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-24 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-400 mb-4">
                <Star className="h-4 w-4" />
                Lo más buscado
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Productos{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  destacados
                </span>
              </h2>
            </div>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 text-sky-400 font-semibold hover:text-sky-300 transition-colors group"
            >
              Ver todo el catálogo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productosDestacados.map((producto, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] transition-all duration-500 hover:border-sky-500/30 hover:-translate-y-2 hover:shadow-xl hover:shadow-sky-500/10"
              >
                {producto.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        producto.badge === "Más vendido"
                          ? "bg-amber-500 text-black"
                          : producto.badge === "Nuevo"
                            ? "bg-sky-500 text-white"
                            : "bg-emerald-500 text-white"
                      }`}
                    >
                      {producto.badge}
                    </span>
                  </div>
                )}
                <div className="relative h-48 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center p-6">
                  <Image
                    src={producto.image || "/placeholder.svg"}
                    alt={producto.name}
                    width={150}
                    height={150}
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 pt-0">
                  <p className="text-sky-400 text-sm font-medium mb-1">{producto.category}</p>
                  <h3 className="text-lg font-bold text-white mb-3">{producto.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">{producto.price}</span>
                    <button className="p-3 rounded-xl bg-sky-500/10 text-sky-400 hover:bg-sky-500 hover:text-white transition-all duration-300">
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={tipsRef.ref as React.RefObject<HTMLElement>}
        className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-sky-950/10 to-slate-950" />

        <div className="relative mx-auto max-w-7xl">
          <div
            className={`text-center transition-all duration-1000 mb-16 ${tipsRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-400 mb-6">
              <Lightbulb className="h-4 w-4" />
              Consejos de expertos
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
              Tips para elegir tu{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                equipo ideal
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Te ayudamos a tomar la mejor decisión para tu inversión en tecnología
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {techTips.map((tip, index) => {
              const IconComponent = tip.icon
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 backdrop-blur-sm transition-all duration-500 hover:border-sky-500/30 hover:bg-white/[0.08] ${tipsRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg shadow-sky-500/25 transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{tip.title}</h3>
                  <p className="text-white/60 leading-relaxed">{tip.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Productos Section - Enhanced with better visual hierarchy */}
      <section
        ref={productosRef.ref as React.RefObject<HTMLElement>}
        className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />

        <div className="relative mx-auto max-w-7xl">
          <div
            className={`text-center transition-all duration-1000 mb-16 ${productosRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
          >
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
              Categorías de{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">Productos</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Amplia variedad de equipamiento tecnológico para cada necesidad
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productos.map((producto, index) => {
              const IconComponent = producto.icon
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-sky-500/30 hover:bg-white/[0.05] hover:shadow-lg ${productosRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 transition-all duration-300 group-hover:from-sky-500/30 group-hover:to-blue-500/30 group-hover:scale-110">
                    <IconComponent className="h-6 w-6 text-sky-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-4">{producto.title}</h3>
                  <ul className="space-y-2">
                    {producto.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-white/60 group-hover:text-white/80 transition-colors"
                      >
                        <CheckCircle className="h-4 w-4 text-sky-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section
        ref={marcasRef.ref as React.RefObject<HTMLElement>}
        className="relative px-4 py-16 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-sky-950/5 to-slate-950" />

        <div className="relative mx-auto max-w-7xl">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${marcasRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Trabajamos con las{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                mejores marcas
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {marcasDestacadas.map((marca, index) => {
              const IconComponent = marca.icon
              return (
                <div
                  key={index}
                  className={`group flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-500 hover:border-sky-500/30 hover:bg-white/[0.05] ${marcasRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <IconComponent className="h-8 w-8 text-white/40 group-hover:text-sky-400 transition-colors mb-2" />
                  <span className="text-white/60 text-sm font-medium group-hover:text-white transition-colors">
                    {marca.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section
        ref={beneficiosRef.ref as React.RefObject<HTMLElement>}
        className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />

        <div className="relative mx-auto max-w-7xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${beneficiosRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
          >
            <h2 className="text-4xl font-bold text-white sm:text-5xl mb-4">
              Por qué{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">elegirnos</span>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {beneficios.map((beneficio, index) => {
              const IconComponent = beneficio.icon
              return (
                <div
                  key={index}
                  className={`group text-center p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-sky-500/30 hover:bg-white/[0.05] hover:-translate-y-2 ${beneficiosRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-500 shadow-lg shadow-sky-500/25 transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{beneficio.title}</h3>
                  <p className="text-sm text-white/60">{beneficio.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef.ref as React.RefObject<HTMLElement>}
        className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-sky-950/5 to-slate-950" />

        <div className="relative mx-auto max-w-7xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${testimonialsRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
          >
            <h2 className="text-4xl font-bold text-white sm:text-5xl mb-4">
              Lo que dicen{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                nuestros clientes
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-sky-500/30 ${testimonialsRef.isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/70 mb-6 italic leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-white/50 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-24 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-sky-950/10 to-slate-950" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
              Comprar es{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">muy fácil</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              En solo 4 pasos tenés tu producto en casa o en tu negocio
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {procesoCompra.map((paso, index) => {
              const IconComponent = paso.icon
              return (
                <div key={index} className="relative">
                  {index < procesoCompra.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-sky-500/50 to-transparent" />
                  )}
                  <div className="relative text-center p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-sky-500/30 hover:bg-white/[0.06]">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-white text-sm font-bold shadow-lg shadow-sky-500/30">
                        {paso.step}
                      </span>
                    </div>
                    <div className="mt-4 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/10">
                      <IconComponent className="h-8 w-8 text-sky-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{paso.title}</h3>
                    <p className="text-sm text-white/60">{paso.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="relative px-4 py-32 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-sky-950/20 to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[200px]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

        <div className="relative mx-auto max-w-5xl">
          <div className="text-center p-12 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
              <Sparkles className="h-4 w-4" />
              Asesoramiento gratuito
            </div>
            <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
              ¿Necesitás ayuda para{" "}
              <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                elegir
              </span>
              ?
            </h2>
            <p className="text-white/60 mb-10 text-xl max-w-2xl mx-auto leading-relaxed">
              Nuestro equipo de expertos te asesora sin compromiso para encontrar la solución perfecta para tu hogar,
              oficina o comercio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link
                href="/contacto"
                onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 px-10 py-5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/30"
              >
                <Mail className="h-5 w-5" />
                <span>Solicitar Asesoramiento</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://wa.me/5491149988089?text=Hola%20Aidcom%2C%20necesito%20asesoramiento%20para%20elegir%20el%20equipo%20ideal%20para%20mi%20hogar%2Foficina%2Fcomercio."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-emerald-500/50 bg-emerald-500/10 px-10 py-5 font-semibold text-emerald-400 transition-all duration-300 hover:scale-105 hover:border-emerald-500 hover:bg-emerald-500/20"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Chatear por WhatsApp</span>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="h-5 w-5 text-sky-400" />
                <span>Respuesta en menos de 1 hora</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <ThumbsUp className="h-5 w-5 text-sky-400" />
                <span>Sin compromiso de compra</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Award className="h-5 w-5 text-sky-400" />
                <span>+30 años de experiencia</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
