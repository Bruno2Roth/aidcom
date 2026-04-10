import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"
import { ClienteProvider } from "@/context/cliente-context"
import { StoreProvider } from "@/context/store-context"
import { ScrollToTopOnNavigate } from "@/components/scroll-to-top-on-navigate"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aidcom  - Soluciones IT",
  description:
    "Empresa argentina líder en servicios informáticos, energías renovables y venta de equipos tecnológicos. Más de 30 años de experiencia.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} font-sans antialiased bg-[#030712]`}>
        <ScrollToTopOnNavigate />
        <AuthProvider>
          <ClienteProvider>
            <StoreProvider>
              <CartProvider>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
                <WhatsAppButton />
              </CartProvider>
            </StoreProvider>
          </ClienteProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
