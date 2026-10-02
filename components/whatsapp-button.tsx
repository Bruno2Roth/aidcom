"use client"

import { AIDCOM_CONTACT } from "@/lib/contact-info"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  return (
    <a
      href={AIDCOM_CONTACT.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
