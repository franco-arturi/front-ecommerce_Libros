import { useEffect, useState } from 'react'
import ListaLibrosGestion from '../components/gestion/ListaLibrosGestion.jsx'
import FormularioLibro from '../components/gestion/FormularioLibro.jsx'
import {
  obtenerLibrosGestion,
  obtenerLibroGestion,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
  agregarImagen,
  eliminarImagen,
} from '../services/gestionLibrosService.js'
import '../components/gestion/gestionLibros.css'

function GestionLibrosPagina() {
  const [libros, setLibros] = useState([])
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const [creandoLibro, setCreandoLibro] = useState(false)
  const [libroEnEdicion, setLibroEnEdicion] = useState(null)
  const [libroEnEdicionDatos, setLibroEnEdicionDatos] = useState(null)
  const [libroEnImagenes, setLibroEnImagenes] = useState(null)
  const [imagenesDelLibro, setImagenesDelLibro] = useState([])

  const cargarLibros = () => {
    obtenerLibrosGestion()
      .then(({ libros: librosObtenidos, categorias: categoriasObtenidas }) => {
        setLibros(librosObtenidos)
        setCategorias(categoriasObtenidas)
      })
      .catch(() => setError('No pudimos cargar los libros. Intentá nuevamente más tarde.'))
      .finally(() => setCargando(false))
  }

  useEffect(() => {
    cargarLibros()
  }, [])

  const iniciarEdicion = (id) => {
    setLibroEnImagenes(null)
    setLibroEnEdicion(id)
    obtenerLibroGestion(id).then(({ libro }) => setLibroEnEdicionDatos(libro))
  }

  const guardarEdicion = (datos) => {
    actualizarLibro(libroEnEdicion, datos).then(() => {
      setLibroEnEdicion(null)
      setLibroEnEdicionDatos(null)
      cargarLibros()
    })
  }

  const crearLibroNuevo = (datos) => {
    crearLibro(datos).then(() => {
      setCreandoLibro(false)
      cargarLibros()
    })
  }

  const eliminar = (id) => {
    eliminarLibro(id).then(() => {
      if (libroEnEdicion === id) {
        setLibroEnEdicion(null)
        setLibroEnEdicionDatos(null)
      }
      if (libroEnImagenes === id) setLibroEnImagenes(null)
      cargarLibros()
    })
  }

  const mostrarImagenes = (id) => {
    setLibroEnEdicion(null)
    obtenerLibroGestion(id).then(({ imagenes }) => {
      setLibroEnImagenes(id)
      setImagenesDelLibro(imagenes)
    })
  }

  const agregarImagenAlLibro = (url) => {
    agregarImagen(libroEnImagenes, url).then((imagen) => {
      setImagenesDelLibro((imagenesPrevias) => [...imagenesPrevias, imagen])
    })
  }

  const eliminarImagenDelLibro = (imagenId) => {
    eliminarImagen(libroEnImagenes, imagenId).then(() => {
      setImagenesDelLibro((imagenesPrevias) => imagenesPrevias.filter((imagen) => imagen.id !== imagenId))
    })
  }

  return (
    <main className="contenedor pagina-gestion">
      <div className="gestion-encabezado">
        <h1>Libros e imágenes</h1>
        <button type="button" onClick={() => setCreandoLibro(true)}>
          Nuevo libro
        </button>
      </div>

      {creandoLibro && (
        <FormularioLibro
          libro={null}
          categorias={categorias}
          alGuardar={crearLibroNuevo}
          alCancelar={() => setCreandoLibro(false)}
        />
      )}

      {cargando && <p className="gestion-estado" role="status">Cargando libros…</p>}
      {error && <p className="gestion-estado error" role="alert">{error}</p>}

      {!cargando && !error && (
        <ListaLibrosGestion
          libros={libros}
          categorias={categorias}
          libroEnEdicion={libroEnEdicion}
          libroEnEdicionDatos={libroEnEdicionDatos}
          libroEnImagenes={libroEnImagenes}
          imagenesDelLibro={imagenesDelLibro}
          alEditar={iniciarEdicion}
          alMostrarImagenes={mostrarImagenes}
          alEliminar={eliminar}
          alGuardarEdicion={guardarEdicion}
          alCancelarEdicion={() => {
            setLibroEnEdicion(null)
            setLibroEnEdicionDatos(null)
          }}
          alAgregarImagen={agregarImagenAlLibro}
          alEliminarImagen={eliminarImagenDelLibro}
          alCerrarImagenes={() => setLibroEnImagenes(null)}
        />
      )}
    </main>
  )
}

export default GestionLibrosPagina
