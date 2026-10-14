import { useEffect, useState } from 'react'
import Buscador from '../components/catalogo/Buscador.jsx'
import FiltroCategorias from '../components/catalogo/FiltroCategorias.jsx'
import ListaLibros from '../components/catalogo/ListaLibros.jsx'
import { obtenerCatalogo } from '../services/catalogoService.js'

const normalizar = (texto) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

function InicioPagina() {
  const [libros, setLibros] = useState([])
  const [categorias, setCategorias] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let componenteActivo = true

    obtenerCatalogo()
      .then(({ libros: librosObtenidos, categorias: categoriasObtenidas }) => {
        if (!componenteActivo) return
        setLibros(librosObtenidos)
        setCategorias(categoriasObtenidas)
      })
      .catch(() => {
        if (componenteActivo) {
          setError('No pudimos cargar el catálogo. Intentá nuevamente más tarde.')
        }
      })
      .finally(() => {
        if (componenteActivo) setCargando(false)
      })

    return () => {
      componenteActivo = false
    }
  }, [])

  const terminoNormalizado = normalizar(busqueda.trim())
  const librosVisibles = libros.filter((libro) => {
    const coincideCategoria =
      categoriaSeleccionada === null || libro.categoria.id === categoriaSeleccionada
    const coincideBusqueda =
      terminoNormalizado === '' ||
      normalizar(libro.titulo).includes(terminoNormalizado) ||
      normalizar(libro.autor).includes(terminoNormalizado)

    return coincideCategoria && coincideBusqueda
  })

  return (
    <main id="inicio">
      <section className="presentacion">
        <div className="contenedor presentacion-contenido">
          <p className="sobrelinea">Tu próxima historia empieza acá</p>
          <h1>Inicio y catálogo</h1>
          <p className="presentacion-texto">
            Buscá por título o autor y descubrí libros para cada momento.
          </p>
          <Buscador valor={busqueda} alCambiar={setBusqueda} />
        </div>
      </section>

      <section className="contenedor catalogo" id="catalogo" aria-labelledby="titulo-catalogo">
        <div className="catalogo-encabezado">
          <div>
            <p className="sobrelinea">Explorá la librería</p>
            <h2 id="titulo-catalogo">Libros destacados</h2>
          </div>
          {!cargando && !error && (
            <p className="cantidad-resultados" aria-live="polite">
              {librosVisibles.length} {librosVisibles.length === 1 ? 'libro' : 'libros'}
            </p>
          )}
        </div>

        <FiltroCategorias
          categorias={categorias}
          seleccionada={categoriaSeleccionada}
          alSeleccionar={setCategoriaSeleccionada}
        />

        {cargando && <p className="estado-catalogo" role="status">Cargando catálogo…</p>}
        {error && <p className="estado-catalogo error" role="alert">{error}</p>}
        {!cargando && !error && <ListaLibros libros={librosVisibles} />}
      </section>
    </main>
  )
}

export default InicioPagina
