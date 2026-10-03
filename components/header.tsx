"use client"

import { AIDCOM_CONTACT } from "@/lib/contact-info"
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
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null)
  const mobileMenuPanelRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const previousOverflow = document.body.style.overflow
    const panel = mobileMenuPanelRef.current
    const closeOnEscapeAndTrapFocus = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setMobileMenuOpen(false)
        return
      }

      if (event.key !== "Tab" || !panel) return

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", closeOnEscapeAndTrapFocus)
    panel?.querySelector<HTMLButtonElement>("[data-mobile-menu-close]")?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", closeOnEscapeAndTrapFocus)
      mobileMenuButtonRef.current?.focus()
    }
  }, [mobileMenuOpen])

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

              <li>
                <Link
                  href="/tienda"
                  onClick={handleNavClick}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                    pathname === "/tienda" ? "text-foreground bg-muted/50" : "text-foreground/70"
                  }`}
                >
                  Catálogo
                </Link>
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
                href={AIDCOM_CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-sm font-medium text-emerald-600 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white dark:text-emerald-400 dark:hover:text-white"
              >
                <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                <span>Contactar</span>
              </a>
            </div>

            <button
              ref={mobileMenuButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </nav>
      </header>
      <div
        aria-hidden="true"
        onClick={() => setMobileMenuOpen(false)}
        className={"fixed inset-0 z-[60] bg-slate-950/45 backdrop-blur-[2px] transition-opacity duration-300 ease-out lg:hidden motion-reduce:transition-none " + (mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0")}
      />
      <aside
        id="mobile-navigation"
        ref={mobileMenuPanelRef}
        aria-label="Menú principal"
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
        className={"fixed inset-y-0 right-0 z-[70] flex w-[clamp(15rem,64vw,24rem)] max-w-[88vw] flex-col border-l border-border bg-background shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden motion-reduce:transition-none " + (mobileMenuOpen ? "translate-x-0" : "pointer-events-none translate-x-full")}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
          <Link href="/" onClick={handleNavClick} aria-label="Aidcom Argentina, inicio">
            <img src="/images/logoaidcom-removebg-preview.png" alt="Aidcom Argentina" className="h-9 w-auto" />
          </Link>
          <button
            type="button"
            data-mobile-menu-close
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Cerrar menú"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Navegación móvil" className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          {tieneInfoCompleta && cliente && (
            <div className={"mb-3 flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3 transition-all duration-300 " + (mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0")}>
              <div className={"flex h-9 w-9 items-center justify-center rounded-full " + (cliente.isAdmin ? "bg-amber-500/20" : "bg-emerald-500/20")}>
                {cliente.isAdmin ? <Crown className="h-4 w-4 text-amber-500" /> : <User className="h-4 w-4 text-emerald-500" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-foreground">{cliente.nombre}</div>
                {cliente.isAdmin && <div className="text-xs font-medium text-amber-500">Administrador</div>}
              </div>
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Cerrar sesión"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}

          <Link
            href="/"
            onClick={handleNavClick}
            aria-current={pathname === "/" ? "page" : undefined}
            className={"group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted " + (pathname === "/" ? "bg-primary/5 text-primary" : "text-foreground/80")}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Home className="h-5 w-5 text-primary" />
            </span>
            <span className="font-medium">Inicio</span>
          </Link>

          <section className="mt-3 border-t border-border pt-4">
            <h2 className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Nuestros servicios
            </h2>
            <ul className="mt-2 space-y-1">
              {serviciosSubmenu.map((item, index) => {
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={handleNavClick}
                      aria-current={pathname === item.href ? "page" : undefined}
                      style={{ transitionDelay: mobileMenuOpen ? 80 + index * 45 + "ms" : "0ms" }}
                      className={"group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-300 hover:bg-muted " + (mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0")}
                    >
                      <span className={"flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br " + item.color + " text-white"}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium leading-snug text-foreground">{item.label}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{item.desc}</span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>

          <section className="mt-3 border-t border-border pt-4">
            <h2 className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Partners y marcas
            </h2>
            <ul className="mt-2 space-y-1">
              {partnersSubmenu.map((item, index) => {
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={handleNavClick}
                      aria-current={pathname === item.href ? "page" : undefined}
                      style={{ transitionDelay: mobileMenuOpen ? 150 + index * 45 + "ms" : "0ms" }}
                      className={"group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-300 hover:bg-muted " + (mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0")}
                    >
                      <span className={"flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br " + item.color + " text-white"}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium leading-snug text-foreground">{item.label}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{item.desc}</span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>

          <section className="mt-3 border-t border-border pt-4">
            <h2 className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Compras
            </h2>
            <Link
              href="/tienda"
              onClick={handleNavClick}
              aria-current={pathname === "/tienda" ? "page" : undefined}
              className={"mt-2 group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted " + (pathname === "/tienda" ? "bg-emerald-500/5 text-emerald-600" : "text-foreground/80")}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                <Store className="h-4 w-4 text-emerald-500" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">Catálogo</span>
                {totalItems > 0 && <span className="text-xs text-emerald-600">{totalItems} items en carrito</span>}
              </span>
            </Link>
          </section>
        </nav>

        <div className="shrink-0 border-t border-border bg-background px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <a
            href={AIDCOM_CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-3 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:brightness-105"
          >
            <MessageCircle className="h-5 w-5 shrink-0" />
            Contactar por WhatsApp
          </a>
        </div>
      </aside>
    </>
  )
}

export default Header
