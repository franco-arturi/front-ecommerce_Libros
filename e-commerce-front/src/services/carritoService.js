// Simula el carrito en memoria del backend mientras no exista persistencia real.
let itemsCarrito = []

const simularRetardo = (valor) => new Promise((resolver) => setTimeout(() => resolver(valor), 400))

// Por ahora simula POST /api/carritos/{usuarioId}/items.
// El cuerpo respeta AgregarItemDTO del backend: { libroId, cantidad }.
export const agregarAlCarrito = async (libroId, cantidad) => {
  const itemExistente = itemsCarrito.find((item) => item.libroId === libroId)

  itemsCarrito = itemExistente
    ? itemsCarrito.map((item) =>
        item.libroId === libroId ? { ...item, cantidad: item.cantidad + cantidad } : item,
      )
    : [...itemsCarrito, { libroId, cantidad }]

  return simularRetardo({ libroId, cantidad })
}

// Simula GET /api/carritos/{usuarioId}.
export const obtenerCarrito = async () => simularRetardo(itemsCarrito)

// Simula PUT /api/carritos/{usuarioId}/items/{libroId}.
export const actualizarCantidadCarrito = async (libroId, cantidad) => {
  itemsCarrito = itemsCarrito.map((item) => (item.libroId === libroId ? { ...item, cantidad } : item))
  return simularRetardo({ libroId, cantidad })
}

// Simula DELETE /api/carritos/{usuarioId}/items/{libroId}.
export const quitarDelCarrito = async (libroId) => {
  itemsCarrito = itemsCarrito.filter((item) => item.libroId !== libroId)
  return simularRetardo({ libroId })
}

// Simula DELETE /api/carritos/{usuarioId} tras confirmar la compra.
export const vaciarCarrito = async () => {
  itemsCarrito = []
  return simularRetardo(null)
}
