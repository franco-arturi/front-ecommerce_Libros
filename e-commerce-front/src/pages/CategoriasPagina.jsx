import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListaCategorias from '../components/categorias/ListaCategorias.jsx'
import FormularioCategoria from '../components/categorias/FormularioCategoria.jsx'
import {
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from '../services/categoriaService.js'
import '../components/gestion/gestionLibros.css'
import '../components/categorias/categorias.css'

function CategoriasPagina() {
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const [creandoCategoria, setCreandoCategoria] = useState(false)
  const [categoriaEnEdicion, setCategoriaEnEdicion] = useState(null)

  const cargarCategorias = () => {
    obtenerCategorias()
      .then((categoriasObtenidas) => setCategorias(categoriasObtenidas))
      .catch(() => setError('No pudimos cargar las categorías. Intentá nuevamente más tarde.'))
      .finally(() => setCargando(false))
  }

  useEffect(() => {
    cargarCategorias()
  }, [])

  const crearCategoriaNueva = (datos) => {
    crearCategoria(datos).then(() => {
      setCreandoCategoria(false)
      cargarCategorias()
    })
  }

  const guardarEdicion = (datos) => {
    actualizarCategoria(categoriaEnEdicion, datos).then(() => {
      setCategoriaEnEdicion(null)
      cargarCategorias()
    })
  }

  const eliminar = (id) => {
    eliminarCategoria(id).then(() => {
      if (categoriaEnEdicion === id) setCategoriaEnEdicion(null)
      cargarCategorias()
    })
  }

  return (
    <main className="contenedor pagina-gestion">
      <div className="gestion-encabezado">
        <h1>Categorías</h1>
        <div className="gestion-acciones">
          <Link className="enlace-secundario" to="/gestion/libros">
            Libros
          </Link>
          <button type="button" onClick={() => setCreandoCategoria(true)}>
            Nueva categoría
          </button>
        </div>
      </div>

      {creandoCategoria && (
        <FormularioCategoria
          categoria={null}
          alGuardar={crearCategoriaNueva}
          alCancelar={() => setCreandoCategoria(false)}
        />
      )}

      {cargando && <p className="gestion-estado" role="status">Cargando categorías…</p>}
      {error && <p className="gestion-estado error" role="alert">{error}</p>}

      {!cargando && !error && (
        <ListaCategorias
          categorias={categorias}
          categoriaEnEdicion={categoriaEnEdicion}
          alEditar={(id) => {
            setCreandoCategoria(false)
            setCategoriaEnEdicion(id)
          }}
          alEliminar={eliminar}
          alGuardarEdicion={guardarEdicion}
          alCancelarEdicion={() => setCategoriaEnEdicion(null)}
        />
      )}
    </main>
  )
}

export default CategoriasPagina
