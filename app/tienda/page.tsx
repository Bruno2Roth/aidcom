"use client"

import type React from "react"
import { useState, useEffect, useRef, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  X,
  Check,
  Heart,
  Eye,
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
  HardDrive,
  Wifi,
  Cpu,
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

type SortOption = "relevancia" | "precio-asc" | "precio-desc" | "nombre" | "nuevo"
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

  const [favoritos, setFavoritos] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortBy, setSortBy] = useState<SortOption>("relevancia")
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Producto | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000])
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
  // Mapa de categorías desde URL
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
    agregarAlCarrito(producto, cantidad)
    setAddedToCart(producto.id)
    setTimeout(() => setAddedToCart(null), 1500)
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
        const matchesPrice = producto.precio >= priceRange[0] && producto.precio <= priceRange[1]
        return matchesSearch && matchesCategory && matchesPrice
      })
      .sort((a, b) => {
        const aFav = favoritos.includes(a.id) ? 0 : 1
        const bFav = favoritos.includes(b.id) ? 0 : 1
        if (aFav !== bFav) return aFav - bFav

        switch (sortBy) {
          case "precio-asc":
            return a.precio - b.precio
          case "precio-desc":
            return b.precio - a.precio
          case "nombre":
            return a.nombre.localeCompare(b.nombre)
          default:
            return 0
        }
      })
  }, [productos, busqueda, categoriaSeleccionada, priceRange, sortBy, favoritos])

  const sortOptions = [
    { value: "relevancia", label: "Relevancia" },
    { value: "precio-asc", label: "Menor precio" },
    { value: "precio-desc", label: "Mayor precio" },
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
              <span>Envío gratis en compras +$100.000</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>Hasta 12 cuotas sin interés</span>
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

      {/* Hero Section - Rediseñado con fondo limpio y armonizado */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 py-12"
      >
        {/* Background effects */}
        <div className="absolute inset-0">
          {/* Mouse-following orb - más sutil */}
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

          {/* Grid pattern - más sutil */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Orbs estáticos - reducidos y más sutiles */}
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
            Hardware, software y soluciones tecnológicas para impulsar tu empresa
          </p>
          <p className="text-base text-white/60 mb-6 max-w-2xl mx-auto">
            Notebooks, computadoras, servidores, equipamiento de red, periféricos y energía solar.
            <br />
            <span className="text-amber-400 font-semibold">Más de 500 productos</span> con entrega en 24hs y garantía
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
              Consultar Precios
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            <div className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Truck className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/50">Envío gratis</p>
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
                <p className="text-sm font-semibold text-white/90">Sin interés</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Actualizado id para el ancla de productos */}
      <section id="productos" ref={productsSectionRef} className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-950">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                showFilters
                  ? "bg-amber-500/20 border-amber-500/30 text-amber-400"
                  : "bg-white/5 border-white/10 text-white/70 hover:border-white/20"
              }`}
            >
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filtros</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:border-white/20 transition-all"
              >
                <ArrowUpDown className="w-5 h-5" />
                <span className="hidden sm:inline">Ordenar</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showSortMenu ? "rotate-180" : ""}`} />
              </button>
              {showSortMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 py-2 rounded-xl bg-slate-800 border border-white/10 shadow-xl z-50">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value as SortOption)
                        setShowSortMenu(false)
                      }}
                      className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                        sortBy === option.value ? "bg-amber-500/20 text-amber-400" : "text-white/70 hover:bg-white/5"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex rounded-xl border border-white/10 overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 transition-colors ${viewMode === "grid" ? "bg-amber-500/20 text-amber-400" : "bg-white/5 text-white/40 hover:text-white/70"}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 transition-colors ${viewMode === "list" ? "bg-amber-500/20 text-amber-400" : "bg-white/5 text-white/40 hover:text-white/70"}`}
              >
                <LayoutList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-white/70 mb-3">Rango de precio</label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0] || ""}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500/50"
                  />
                  <span className="text-white/40">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1] === 10000000 ? "" : priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 10000000])}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setBusqueda("")
                    // Usando `setCategoriaSeleccionada`
                    setCategoriaSeleccionada("Todas")
                    setPriceRange([0, 10000000])
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Limpiar filtros
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          {/* Mobile: Dropdown selector */}
          <div className="md:hidden relative mb-4">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
            >
              <div className="flex items-center gap-3">
                {categoryIcons[categoriaSeleccionada]}
                <span className="font-medium">{categoriaSeleccionada}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-white/60 transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`}
              />
            </button>
            {showCategoryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 py-2 rounded-xl bg-slate-800 border border-white/10 shadow-xl z-50 max-h-80 overflow-y-auto">
                {["Todas", ...categoriasNombres].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategoriaSeleccionada(cat)
                      setShowCategoryDropdown(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      categoriaSeleccionada === cat
                        ? "bg-amber-500/20 text-amber-400"
                        : "text-white/70 hover:bg-white/5"
                    }`}
                  >
                    {categoryIcons[cat]}
                    <span>{cat}</span>
                    {categoriaSeleccionada === cat && <Check className="w-4 h-4 ml-auto" />}
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-slate-900/90 border border-white/10 text-white/70 hover:text-white hover:bg-slate-800 transition-all shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Scrollable container */}
            <div
              ref={categoryScrollRef}
              className="flex gap-2 overflow-x-auto scrollbar-hide mx-10 py-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {["Todas", ...categoriasNombres].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoriaSeleccionada(cat)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    categoriaSeleccionada === cat
                      ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg shadow-amber-500/25"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
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
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-slate-900/90 border border-white/10 text-white/70 hover:text-white hover:bg-slate-800 transition-all shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-white/50 text-sm">
            {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? "s" : ""} encontrado
            {productosFiltrados.length !== 1 ? "s" : ""}
          </p>
          {favoritos.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-amber-400">
              <Heart className="w-4 h-4 fill-current" />
              <span>
                {favoritos.length} favorito{favoritos.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        {/* Products Grid/List */}
        <div
          // REMOVED: ref={productsRef.ref}
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {productosFiltrados.map((producto, index) => {
            const isFavorito = favoritos.includes(producto.id)
            const cantidad = cantidades[producto.id] || 1
            const isAdded = addedToCart === producto.id

            if (viewMode === "list") {
              return (
                <div
                  key={producto.id}
                  className="group flex gap-6 p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-500/30 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: "backwards" }}
                >
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
                    <Image
                      src={producto.imagen || "/placeholder.svg?height=300&width=300&query=producto"}
                      alt={producto.nombre}
                      fill
                      className="object-cover"
                    />
                    {isFavorito && (
                      <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                        <Heart className="w-3 h-3 text-red-400 fill-current" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        {/* Usando `categoriaSeleccionada` */}
                        <span className="text-xs text-amber-400 font-medium">{producto.categoria}</span>
                        <h3 className="text-lg font-semibold text-white mt-1">{producto.nombre}</h3>
                        <p className="text-white/50 text-sm mt-1 line-clamp-2">{producto.descripcion}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleFavorito(producto.id)}
                          className={`p-2 rounded-lg transition-all ${
                            isFavorito ? "bg-red-500/20 text-red-400" : "bg-white/5 text-white/40 hover:text-red-400"
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${isFavorito ? "fill-current" : ""}`} />
                        </button>
                        <button
                          onClick={() => {
                            setQuickViewProduct(producto)
                            addToRecentlyViewed(producto)
                          }}
                          className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-amber-400 transition-all"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4">
                      <span className="text-2xl font-bold text-white">${producto.precio.toLocaleString("es-AR")}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                          <button
                            onClick={() =>
                              setCantidades((prev) => ({ ...prev, [producto.id]: Math.max(1, cantidad - 1) }))
                            }
                            className="p-1.5 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-white font-medium w-8 text-center">{cantidad}</span>
                          <button
                            onClick={() => setCantidades((prev) => ({ ...prev, [producto.id]: cantidad + 1 }))}
                            className="p-1.5 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleAgregarAlCarrito(producto)}
                          disabled={isAdded}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                            isAdded
                              ? "bg-emerald-500 text-white"
                              : "bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:opacity-90"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-4 h-4" />
                              Agregado
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4" />
                              Agregar
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <div
                key={producto.id}
                className="group relative rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-500/30 transition-all duration-500 overflow-hidden animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: "backwards" }}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-white/5">
                  <Image
                    src={producto.imagen || "/placeholder.svg?height=300&width=300&query=producto"}
                    alt={producto.nombre}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorito(producto.id)
                    }}
                    className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-sm transition-all z-10 ${
                      isFavorito
                        ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                        : "bg-white/80 text-slate-500 hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorito ? "fill-current" : ""}`} />
                  </button>

                  <button
                    onClick={() => {
                      setQuickViewProduct(producto)
                      addToRecentlyViewed(producto)
                    }}
                    className="absolute top-3 right-14 p-2.5 rounded-full bg-white/80 text-slate-500 hover:bg-amber-500 hover:text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Category badge */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                    <span className="text-xs font-medium text-white">{producto.categoria}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                    {producto.nombre}
                  </h3>
                  <p className="text-white/50 text-sm mt-1 line-clamp-2">{producto.descripcion}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-white">${producto.precio.toLocaleString("es-AR")}</span>
                    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                      <button
                        onClick={() => setCantidades((prev) => ({ ...prev, [producto.id]: Math.max(1, cantidad - 1) }))}
                        className="p-1 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white font-medium w-6 text-center text-sm">{cantidad}</span>
                      <button
                        onClick={() => setCantidades((prev) => ({ ...prev, [producto.id]: cantidad + 1 }))}
                        className="p-1 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAgregarAlCarrito(producto)}
                    disabled={isAdded}
                    className={`w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition-all ${
                      isAdded
                        ? "bg-emerald-500 text-white"
                        : "bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:opacity-90"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        Agregar al carrito
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Agregar al carrito
                      </>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* No products found */}
        {productosFiltrados.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No se encontraron productos</h3>
            <p className="text-white/50">Probá con otros filtros o términos de búsqueda</p>
          </div>
        )}

        {/* Recently viewed */}
        {recentlyViewed.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Vistos recientemente</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentlyViewed.map((producto) => (
                <div
                  key={producto.id}
                  onClick={() => setQuickViewProduct(producto)}
                  className="cursor-pointer group rounded-xl bg-white/[0.02] border border-white/10 hover:border-amber-500/30 transition-all overflow-hidden"
                >
                  <div className="relative aspect-square bg-white/5">
                    <Image
                      src={producto.imagen || "/placeholder.svg?height=150&width=150&query=producto"}
                      alt={producto.nombre}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-medium text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                      {producto.nombre}
                    </h4>
                    <p className="text-sm text-amber-400 font-semibold mt-1">
                      ${producto.precio.toLocaleString("es-AR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-2xl bg-slate-900 border border-white/10">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5">
                <Image
                  src={quickViewProduct.imagen || "/placeholder.svg?height=500&width=500&query=producto"}
                  alt={quickViewProduct.nombre}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col">
                {/* Usando `categoriaSeleccionada` */}
                <span className="text-sm text-amber-400 font-medium">{quickViewProduct.categoria}</span>
                <h2 className="text-2xl font-bold text-white mt-2">{quickViewProduct.nombre}</h2>
                <p className="text-white/60 mt-4">{quickViewProduct.descripcion}</p>

                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm mb-2">
                    <Check className="w-4 h-4" />
                    <span>Stock disponible</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Truck className="w-4 h-4" />
                    <span>Envío gratis a todo el país</span>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <span className="text-3xl font-bold text-white">
                    ${quickViewProduct.precio.toLocaleString("es-AR")}
                  </span>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                      <button
                        onClick={() =>
                          setCantidades((prev) => ({
                            ...prev,
                            [quickViewProduct.id]: Math.max(1, (prev[quickViewProduct.id] || 1) - 1),
                          }))
                        }
                        className="p-2 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white font-medium w-10 text-center">
                        {cantidades[quickViewProduct.id] || 1}
                      </span>
                      <button
                        onClick={() =>
                          setCantidades((prev) => ({
                            ...prev,
                            [quickViewProduct.id]: (prev[quickViewProduct.id] || 1) + 1,
                          }))
                        }
                        className="p-2 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        handleAgregarAlCarrito(quickViewProduct)
                      }}
                      disabled={addedToCart === quickViewProduct.id}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                        addedToCart === quickViewProduct.id
                          ? "bg-emerald-500 text-white"
                          : "bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:opacity-90"
                      }`}
                    >
                      {addedToCart === quickViewProduct.id ? (
                        <>
                          <Check className="w-5 h-5" />
                          Agregado al carrito
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          Agregar al carrito
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => toggleFavorito(quickViewProduct.id)}
                      className={`p-3 rounded-xl transition-all ${
                        favoritos.includes(quickViewProduct.id)
                          ? "bg-red-500/20 text-red-400"
                          : "bg-white/5 text-white/40 hover:text-red-400"
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${favoritos.includes(quickViewProduct.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  )
}
