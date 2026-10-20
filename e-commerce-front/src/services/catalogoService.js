const obtenerJson = async (ruta) => {
  const respuesta = await fetch(ruta)

  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar ${ruta}`)
  }

  return respuesta.json()
}

export const obtenerCatalogo = async () => {
  const [libros, categorias] = await Promise.all([
    obtenerJson('/data/libros.json'),
    obtenerJson('/data/categorias.json'),
  ])

  return { libros, categorias }
}

export const obtenerDetalleLibro = async (id) => {
  const [libro, imagenes] = await Promise.all([
    obtenerJson(`/data/libros/${id}.json`),
    obtenerJson(`/data/libros/${id}/imagenes.json`),
  ])

  return { libro, imagenes }
}
