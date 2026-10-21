import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Buscador from '../components/catalogo/Buscador.jsx'
import FiltroCategorias from '../components/catalogo/FiltroCategorias.jsx'
import ListaLibros from '../components/catalogo/ListaLibros.jsx'
import { buscarCatalogo } from '../services/catalogoService.js'
import { formatoPrecio } from '../utils/formato.js'

const PRECIO_MAXIMO = 50000

function ResultadosPagina() {
  const [parametros, setParametros] = useSearchParams()
  const tituloConsulta = parametros.get('q') ?? ''
  const categoriaConsulta = parametros.get('categoriaId') ?? ''
  const [termino, setTermino] = useState(tituloConsulta)
  const [precioMaximo, setPrecioMaximo] = useState(PRECIO_MAXIMO)
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState('')
  const [resultado, setResultado] = useState(null)
  const claveConsulta = JSON.stringify([tituloConsulta, categoriaConsulta])
  const resultadoActual = resultado?.clave === claveConsulta ? resultado : null
  const libros = resultadoActual?.libros ?? []
  const categorias = resultadoActual?.categorias ?? []
  const ubicaciones = resultadoActual?.ubicaciones ?? []
  const cargando = resultadoActual === null
  const error = resultadoActual?.error ?? ''

  useEffect(() => {
    let componenteActivo = true

    buscarCatalogo({
      titulo: tituloConsulta,
      categoriaId: categoriaConsulta ? Number(categoriaConsulta) : null,
    })
      .then(({ libros: librosObtenidos, categorias: categoriasObtenidas, ubicaciones: ubicacionesObtenidas }) => {
        if (!componenteActivo) return
        setResultado({
          clave: claveConsulta,
          libros: librosObtenidos,
          categorias: categoriasObtenidas,
          ubicaciones: ubicacionesObtenidas,
          error: '',
        })
      })
      .catch(() => {
        if (componenteActivo) {
          setResultado({
            clave: claveConsulta,
            libros: [],
            categorias: [],
            ubicaciones: [],
            error: 'No pudimos cargar los resultados. Intentá nuevamente.',
          })
        }
      })

    return () => {
      componenteActivo = false
    }
  }, [tituloConsulta, categoriaConsulta, claveConsulta])

  const librosVisibles = libros.filter((libro) => {
    const coincidePrecio = libro.precio <= precioMaximo
    const coincideUbicacion =
      ubicacionSeleccionada === '' || libro.ubicacion === ubicacionSeleccionada
    return coincidePrecio && coincideUbicacion
  })

  const buscar = (nuevoTermino) => {
    setTermino(nuevoTermino)
    setParametros((actuales) => {
      const siguientes = new URLSearchParams(actuales)
      if (nuevoTermino) siguientes.set('q', nuevoTermino)
      else siguientes.delete('q')
      return siguientes
    })
  }

  const seleccionarCategoria = (categoriaId) => {
    setParametros((actuales) => {
      const siguientes = new URLSearchParams(actuales)
      if (categoriaId === null) siguientes.delete('categoriaId')
      else siguientes.set('categoriaId', String(categoriaId))
      return siguientes
    })
  }

  return (
    <main className="contenedor catalogo pagina-resultados">
      <div className="resultados-superior">
        <Link className="volver" to="/">← Volver al inicio</Link>
        <Buscador valor={termino} alCambiar={setTermino} alBuscar={buscar} />
      </div>

      <div className="catalogo-encabezado resultados-encabezado">
        <div>
          <p className="sobrelinea">Explorá la librería</p>
          <h1>Resultados</h1>
          {tituloConsulta && <p className="resultados-consulta">Búsqueda: “{tituloConsulta}”</p>}
        </div>
        {!cargando && !error && (
          <p className="cantidad-resultados" aria-live="polite">
            {librosVisibles.length} {librosVisibles.length === 1 ? 'libro' : 'libros'}
          </p>
        )}
      </div>

      <div className="resultados-layout">
        <aside className="filtros-resultados" aria-label="Filtros de libros">
          <p className="sobrelinea">Categoría</p>
          <FiltroCategorias
            categorias={categorias}
            seleccionada={categoriaConsulta ? Number(categoriaConsulta) : null}
            alSeleccionar={seleccionarCategoria}
          />

          <div className="filtro-precio">
            <label htmlFor="precio-maximo">Precio máximo</label>
            <strong>{formatoPrecio.format(precioMaximo)}</strong>
            <input
              id="precio-maximo"
              type="range"
              min="10000"
              max={PRECIO_MAXIMO}
              step="1000"
              value={precioMaximo}
              onChange={(evento) => setPrecioMaximo(Number(evento.target.value))}
            />
          </div>

          <div className="filtro-ubicacion">
            <label htmlFor="ubicacion-libro">Ubicación</label>
            <select
              id="ubicacion-libro"
              value={ubicacionSeleccionada}
              onChange={(evento) => setUbicacionSeleccionada(evento.target.value)}
            >
              <option value="">Todas</option>
              {ubicaciones.map((ubicacion) => (
                <option key={ubicacion} value={ubicacion}>{ubicacion}</option>
              ))}
            </select>
          </div>

        </aside>

        <section className="resultados-listado" aria-label="Libros encontrados">
          {cargando && <p className="estado-catalogo" role="status">Buscando libros…</p>}
          {error && <p className="estado-catalogo error" role="alert">{error}</p>}
          {!cargando && !error && <ListaLibros libros={librosVisibles} />}
        </section>
      </div>
    </main>
  )
}

export default ResultadosPagina