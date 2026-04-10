"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Sun,
  Store,
  Cpu,
  Shield,
  Settings,
  MessageCircle,
  ShoppingCart,
  ShieldCheck,
  Database,
  Monitor,
  User,
  Crown,
  LogOut,
  ArrowRight,
} from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useCliente } from "@/context/cliente-context"
import { usePathname } from "next/navigation"
import { LoginModal } from "@/components/login-modal"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [partnersOpen, setPartnersOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const { totalItems } = useCart()
  const { cliente, tieneInfoCompleta, limpiarCliente } = useCliente()
  const pathname = usePathname()

  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const partnersTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const userTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (scrolled) {
      setServicesOpen(false)
      setPartnersOpen(false)
    }
  }, [pathname])

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" })
    setMobileMenuOpen(false)
    setUserMenuOpen(false)
    setServicesOpen(false)
    setPartnersOpen(false)
  }

  const handleLogout = () => {
    limpiarCliente()
    setUserMenuOpen(false)
    setMobileMenuOpen(false)
  }

  const openLoginModal = () => {
    setLoginModalOpen(true)
    setMobileMenuOpen(false)
  }

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current)
    setPartnersOpen(false)
    setServicesOpen(true)
  }

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false)
    }, 150)
  }

  const handlePartnersEnter = () => {
    if (partnersTimeoutRef.current) clearTimeout(partnersTimeoutRef.current)
    setServicesOpen(false)
    setPartnersOpen(true)
  }

  const handlePartnersLeave = () => {
    partnersTimeoutRef.current = setTimeout(() => {
      setPartnersOpen(false)
    }, 150)
  }

  const handleUserEnter = () => {
    if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current)
    setUserMenuOpen(true)
  }

  const handleUserLeave = () => {
    userTimeoutRef.current = setTimeout(() => {
      setUserMenuOpen(false)
    }, 150)
  }

  const serviciosSubmenu = [
    {
      href: "/servicios-informaticos",
      label: "Soporte Técnico",
      icon: Cpu,
      desc: "Mantenimiento y reparación",
      color: "from-orange-500 to-amber-500",
    },
    {
      href: "/seguridad",
      label: "Soluciones de Seguridad",
      icon: Shield,
      desc: "Protección integral",
      color: "from-blue-500 to-sky-500",
    },
  ]

  const partnersSubmenu = [
    {
      href: "/manageengine",
      label: "ManageEngine",
      icon: Settings,
      desc: "Gestión IT empresarial",
      color: "from-red-500 to-rose-500",
    },
    {
      href: "/microsoft",
      label: "Microsoft 365 & Azure",
      icon: Monitor,
      desc: "Productividad y nube",
      color: "from-blue-500 to-indigo-500",
    },
    {
      href: "/eset",
      label: "ESET Ciberseguridad",
      icon: ShieldCheck,
      desc: "Antivirus y protección",
      color: "from-cyan-500 to-teal-500",
    },
    {
      href: "/egmm",
      label: "EGMM Sistemas",
      icon: Database,
      desc: "Software de gestión",
      color: "from-emerald-500 to-green-500",
    },
  ]

  return (
    <>
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b border-border bg-background/95 shadow-lg backdrop-blur-md" : "bg-background"
        }`}
      >
        {tieneInfoCompleta && cliente && (
          <div className={`border-b border-border ${cliente.isAdmin ? "bg-amber-500/10" : "bg-emerald-500/10"}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-8 items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {cliente.isAdmin ? (
                    <>
                      <Crown className="h-4 w-4 text-amber-500" />
                      <span className="font-semibold text-amber-600">Administrador</span>
                      <span className="text-muted-foreground">|</span>
                    </>
                  ) : (
                    <User className="h-4 w-4 text-emerald-500" />
                  )}
                  <span className="text-foreground/80">
                    Hola, <span className="font-medium text-foreground">{cliente.nombre}</span>
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-destructive"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Cerrar sesión</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center" onClick={handleNavClick}>
              <img src="/images/logoaidcom-removebg-preview.png" alt="Aidcom Argentina" className="h-10 w-auto" />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              <li>
                <Link
                  href="/"
                  onClick={handleNavClick}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                    pathname === "/" ? "text-foreground bg-muted/50" : "text-foreground/70"
                  }`}
                >
                  Inicio
                </Link>
              </li>

              <li className="relative" onMouseEnter={handleServicesEnter} onMouseLeave={handleServicesLeave}>
                <button
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-muted hover:text-foreground ${
                    servicesOpen ? "bg-muted text-foreground" : "text-foreground/70"
                  }`}
                >
                  Servicios
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`absolute left-1/2 top-full pt-3 -translate-x-1/2 transition-all duration-300 ${
                    servicesOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="w-80 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/10">
                    <div className="bg-gradient-to-r from-primary/5 to-emerald-500/5 px-4 py-3 border-b border-border">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Nuestros Servicios
                      </p>
                    </div>

                    <div className="p-2">
                      {serviciosSubmenu.map((item, index) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={handleNavClick}
                          className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-muted"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-card-foreground group-hover:text-foreground transition-colors">
                              {item.label}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">{item.desc}</div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </li>

              <li className="relative" onMouseEnter={handlePartnersEnter} onMouseLeave={handlePartnersLeave}>
                <button
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-muted hover:text-foreground ${
                    partnersOpen ? "bg-muted text-foreground" : "text-foreground/70"
                  }`}
                >
                  Partners
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${partnersOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`absolute left-1/2 top-full pt-3 -translate-x-1/2 transition-all duration-300 ${
                    partnersOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="w-72 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/10">
                    <div className="bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 px-4 py-3 border-b border-border">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Marcas y Partners
                      </p>
                    </div>

                    <div className="p-2">
                      {partnersSubmenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={handleNavClick}
                          className="group flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-muted"
                        >
                          <div className="font-medium text-sm text-card-foreground group-hover:text-foreground transition-colors">
                            {item.label}
                          </div>
                          <div className="text-xs text-muted-foreground">{item.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <div className="hidden lg:flex items-center gap-3">
              {tieneInfoCompleta && cliente && (
                <div className="relative">
                  <button
                    className={`flex h-10 items-center gap-2 rounded-lg px-3 transition-all duration-200 hover:bg-muted ${
                      cliente.isAdmin ? "text-amber-500" : "text-foreground/70"
                    } ${userMenuOpen ? "bg-muted" : ""}`}
                  >
                    {cliente.isAdmin ? <Crown className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    <span className="text-sm font-medium max-w-[100px] truncate">{cliente.nombre.split(" ")[0]}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${userMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`absolute right-0 top-full pt-3 transition-all duration-300 ${
                      userMenuOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="w-64 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/10">
                      <div
                        className={`px-4 py-3 border-b border-border ${cliente.isAdmin ? "bg-amber-500/5" : "bg-emerald-500/5"}`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${cliente.isAdmin ? "bg-amber-500/20" : "bg-emerald-500/20"}`}
                          >
                            {cliente.isAdmin ? (
                              <Crown className="h-5 w-5 text-amber-500" />
                            ) : (
                              <User className="h-5 w-5 text-emerald-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-card-foreground truncate">{cliente.nombre}</div>
                            <div className="text-xs text-muted-foreground truncate">{cliente.email}</div>
                          </div>
                        </div>
                        {cliente.isAdmin && (
                          <div className="mt-2 flex items-center gap-1 text-xs text-amber-500 font-medium">
                            <Crown className="h-3 w-3" />
                            Cuenta Administrador
                          </div>
                        )}
                      </div>

                      <div className="p-2">

                        <button
                          onClick={handleLogout}
                          className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-destructive/10"
                        >
                                                <Link
                          href="/carrito"
                          onClick={handleNavClick}
                          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-muted"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                            <ShoppingCart className="h-4 w-4 text-emerald-500" />
                          </div>
                          <span className="flex-1 text-sm font-medium">Mi Carrito</span>
                          {totalItems > 0 && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1.5 text-xs font-bold text-white">
                              {totalItems}
                            </span>
                          )}
                        </Link>
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">
                            <LogOut className="h-4 w-4 text-destructive" />
                          </div>
                          <span className="text-sm font-medium text-destructive">Cerrar sesión</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

             
              <a
                href="https://wa.me/5493518012565"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-sm font-medium text-emerald-600 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white dark:text-emerald-400 dark:hover:text-white"
              >
                <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                <span>Contactar</span>
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 lg:hidden ${
              mobileMenuOpen ? "max-h-[calc(100vh-80px)] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-border py-4 max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
              <ul className="flex flex-col gap-1 pb-4">
                {tieneInfoCompleta && cliente && (
                  <li className="mb-3 rounded-xl border border-border bg-gradient-to-r from-muted/50 to-muted/30 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${cliente.isAdmin ? "bg-amber-500/20" : "bg-emerald-500/20"}`}
                        >
                          {cliente.isAdmin ? (
                            <Crown className="h-5 w-5 text-amber-500" />
                          ) : (
                            <User className="h-5 w-5 text-emerald-500" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{cliente.nombre}</div>
                          {cliente.isAdmin && <div className="text-xs text-amber-500 font-medium">Administrador</div>}
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <LogOut className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                )}

                <li>
                  <Link
                    href="/"
                    onClick={handleNavClick}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-foreground/80 transition-all duration-200 hover:bg-muted"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Home className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">Inicio</span>
                  </Link>
                </li>

                <li className="border-t border-border pt-3 mt-2">
                  <span className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <div className="h-px flex-1 bg-border" />
                    Nuestros Servicios
                    <div className="h-px flex-1 bg-border" />
                  </span>
                  <ul className="mt-2 flex flex-col gap-1">
                    {serviciosSubmenu.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={handleNavClick}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-foreground/80 transition-all duration-200 hover:bg-muted"
                        >
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs text-muted-foreground">{item.desc}</div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="border-t border-border pt-3 mt-2">
                  <span className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <div className="h-px flex-1 bg-border" />
                    Partners y Marcas
                    <div className="h-px flex-1 bg-border" />
                  </span>
                  <ul className="mt-2 grid grid-cols-2 gap-1">
                    {partnersSubmenu.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={handleNavClick}
                          className="flex flex-col items-center gap-2 rounded-xl px-3 py-4 text-center text-foreground/80 transition-all duration-200 hover:bg-muted"
                        >
                          <div className="text-sm font-medium">{item.label}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li>
                  <Link
                    href="https://www.mercadolibre.com.ar/pagina/aidcom"
                    onClick={handleNavClick}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-foreground/80 transition-all duration-200 hover:bg-muted"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                      <Store className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <div className="font-medium">Tienda Online</div>
                      {totalItems > 0 && (
                        <span className="text-xs text-emerald-500 font-medium">{totalItems} items en carrito</span>
                      )}
                    </div>
                  </Link>
                </li>

                <li className="mt-4 border-t border-border pt-4 sticky bottom-0 bg-background pb-2">
                  <a
                    href="https://wa.me/5493518012565"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/40"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Contactar por WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
