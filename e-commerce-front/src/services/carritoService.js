// Por ahora simula POST /api/carritos/{usuarioId}/items.
// El cuerpo respeta AgregarItemDTO del backend: { libroId, cantidad }.
export const agregarAlCarrito = async (libroId, cantidad) => {
  const item = { libroId, cantidad }

  return new Promise((resolver) => {
    setTimeout(() => resolver(item), 400)
  })
}
