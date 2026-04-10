"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Wrench,
  Monitor,
  Laptop,
  Printer,
  HardDrive,
  Cpu,
  CheckCircle2,
  Clock,
  Shield,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Zap,
  Settings,
  AlertTriangle,
  ThumbsUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollNavigation } from "@/hooks/use-scroll-navigation"

const stats = [
  { value: "10,000+", label: "Equipos reparados" },
  { value: "98%", label: "Tasa de éxito" },
  { value: "24-48hs", label: "Tiempo promedio" },
  { value: "6 meses", label: "Garantía" },
]

const servicios = [
  {
    icon: Laptop,
    title: "Notebooks y Laptops",
    description: "Reparación de pantallas, teclados, baterías, bisagras y más",
    problemas: [
      "Pantalla rota o con líneas",
      "Teclado dañado o teclas sueltas",
      "Batería que no carga",
      "Sobrecalentamiento",
      "No enciende",
      "Bisagras rotas",
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Monitor,
    title: "PCs de Escritorio",
    description: "Diagnóstico y reparación de todos los componentes",
    problemas: [
      "Pantalla azul o reinicios",
      "Lentitud extrema",
      "Ruidos extraños",
      "No detecta discos",
      "Problemas de video",
      "Fuente de poder dañada",
    ],
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Printer,
    title: "Impresoras",
    description: "Servicio técnico para impresoras láser e inkjet",
    problemas: [
      "Atascos de papel",
      "Manchas en impresión",
      "No reconoce cartuchos",
      "Error de conexión",
      "Cabezal obstruido",
      "Rodillos desgastados",
    ],
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: HardDrive,
    title: "Recuperación de Datos",
    description: "Recuperamos información de discos dañados",
    problemas: [
      "Disco no detectado",
      "Archivos eliminados",
      "Formateo accidental",
      "Disco con sectores dañados",
      "SSD fallido",
      "Pendrive corrupto",
    ],
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: Settings,
    title: "Mantenimiento Preventivo",
    description: "Limpieza y optimización para evitar fallas",
    problemas: [
      "Limpieza interna de polvo",
      "Cambio de pasta térmica",
      "Optimización de Windows",
      "Eliminación de malware",
      "Actualización de drivers",
      "Backup de datos",
    ],
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Cpu,
    title: "Upgrades y Mejoras",
    description: "Potenciá tu equipo con mejores componentes",
    problemas: [
      "Ampliación de RAM",
      "Cambio a SSD",
      "Upgrade de procesador",
      "Mejora de placa de video",
      "Instalación de ventiladores",
      "Cambio de fuente",
    ],
    gradient: "from-amber-500 to-orange-500",
  },
]

const proceso = [
  {
    paso: 1,
    titulo: "Recepción",
    descripcion: "Recibimos tu equipo y realizamos un diagnóstico inicial gratuito",
    icon: Laptop,
  },
  {
    paso: 2,
    titulo: "Diagnóstico",
    descripcion: "Identificamos el problema exacto y te enviamos un presupuesto detallado",
    icon: AlertTriangle,
  },
  {
    paso: 3,
    titulo: "Reparación",
    descripcion: "Una vez aprobado, procedemos con la reparación utilizando repuestos de calidad",
    icon: Wrench,
  },
  {
    paso: 4,
    titulo: "Entrega",
    descripcion: "Te entregamos el equipo funcionando con garantía escrita",
    icon: ThumbsUp,
  },
]

export default function ReparacionesPage() {
  useScrollNavigation()
  const [servicioActivo, setServicioActivo] = useState(0)

  return (
    <main className="min-h-screen bg-[#0a1628]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1e36] to-[#0a1628]" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-cyan-400">Reparaciones</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
                <Wrench className="w-4 h-4" />
                Servicio Técnico Especializado
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Reparación de
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  {" "}
                  Equipos Informáticos
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Servicio técnico profesional para notebooks, PCs, impresoras y más. Diagnóstico gratuito y garantía en
                todas nuestras reparaciones.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                  asChild
                >
                  <Link href="/contacto">
                    Solicitar Diagnóstico
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  asChild
                >
                  <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer">
                    <Phone className="mr-2 h-5 w-5" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/images/it-services.jpg"
                  alt="Servicio técnico de reparación"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 p-4 rounded-xl bg-[#0d1e36] border border-white/10 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Diagnóstico Gratuito</div>
                    <div className="text-sm text-gray-400">Sin compromiso</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Nuestros Servicios de Reparación</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Reparamos todo tipo de equipos informáticos con repuestos originales y garantía
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {servicios.map((servicio, index) => (
              <div
                key={index}
                className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  servicioActivo === index
                    ? "bg-white/10 border-cyan-500/50"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
                onClick={() => setServicioActivo(index)}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${servicio.gradient} mb-4`}>
                  <servicio.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{servicio.title}</h3>
                <p className="text-gray-400 mb-4">{servicio.description}</p>

                <ul className="space-y-2">
                  {servicio.problemas.map((problema, pIndex) => (
                    <li key={pIndex} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      {problema}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso Section */}
      <section className="py-20 relative bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Cómo Funciona?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Proceso simple y transparente para reparar tu equipo</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {proceso.map((item, index) => (
              <div key={index} className="relative">
                {index < proceso.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent" />
                )}

                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg mb-4">
                    {item.paso}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.titulo}</h3>
                  <p className="text-gray-400 text-sm">{item.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

            <div className="relative text-center max-w-3xl mx-auto">
              <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Tu equipo tiene problemas?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Traelo para un diagnóstico gratuito. Te contactamos en menos de 24 horas con la solución.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                  asChild
                >
                  <Link href="/contacto">
                    <Mail className="mr-2 h-5 w-5" />
                    Contactar Ahora
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  asChild
                >
                  <a href="tel:+5491149662431">
                    <Phone className="mr-2 h-5 w-5" />
                    Llamar: (11) 4966-2431
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  Lun-Vie: 9:00 - 18:00
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  Buenos Aires, Argentina
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  Garantía escrita
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
