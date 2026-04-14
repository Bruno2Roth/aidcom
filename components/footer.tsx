import Link from "next/link"
import { MapPin, Phone, Mail, Cpu, Sun, Shield, Settings, ExternalLink, Clock } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-hero-bg text-hero-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold tracking-tight text-white">AIDCOM</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-hero-foreground/60">
                  Argentina
                </span>
              </div>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-hero-foreground/70">
              Soluciones digitales avanzadas, transformando el futuro de nuestros clientes a través de la innovación.
              Más de 30 años de experiencia en informática a su servicio.
            </p>

            <div className="mt-6">
              <a
                href="https://www.mercadolibre.com.ar/pagina/aidcom"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Visitar Tienda Online
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-hero-foreground/50">Navegación</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/" className="text-sm text-hero-foreground/70 transition-colors hover:text-primary">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios-informaticos"
                  className="flex items-center gap-2 text-sm text-hero-foreground/70 transition-colors hover:text-primary"
                >
                  <Cpu className="h-4 w-4" />
                  Servicios Informáticos
                </Link>
              </li>
              <li>
                <Link
                  href="/seguridad"
                  className="flex items-center gap-2 text-sm text-hero-foreground/70 transition-colors hover:text-primary"
                >
                  <Shield className="h-4 w-4" />
                  Soluciones de Seguridad
                </Link>
              </li>
              <li>
                <Link
                  href="/manageengine"
                  className="flex items-center gap-2 text-sm text-hero-foreground/70 transition-colors hover:text-primary"
                >
                  <Settings className="h-4 w-4" />
                  ManageEngine
                </Link>
              </li>
              <li>
                <Link
                  href="/energias-renovables"
                  className="flex items-center gap-2 text-sm text-hero-foreground/70 transition-colors hover:text-primary"
                >
                  <Sun className="h-4 w-4" />
                  Energías Renovables
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-hero-foreground/50">Contacto</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3 text-sm text-hero-foreground/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Paraná+552+Buenos+Aires"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Paraná 552 7º 74, Buenos Aires
                </a>
              </li>
              <li>
                <a
                  href="tel:+541149662431"
                  className="flex items-center gap-3 text-sm text-hero-foreground/70 transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  +54 11 4966-2431
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send/?phone=5491149988089&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-hero-foreground/70 transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  +54 9 11 4998-8089 (WhatsApp)
                </a>
              </li>
              <li>
                <a
                  href="mailto:ventas@aidcom.com.ar"
                  className="flex items-center gap-3 text-sm text-hero-foreground/70 transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  ventas@aidcom.com.ar
                </a>
              </li>
            </ul>
          </div>

          {/* Hours - Agregado doble horario: telefónico y presencial */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-hero-foreground/50">Horarios</h3>
            <ul className="flex flex-col gap-3 text-sm text-hero-foreground/70">
              {/* Horario telefónico */}
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-hero-foreground">Atención Telefónica</span>
                  <div className="text-hero-foreground/60">Lunes a Viernes</div>
                  <div className="font-medium text-hero-foreground">9:00 - 18:00 hs</div>
                </div>
              </li>
              {/* Horario presencial */}
              <li className="flex items-start gap-2 mt-2 pt-2 border-t border-white/10">
                <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-hero-foreground">Atención Presencial</span>
                  <div className="text-hero-foreground/60">Lunes a Viernes</div>
                  <div className="font-medium text-hero-foreground">9:00 - 16:00 hs</div>
                </div>
              </li>
              <li className="mt-3 pt-3 border-t border-white/10">
                <span className="text-hero-foreground/60">Soporte Técnico 24/7</span>
                <div className="font-medium text-hero-foreground">Para clientes con contrato</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-hero-foreground/50">
            2026 Aidcom Argentina. Todos los derechos reservados. Las marcas y logos son propiedad de las respectivas empresas
          </p>
        </div>
      </div>
    </footer>
  )
}
