"use client"

import type React from "react"
import { useState, useEffect, useRef, type FormEvent } from "react"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Building,
  User,
  AtSign,
  Sparkles,
  Zap,
} from "lucide-react"

function FloatingParticles({ count = 30, color = "blue" }: { count?: number; color?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
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
  )
}

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    mensaje: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 },
    )
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const contactInfo = [
    {
      icon: Clock,
      title: "Horario de Atención",
      description: "Lunes a Viernes de 9:00 a 18:00 hs. Respondemos en un plazo máximo de 24 horas hábiles.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: MapPin,
      title: "Dirección",
      description: "Av. Paraná 552, Piso 7, oficina 74°, Ciudad Autónoma de Buenos Aires, Argentina",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Phone,
      title: "Teléfonos",
      description: "Oficina: +54 11 4966-2431 | WhatsApp: +54 9 11 4998-8089",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      title: "Email",
      description: "General: ventas@aidcom.com.ar | Soporte: soporte@aidcom.com.ar",
      gradient: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section con partículas flotantes estilo ManageEngine */}
      <section ref={heroRef} className="relative min-h-[50vh] overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
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

        <FloatingParticles count={30} />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-shimmer" />
          <div
            className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-shimmer"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div
          className={`relative z-10 mx-auto max-w-7xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Estamos para ayudarte</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Ponete en</span>
              <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text pb-2 text-transparent">
                Contacto
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
              Nuestro equipo de expertos está listo para responder tus consultas y brindarte la mejor solución para tu
              empresa.
            </p>

            {/* Quick stats */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
              {[
                { icon: Zap, label: "Respuesta en 24hs", value: "Garantizada" },
                { icon: MessageSquare, label: "Soporte", value: "Personalizado" },
                { icon: CheckCircle2, label: "Satisfacción", value: "100%" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm">
                    <stat.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500">{stat.label}</p>
                    <p className="font-semibold text-white">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />

        <div className="relative mx-auto max-w-7xl">
          <div
            id="contact-content"
            data-animate
            className={`grid gap-12 transition-all duration-1000 lg:grid-cols-2 ${
              visibleSections.has("contact-content") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {/* Contact Info */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">¿Cómo podemos ayudarte?</h2>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  En Aidcom Argentina estamos comprometidos con brindar la mejor atención. Nuestro equipo de
                  profesionales está disponible para responder tus consultas y ayudarte a encontrar la solución
                  perfecta.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.05] to-transparent p-6 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    {/* Hover glow */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div
                        className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${item.gradient} opacity-20 blur-3xl`}
                      />
                    </div>

                    <div className="relative flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg`}
                      >
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-400 leading-relaxed">{item.description}</p>
                      </div>
                    </div>

                    {/* Bottom line animation */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-1">
                <div className="relative h-48 w-full overflow-hidden rounded-xl bg-slate-900/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="mx-auto h-8 w-8 text-blue-500/50" />
                      <p className="mt-2 text-sm text-gray-500">Buenos Aires, Argentina</p>
                    </div>
                  </div>
                  {/* Animated dots */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute h-1 w-1 rounded-full bg-blue-500"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          opacity: Math.random() * 0.5 + 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-xl">
                {/* Form glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />

                <div className="relative">
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                      <Send className="h-3 w-3" />
                      Formulario de Contacto
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-white">Envianos tu mensaje</h2>
                    <p className="mt-2 text-gray-400">
                      Completá el formulario y nos pondremos en contacto a la brevedad.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-8 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30">
                        <CheckCircle2 className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="mt-6 text-xl font-bold text-white">¡Mensaje enviado!</h3>
                      <p className="mt-2 text-gray-400">
                        Gracias por contactarte, <span className="text-emerald-400 font-medium">{formData.nombre}</span>
                        .
                      </p>
                      <p className="mt-4 text-sm text-gray-500">
                        Te responderemos a <span className="text-white">{formData.email}</span> en las próximas 24
                        horas.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false)
                          setFormData({ nombre: "", email: "", empresa: "", mensaje: "" })
                        }}
                        className="mt-6 rounded-xl bg-white/10 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-white/20"
                      >
                        Enviar otro mensaje
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="group">
                          <label
                            htmlFor="nombre"
                            className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300"
                          >
                            <User className="h-4 w-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                            Nombre completo
                          </label>
                          <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            placeholder="Tu nombre"
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 transition-all focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>

                        <div className="group">
                          <label
                            htmlFor="email"
                            className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300"
                          >
                            <AtSign className="h-4 w-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="tu@email.com"
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 transition-all focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label
                          htmlFor="empresa"
                          className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300"
                        >
                          <Building className="h-4 w-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                          Empresa <span className="text-gray-500">(opcional)</span>
                        </label>
                        <input
                          type="text"
                          id="empresa"
                          name="empresa"
                          value={formData.empresa}
                          onChange={handleChange}
                          placeholder="Nombre de tu empresa"
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 transition-all focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      <div className="group">
                        <label
                          htmlFor="mensaje"
                          className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300"
                        >
                          <MessageSquare className="h-4 w-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                          Mensaje
                        </label>
                        <textarea
                          id="mensaje"
                          name="mensaje"
                          value={formData.mensaje}
                          onChange={handleChange}
                          required
                          rows={4}
                          placeholder="¿En qué podemos ayudarte?"
                          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 transition-all focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      <button
                        type="submit"
                        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-[1.02]"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          Enviar Mensaje
                        </span>
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
