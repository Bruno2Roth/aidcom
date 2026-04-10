import type { Producto } from "@/context/cart-context"

export const productos: Producto[] = [
  {
    id: 1,
    nombre: "Botella De Tinta Canon Modelo Gi-16 Maxify Gx6010 701 Pcreg Tinta Negro",
    descripcion: "La botella de tinta Canon GI-16 contiene una fórmula a base de tintes para producir hermosos colores. Todos sus trabajos quedarán con una calidad excepcional y adicional tendrás durabilidad asombrosa.",
    precio: 81990,
    imagen: "/canon-gi16-tinta-negro.png",
    categoria: "Tintas y Consumibles",
  },
]

export const categorias = [
  "Notebooks",
  "PCs Desktop",
  "Monitores",
  "Impresoras",
  "Redes",
  "Accesorios IT",
  "Tintas y Consumibles",
]
