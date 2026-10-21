import { obtenerCatalogo } from './catalogoService.js'

// Simula la gestión de categorías mientras no exista el backend real.
let categoriasCreadas = []
let proximoIdCategoria = 1000
let overridesCategorias = {}
const idsEliminados = new Set()

const simularRetardo = (valor) => new Promise((resolver) => setTimeout(() => resolver(valor), 400))

// Simula GET /api/categorias. Suma cuántos libros usa cada categoría
// para no permitir borrar una que todavía tenga libros asociados.
export const obtenerCategorias = async () => {
  const { libros, categorias } = await obtenerCatalogo()
  const categoriasCatalogo = categorias
    .filter((categoria) => !idsEliminados.has(categoria.id))
    .map((categoria) => ({ ...categoria, ...overridesCategorias[categoria.id] }))

  const conCantidad = [...categoriasCatalogo, ...categoriasCreadas].map((categoria) => ({
    ...categoria,
    cantidadLibros: libros.filter((libro) => libro.categoria.id === categoria.id).length,
  }))

  return simularRetardo(conCantidad)
}

// Simula POST /api/categorias.
export const crearCategoria = async (datosCategoria) => {
  const categoria = { id: proximoIdCategoria, ...datosCategoria }
  proximoIdCategoria += 1
  categoriasCreadas = [...categoriasCreadas, categoria]

  return simularRetardo(categoria)
}

// Simula PUT /api/categorias/{id}.
export const actualizarCategoria = async (id, datosCategoria) => {
  const indiceCreada = categoriasCreadas.findIndex((categoria) => categoria.id === id)

  if (indiceCreada !== -1) {
    categoriasCreadas[indiceCreada] = { ...categoriasCreadas[indiceCreada], ...datosCategoria }
  } else {
    overridesCategorias[id] = { ...overridesCategorias[id], ...datosCategoria }
  }

  return simularRetardo({ id, ...datosCategoria })
}

// Simula DELETE /api/categorias/{id}.
export const eliminarCategoria = async (id) => {
  categoriasCreadas = categoriasCreadas.filter((categoria) => categoria.id !== id)
  idsEliminados.add(id)

  return simularRetardo({ id })
}
