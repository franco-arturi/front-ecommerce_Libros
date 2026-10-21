const obtenerJson = async (ruta) => {
  const respuesta = await fetch(ruta)

  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar ${ruta}`)
  }

  return respuesta.json()
}

const ubicacionPorLibro = {
  1: 'Buenos Aires',
  2: 'Córdoba',
  3: 'Rosario',
  4: 'Buenos Aires',
  5: 'Córdoba',
  6: 'Rosario',
}

export const obtenerCatalogo = async () => {
  const [libros, categorias] = await Promise.all([
    obtenerJson('/data/libros.json'),
    obtenerJson('/data/categorias.json'),
  ])

  return { libros, categorias }
}

export const buscarCatalogo = async ({ titulo = '', categoriaId = null } = {}) => {
  const { libros, categorias } = await obtenerCatalogo()
  const termino = titulo
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

  const librosConUbicacion = libros.map((libro) => ({
    ...libro,
    ubicacion: ubicacionPorLibro[libro.id] ?? 'Sin ubicación',
  }))

  const resultados = librosConUbicacion.filter((libro) => {
    const coincideCategoria = categoriaId === null || libro.categoria.id === categoriaId
    const tituloNormalizado = libro.titulo
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
    const autorNormalizado = libro.autor
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
    const coincideTexto = termino === '' ||
      tituloNormalizado.includes(termino) || autorNormalizado.includes(termino)

    return coincideCategoria && coincideTexto
  })

  const ubicaciones = [...new Set(librosConUbicacion.map((libro) => libro.ubicacion))]

  return { libros: resultados, categorias, ubicaciones }
}

export const obtenerDetalleLibro = async (id) => {
  const [libro, imagenes] = await Promise.all([
    obtenerJson(`/data/libros/${id}.json`),
    obtenerJson(`/data/libros/${id}/imagenes.json`),
  ])

  return { libro, imagenes }
}
