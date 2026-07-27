"use client"

import type React from "react"
import { useState, useEffect, useRef, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import {
  ShoppingCart,
  Search,
  X,
  Check,
  Heart,
  Filter,
  Grid3X3,
  LayoutList,
  Truck,
  ArrowUpDown,
  ChevronDown,
  RefreshCw,
  CreditCard,
  ShoppingBag,
  ArrowRight,
  Shield,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Package,
  Laptop,
  Monitor,
  Wifi,
  Printer,
  Headphones,
  Sun,
  Droplet,
} from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useStore } from "@/context/store-context"
import type { Producto } from "@/context/cart-context"
import { useScrollNavigation } from "@/hooks/use-scroll-navigation"
import Link from "next/link"

// REMOVED: useInView hook - products will show immediately with simpler animation

type SortOption = "relevancia" | "nombre"
type ViewMode = "grid" | "list"

export default function TiendaPage() {
  const searchParams = useSearchParams()
  // const categoriaFromUrl = searchParams.get("categoria") // Moved inside useEffect

  const [busqueda, setBusqueda] = useState("")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas")
  const [cantidades, setCantidades] = useState<{ [key: number]: number }>({})
  const { navigateWithScroll } = useScrollNavigation()
  const { agregarAlCarrito } = useCart()

  const { productos: productosFromStore, categorias: categoriasFromStore } = useStore()

  const categoriasNombres = categoriasFromStore.map((cat) => cat.nombre)

  const [productos, setProductos] = useState<Producto[]>([])

  useEffect(() => {
    if (productosFromStore.length > 0) {
      setProductos(productosFromStore)
    }
  }, [productosFromStore])

  const [addedToCart, setAddedToCart] = useState<number | null>(null)
  const [showCotizacionPanel, setShowCotizacionPanel] = useState(false)

  const [favoritos, setFavoritos] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortBy, setSortBy] = useState<SortOption>("relevancia")
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Producto | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [recentlyViewed, setRecentlyViewed] = useState<Producto[]>([])
  const [showPromo, setShowPromo] = useState(true)

  const heroRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  // REMOVED: productsRef (from useInView)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const productsSectionRef = useRef<HTMLDivElement>(null)

  // State for category dropdown and scroll ref
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const categoryScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedFavoritos = localStorage.getItem("aidcom-favoritos")
    if (savedFavoritos) {
      setFavoritos(JSON.parse(savedFavoritos))
    }
    const savedRecent = localStorage.getItem("aidcom-recently-viewed")
    if (savedRecent) {
      setRecentlyViewed(JSON.parse(savedRecent))
    }
    setIsVisible(true)
    let rafId: number | null = null
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        if (heroRef.current) {
          const rect = heroRef.current.getBoundingClientRect()
          setMousePosition({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
          })
        }
        rafId = null
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("aidcom-favoritos", JSON.stringify(favoritos))
  }, [favoritos])

  // Moved map to top and updated useEffect for categoryFromUrl
  // Mapa de categorÃ­as desde URL
  const categoryMap: Record<string, string> = {
    componentes: "Componentes",
    impresoras: "Impresoras",
    accesorios: "Accesorios IT",
  }

  useEffect(() => {
    const categoriaFromUrl = searchParams.get("categoria")
    if (categoriaFromUrl && categoryMap[categoriaFromUrl]) {
      setCategoriaSeleccionada(categoryMap[categoriaFromUrl])
      // Scroll to products section after a short delay
      setTimeout(() => {
        productsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }, [searchParams])

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  const addToRecentlyViewed = (producto: Producto) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== producto.id)
      const updated = [producto, ...filtered].slice(0, 6)
      localStorage.setItem("aidcom-recently-viewed", JSON.stringify(updated))
      return updated
    })
  }

  const handleAgregarAlCarrito = (producto: Producto) => {
    const cantidad = cantidades[producto.id] || 1
    const texto = encodeURIComponent(`Hola, quiero cotizar: ${producto.nombre} x${cantidad}`)
    window.open(`https://wa.me/5491149988089?text=${texto}`, "_blank")
  }

  // Filtrado de productos
  const productosFiltrados = useMemo(() => {
    return productos
      .filter((producto) => {
        const matchesSearch =
          producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
        // Usando `categoriaSeleccionada`
        const matchesCategory = categoriaSeleccionada === "Todas" || producto.categoria === categoriaSeleccionada
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        const aFav = favoritos.includes(a.id) ? 0 : 1
        const bFav = favoritos.includes(b.id) ? 0 : 1
        if (aFav !== bFav) return aFav - bFav

        const aStock = a.sinStock ? 1 : 0
        const bStock = b.sinStock ? 1 : 0
        if (aStock !== bStock) return aStock - bStock

        switch (sortBy) {
          case "nombre":
            return a.nombre.localeCompare(b.nombre)
          default:
            return 0
        }
      })
  }, [productos, busqueda, categoriaSeleccionada, sortBy, favoritos])

  const sortOptions = [
    { value: "relevancia", label: "Relevancia" },
    { value: "nombre", label: "Nombre A-Z" },
  ]

  const handleScrollToProducts = () => {
    navigateWithScroll("/tienda", "productos")
  }

  const scrollCategories = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = 200
      categoryScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const categoryIcons: { [key: string]: React.ReactNode } = {
    Todas: <Package className="w-4 h-4" />,
    Notebooks: <Laptop className="w-4 h-4" />,
    "PCs Desktop": <Monitor className="w-4 h-4" />,
    Monitores: <Monitor className="w-4 h-4" />,
    Impresoras: <Printer className="w-4 h-4" />,
    Redes: <Wifi className="w-4 h-4" />,
    "Accesorios IT": <Headphones className="w-4 h-4" />,
    "Tintas y Consumibles": <Droplet className="w-4 h-4" />,
  }

  return (
    <>
      {/* Promo Banner - Cambiado a colores dorados */}
      {showPromo && (
        <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-slate-900 py-2.5 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[length:20px_20px]" />
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 text-sm font-medium relative">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>Envío en compras +$100.000</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>Hasta 12 cuotas sin interes</span>
            </div>
            <button
              onClick={() => setShowPromo(false)}
              className="absolute right-4 p-1 hover:bg-black/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Hero Section - RediseÃ±ado con fondo limpio y armonizado */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 py-12"
      >
        {/* Background effects */}
        <div className="absolute inset-0">
          {/* Mouse-following orb - mas sutil */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 transition-all duration-700 ease-out pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 70%)",
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Grid pattern - mas sutil */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Orbs estÃ¡ticos - reducidos y mas sutiles */}
          <div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] animate-pulse"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-yellow-500/8 rounded-full blur-[100px] animate-pulse"
            style={{ animationDuration: "10s", animationDelay: "2s" }}
          />

          {/* Floating particles - reducidos a solo 20 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${8 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6 backdrop-blur-sm">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">Tienda Oficial Aidcom</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            <span className="text-white">Tecnología para</span>
            <span className="block mt-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              tu Negocio
            </span>
          </h1>

          <p className="text-lg text-white/80 mb-2 max-w-3xl mx-auto leading-relaxed">
            Hardware, software y soluciones tecnologícas para impulsar tu empresa
          </p>
          <p className="text-base text-white/60 mb-6 max-w-2xl mx-auto">
            Notebooks, computadoras, servidores, equipamiento de red, perifericos y energia solar.
            <br />
            <span className="text-amber-400 font-semibold">Mas de 500 productos</span> con entrega en 24hs y garantía
            oficial.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <button
              onClick={handleScrollToProducts}
              className="group relative px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl font-semibold text-gray-900 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Ver Productos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              href="/contacto"
              className="group relative px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
            >
              Solicitar Cotización
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            <div className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Truck className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/50">Envío</p>
                <p className="text-sm font-semibold text-white/90">Compras +$100.000</p>
              </div>
            </div>
            <div className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/50">Garantía oficial</p>
                <p className="text-sm font-semibold text-white/90">Todos los productos</p>
              </div>
            </div>
            <div className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <CreditCard className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/50">Hasta 12 cuotas</p>
                <p className="text-sm font-semibold text-white/90">Sin interes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Actualizado id para el ancla de productos */}
      <section id="productos" ref={productsSectionRef} className="py-8 px-4 sm:px-6 lg:px-8 bg-[#ededed]">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa]" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-[#ddd] text-[#333] placeholder:text-[#aaa] focus:outline-none focus:border-[#3483fa] focus:shadow-[0_0_0_3px_rgba(52,131,250,0.12)] transition-all text-sm"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-all duration-200 ${
                showFilters
                  ? "bg-[#3483fa]/10 border-[#3483fa]/40 text-[#3483fa]"
                  : "bg-white border-[#ddd] text-[#666] hover:border-[#bbb] hover:text-[#444]"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filtros</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white border border-[#ddd] text-[#666] hover:border-[#bbb] hover:text-[#444] transition-all duration-200 text-sm"
              >
                <ArrowUpDown className="w-4 h-4" />
                <span className="hidden sm:inline">Ordenar</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showSortMenu ? "rotate-180" : ""}`} />
              </button>
              {showSortMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 py-1 rounded-lg bg-white border border-[#e3e8ee] shadow-lg shadow-black/8 z-50">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value as SortOption)
                        setShowSortMenu(false)
                      }}
                      className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                        sortBy === option.value ? "bg-[#3483fa]/10 text-[#3483fa]" : "text-[#333] hover:bg-[#f5f5f5]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex rounded-lg border border-[#ddd] overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 transition-all duration-200 ${viewMode === "grid" ? "bg-[#3483fa]/10 text-[#3483fa]" : "bg-white text-[#aaa] hover:text-[#666] hover:bg-[#f8f9fb]"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 transition-all duration-200 ${viewMode === "list" ? "bg-[#3483fa]/10 text-[#3483fa]" : "bg-white text-[#aaa] hover:text-[#666] hover:bg-[#f8f9fb] border-l border-[#ddd]"}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="mb-6 p-4 rounded-md bg-white border border-[#e3e8ee]">
            <div className="flex items-center justify-between">
              <p className="text-[#666] text-sm">Filtrar por categoría usando los botones de arriba</p>
              <button
                onClick={() => {
                  setBusqueda("")
                  setCategoriaSeleccionada("Todas")
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-sm text-[#3483fa] hover:bg-[#3483fa]/10 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Limpiar filtros
              </button>
            </div>
          </div>
        )}

        <div className="mb-6">
          {/* Mobile: Dropdown selector */}
          <div className="md:hidden relative mb-3">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-md bg-white border border-[#c5c5c5] text-[#333] text-sm"
            >
              <div className="flex items-center gap-2">
                {categoryIcons[categoriaSeleccionada]}
                <span className="font-medium">{categoriaSeleccionada}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[#999] transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`}
              />
            </button>
            {showCategoryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 py-1 rounded-md bg-white border border-[#e3e8ee] shadow-lg z-50 max-h-80 overflow-y-auto">
                {["Todas", ...categoriasNombres].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategoriaSeleccionada(cat)
                      setShowCategoryDropdown(false)
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                      categoriaSeleccionada === cat
                        ? "bg-[#3483fa]/10 text-[#3483fa]"
                        : "text-[#333] hover:bg-[#f5f5f5]"
                    }`}
                  >
                    {categoryIcons[cat]}
                    <span>{cat}</span>
                    {categoriaSeleccionada === cat && <Check className="w-3.5 h-3.5 ml-auto" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop: Horizontal scrollable with arrows */}
          <div className="hidden md:block relative">
            {/* Left scroll button */}
            <button
              onClick={() => scrollCategories("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-[#c5c5c5] text-[#666] hover:border-[#999] flex items-center justify-center shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Scrollable container */}
            <div
              ref={categoryScrollRef}
              className="flex gap-1.5 overflow-x-auto scrollbar-hide mx-10 py-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {["Todas", ...categoriasNombres].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoriaSeleccionada(cat)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm whitespace-nowrap transition-all ${
                    categoriaSeleccionada === cat
                      ? "bg-[#3483fa] text-white"
                      : "bg-white text-[#666] hover:bg-[#f5f5f5] border border-[#c5c5c5]"
                  }`}
                >
                  {categoryIcons[cat]}
                  <span>{cat}</span>
                </button>
              ))}
            </div>

            {/* Right scroll button */}
            <button
              onClick={() => scrollCategories("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-[#c5c5c5] text-[#666] hover:border-[#999] flex items-center justify-center shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Products count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-[#666] text-sm">
            {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? "s" : ""} encontrado
            {productosFiltrados.length !== 1 ? "s" : ""}
          </p>
          {favoritos.length > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-[#3483fa]">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>
                {favoritos.length} favorito{favoritos.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        {/* Products Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
              : "flex flex-col gap-3"
          }
        >
          {productosFiltrados.map((producto, index) => {
            const isFavorito = favoritos.includes(producto.id)
            const isAdded = addedToCart === producto.id
            const isOutOfStock = producto.sinStock === true
            const isLowStock = !isOutOfStock && producto.pocoStock === true

            if (viewMode === "list") {
              return (
                <div
                  key={producto.id}
                  className={`group flex gap-4 p-3 bg-white rounded-lg border transition-all duration-200 cursor-pointer ${
                    isOutOfStock
                      ? "border-[#e3e8ee]/80 opacity-70"
                      : "border-[#e3e8ee] hover:border-[#3483fa]/60 hover:shadow-[0_2px_16px_-2px_rgba(52,131,250,0.15),0_1px_4px_-1px_rgba(0,0,0,0.06)]"
                  }`}
                  onClick={() => {
                    setQuickViewProduct(producto)
                    addToRecentlyViewed(producto)
                  }}
                >
                  <div className="relative w-28 h-28 flex-shrink-0 bg-[#fafafa] rounded-lg overflow-hidden">
                    <Image
                      src={producto.imagen || "/placeholder.svg?height=300&width=300&query=producto"}
                      alt={producto.nombre}
                      fill
                      className={`object-contain p-2 ${isOutOfStock ? "grayscale" : ""}`}
                      sizes="112px"
                    />
                    {isOutOfStock && (
                      <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-[#333] text-white text-[9px] font-semibold uppercase tracking-wider z-10">
                        Sin stock
                      </div>
                    )}
                    {isLowStock && (
                      <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-[#f5a623] text-white text-[9px] font-semibold uppercase tracking-wider z-10">
                        Poco stock
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col min-w-0">
                    <h3 className={`text-sm font-normal line-clamp-2 leading-snug ${isOutOfStock ? "text-[#999]" : "text-[#333]"}`}>{producto.nombre}</h3>
                    <div className="mt-auto pt-2">
                      {isOutOfStock ? (
                        <p className="text-xs text-[#999] font-normal">No disponible</p>
                      ) : isLowStock ? (
                        <p className="text-xs text-[#f5a623] font-medium">Queda poco stock</p>
                      ) : (
                        <p className="text-xs text-[#00a650] font-medium">Envío</p>
                      )}
                    </div>
                    <button
                      disabled={isOutOfStock}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!isOutOfStock) handleAgregarAlCarrito(producto)
                      }}
                      className={`mt-2 self-start px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                        isOutOfStock
                          ? "bg-[#f0f2f5] text-[#aaa] cursor-not-allowed"
                          : isAdded
                            ? "bg-[#00a650] text-white shadow-sm shadow-[#00a650]/20"
                            : "bg-[#3483fa] text-white hover:bg-[#2968c8] shadow-sm shadow-[#3483fa]/20 hover:shadow-md hover:shadow-[#3483fa]/25"
                      }`}
                    >
                      {isOutOfStock ? "Sin stock" : isAdded ? "Cotizado" : "Cotizar"}
                    </button>
                  </div>
                </div>
              )
            }

            return (
              <div
                key={producto.id}
                className={`group bg-white rounded-lg border transition-all duration-200 overflow-hidden cursor-pointer ${
                  isOutOfStock
                    ? "border-[#e3e8ee]/80 opacity-70"
                    : "border-[#e3e8ee] hover:border-[#3483fa]/60 hover:shadow-[0_2px_16px_-2px_rgba(52,131,250,0.15),0_1px_4px_-1px_rgba(0,0,0,0.06)]"
                }`}
                onClick={() => {
                  setQuickViewProduct(producto)
                  addToRecentlyViewed(producto)
                }}
              >
                {/* Image */}
                <div className="relative aspect-square bg-[#fafafa] p-4 flex items-center justify-center">
                  <Image
                    src={producto.imagen || "/placeholder.svg?height=300&width=300&query=producto"}
                    alt={producto.nombre}
                    fill
                    className={`object-contain ${isOutOfStock ? " grayscale" : ""}`}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  {isOutOfStock && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#333] text-white text-[10px] font-semibold uppercase tracking-wider z-10">
                      Sin stock
                    </div>
                  )}
                  {isLowStock && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#f5a623] text-white text-[10px] font-semibold uppercase tracking-wider z-10">
                      Poco stock
                    </div>
                  )}
                  {!isOutOfStock && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorito(producto.id)
                      }}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
                        isFavorito
                          ? "bg-[#3483fa]/10 text-[#3483fa] shadow-sm"
                          : "bg-white/90 text-[#bbb] hover:text-[#3483fa] hover:bg-white shadow-sm"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFavorito ? "fill-current" : ""}`} />
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="px-3 pb-3 pt-0">
                  <p className={`text-[13px] font-normal line-clamp-2 leading-snug min-h-[2.5rem] ${isOutOfStock ? "text-[#999]" : "text-[#333]"}`}>
                    {producto.nombre}
                  </p>
                  {isOutOfStock ? (
                    <p className="text-xs text-[#999] font-normal mt-1">No disponible</p>
                  ) : isLowStock ? (
                    <p className="text-xs text-[#f5a623] font-medium mt-1">Queda poco stock</p>
                  ) : (
                    <p className="text-xs text-[#00a650] font-medium mt-1">Envío</p>
                  )}
                  <button
                    disabled={isOutOfStock}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!isOutOfStock) handleAgregarAlCarrito(producto)
                    }}
                    className={`w-full mt-2.5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                      isOutOfStock
                        ? "bg-[#f0f2f5] text-[#aaa] cursor-not-allowed"
                        : isAdded
                          ? "bg-[#00a650] text-white shadow-sm shadow-[#00a650]/20"
                          : "bg-[#3483fa] text-white hover:bg-[#2968c8] shadow-sm shadow-[#3483fa]/20 hover:shadow-md hover:shadow-[#3483fa]/25"
                    }`}
                  >
                    {isOutOfStock ? "Sin stock" : isAdded ? "Cotizado" : "Cotizar"}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* No products found */}
        {productosFiltrados.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-[#f5f5f5] border border-[#e3e8ee] flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-[#999]" />
            </div>
            <h3 className="text-lg font-normal text-[#333] mb-1">No se encontraron productos</h3>
            <p className="text-sm text-[#999]">Probá con otros filtros o términos de búsqueda</p>
          </div>
        )}

        {/* Recently viewed */}
        {recentlyViewed.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-normal text-[#333] mb-4">Vistos recientemente</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {recentlyViewed.map((producto) => (
                <div
                  key={producto.id}
                  onClick={() => setQuickViewProduct(producto)}
                  className="cursor-pointer bg-white rounded-lg border border-[#e3e8ee] hover:border-[#3483fa]/60 hover:shadow-[0_2px_16px_-2px_rgba(52,131,250,0.15),0_1px_4px_-1px_rgba(0,0,0,0.06)] transition-all duration-200 overflow-hidden"
                >
                  <div className="relative aspect-square bg-[#fafafa] p-2 flex items-center justify-center">
                    <Image
                      src={producto.imagen || "/placeholder.svg?height=150&width=150&query=producto"}
                      alt={producto.nombre}
                      fill
                      className="object-contain p-1"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    />
                  </div>
                  <div className="px-2 pb-2">
                    <h4 className="text-xs font-normal text-[#333] line-clamp-2 leading-snug">{producto.nombre}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-xl bg-white shadow-[0_25px_60px_-12px_rgba(0,0,0,0.25)]">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 text-[#666] hover:bg-[#3483fa] hover:text-white flex items-center justify-center transition-all duration-200 z-10 shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-square bg-[#fafafa] p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#e3e8ee]">
                <Image
                  src={quickViewProduct.imagen || "/placeholder.svg?height=500&width=500&query=producto"}
                  alt={quickViewProduct.nombre}
                  fill
                  className={`object-contain p-4 ${quickViewProduct.sinStock ? "grayscale" : ""}`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {quickViewProduct.sinStock && (
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#333] text-white text-xs font-semibold uppercase tracking-wider z-10">
                    Sin stock
                  </div>
                )}
                {quickViewProduct.pocoStock && !quickViewProduct.sinStock && (
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#f5a623] text-white text-xs font-semibold uppercase tracking-wider z-10">
                    Poco stock
                  </div>
                )}
              </div>

              <div className="flex flex-col p-6">
                <span className="text-xs text-[#3483fa] font-medium">{quickViewProduct.categoria}</span>
                <h2 className={`text-xl font-normal mt-1 leading-snug ${quickViewProduct.sinStock ? "text-[#999]" : "text-[#333]"}`}>{quickViewProduct.nombre}</h2>

                <div className="mt-4">
                  {quickViewProduct.sinStock ? (
                    <p className="text-sm text-[#999] font-normal">No disponible</p>
                  ) : quickViewProduct.pocoStock ? (
                    <p className="text-sm text-[#f5a623] font-medium">Queda poco stock</p>
                  ) : (
                    <p className="text-sm text-[#00a650] font-medium">Envío a todo el país</p>
                  )}
                </div>

                <div className="mt-4 p-3 rounded-lg bg-[#f8f9fb] border border-[#e3e8ee]">
                  {quickViewProduct.sinStock ? (
                    <div className="flex items-center gap-2 text-[#999] text-sm">
                      <X className="w-4 h-4" />
                      <span>Sin stock actualmente</span>
                    </div>
                  ) : quickViewProduct.pocoStock ? (
                    <>
                      <div className="flex items-center gap-2 text-[#f5a623] text-sm font-medium">
                        <Check className="w-4 h-4" />
                        <span>Quedan pocas unidades</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#666] text-sm mt-1.5">
                        <Truck className="w-4 h-4" />
                        <span>Llega en 24 a 48 horas</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-[#00a650] text-sm font-medium">
                        <Check className="w-4 h-4" />
                        <span>Stock disponible</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#666] text-sm mt-1.5">
                        <Truck className="w-4 h-4" />
                        <span>Llega en 24 a 48 horas</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-auto pt-6 flex gap-2">
                  <button
                    disabled={quickViewProduct.sinStock}
                    onClick={() => {
                      if (!quickViewProduct.sinStock) handleAgregarAlCarrito(quickViewProduct)
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                      quickViewProduct.sinStock
                        ? "bg-[#f0f2f5] text-[#aaa] cursor-not-allowed"
                        : addedToCart === quickViewProduct.id
                          ? "bg-[#00a650] text-white shadow-sm shadow-[#00a650]/20"
                          : "bg-[#3483fa] text-white hover:bg-[#2968c8] shadow-sm shadow-[#3483fa]/20 hover:shadow-md hover:shadow-[#3483fa]/25"
                    }`}
                  >
                    {quickViewProduct.sinStock ? (
                      "Sin stock"
                    ) : addedToCart === quickViewProduct.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        Cotizado
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Cotizar
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleFavorito(quickViewProduct.id)}
                    className={`px-4 py-3 rounded-lg transition-all duration-200 border ${
                      favoritos.includes(quickViewProduct.id)
                        ? "border-[#3483fa]/40 bg-[#3483fa]/10 text-[#3483fa] shadow-sm shadow-[#3483fa]/10"
                        : "border-[#e3e8ee] bg-white text-[#888] hover:border-[#3483fa]/40 hover:text-[#3483fa] hover:bg-[#3483fa]/5"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${favoritos.includes(quickViewProduct.id) ? "fill-current" : ""}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  )
}


