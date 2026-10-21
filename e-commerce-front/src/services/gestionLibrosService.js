import { obtenerCatalogo, obtenerDetalleLibro } from './catalogoService.js'

// Simula la gestión de libros e imágenes mientras no exista el backend real.
let librosCreados = []
let proximoIdLibro = 1000
let overridesLibros = {}
const idsEliminados = new Set()
let imagenesPorLibro = {}
let proximoIdImagen = 1000

const simularRetardo = (valor) => new Promise((resolver) => setTimeout(() => resolver(valor), 400))

// Simula GET /api/libros (vista de administración).
export const obtenerLibrosGestion = async () => {
  const { libros, categorias } = await obtenerCatalogo()
  const librosCatalogo = libros
    .filter((libro) => !idsEliminados.has(libro.id))
    .map((libro) => ({ ...libro, ...overridesLibros[libro.id] }))

  return simularRetardo({ libros: [...librosCatalogo, ...librosCreados], categorias })
}

// Simula GET /api/libros/{id} e GET /api/libros/{id}/imagenes juntos.
export const obtenerLibroGestion = async (id) => {
  const libroCreado = librosCreados.find((libro) => libro.id === id)

  if (libroCreado) {
    if (!imagenesPorLibro[id]) imagenesPorLibro[id] = []
    return simularRetardo({ libro: libroCreado, imagenes: imagenesPorLibro[id] })
  }

  const { libro, imagenes } = await obtenerDetalleLibro(id)
  if (!imagenesPorLibro[id]) imagenesPorLibro[id] = imagenes

  return simularRetardo({ libro: { ...libro, ...overridesLibros[id] }, imagenes: imagenesPorLibro[id] })
}

// Simula POST /api/libros.
export const crearLibro = async (datosLibro) => {
  const libro = { id: proximoIdLibro, stock: 0, ...datosLibro }
  proximoIdLibro += 1
  librosCreados = [...librosCreados, libro]
  imagenesPorLibro[libro.id] = []

  return simularRetardo(libro)
}

// Simula PUT /api/libros/{id}.
export const actualizarLibro = async (id, datosLibro) => {
  const indiceCreado = librosCreados.findIndex((libro) => libro.id === id)

  if (indiceCreado !== -1) {
    librosCreados[indiceCreado] = { ...librosCreados[indiceCreado], ...datosLibro }
  } else {
    overridesLibros[id] = { ...overridesLibros[id], ...datosLibro }
  }

  return simularRetardo({ id, ...datosLibro })
}

// Simula DELETE /api/libros/{id}.
export const eliminarLibro = async (id) => {
  librosCreados = librosCreados.filter((libro) => libro.id !== id)
  idsEliminados.add(id)

  return simularRetardo({ id })
}

// Simula POST /api/libros/{id}/imagenes.
export const agregarImagen = async (libroId, url) => {
  const imagen = { id: proximoIdImagen, url }
  proximoIdImagen += 1
  imagenesPorLibro[libroId] = [...(imagenesPorLibro[libroId] ?? []), imagen]

  return simularRetardo(imagen)
}

// Simula DELETE /api/imagenes/{id}.
export const eliminarImagen = async (libroId, imagenId) => {
  imagenesPorLibro[libroId] = (imagenesPorLibro[libroId] ?? []).filter((imagen) => imagen.id !== imagenId)

  return simularRetardo({ libroId, imagenId })
}
