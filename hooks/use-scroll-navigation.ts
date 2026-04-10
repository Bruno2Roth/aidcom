"use client"

import { useRouter } from "next/navigation"

export function useScrollNavigation() {
  const router = useRouter()

  const navigateWithScroll = (path: string, sectionId?: string) => {
    // Si estamos en la misma página y hay una sección
    if (window.location.pathname === path && sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      return
    }

    // Si vamos a otra página
    if (path !== window.location.pathname) {
      // Primero navegamos a la página
      router.push(path)

      // Si hay una sección específica, hacemos scroll después de que cargue
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId)
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        }, 100)
      } else {
        // Si no hay sección, vamos al principio
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "instant" })
        }, 0)
      }
    }
  }

  return { navigateWithScroll }
}
