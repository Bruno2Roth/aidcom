import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const siteUrl = "https://aidcom.netlify.app"
const publicRoutes = [
  "/",
  "/contacto/",
  "/egmm/",
  "/energia-solar/empresas/",
  "/energia-solar/hogar-oficina-comercio/",
  "/energias-renovables/",
  "/eset/",
  "/manageengine/",
  "/microsoft/",
  "/reparaciones/",
  "/segmento/empresas/",
  "/segmento/hogar-oficina-comercio/",
  "/seguridad/",
  "/servicios-informaticos/",
  "/tienda/",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({ url: new URL(route, siteUrl).toString() }))
}
