import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BotonAgregarCarrito from '../components/detalle/BotonAgregarCarrito.jsx'
import GaleriaImagenes from '../components/detalle/GaleriaImagenes.jsx'
import InformacionLibro from '../components/detalle/InformacionLibro.jsx'
import SelectorCantidad from '../components/detalle/SelectorCantidad.jsx'
import { agregarAlCarrito } from '../services/carritoService.js'
import { obtenerDetalleLibro } from '../services/catalogoService.js'

// 'usuario' llega desde App: para agregar al carrito hay que haber iniciado sesión.
function DetalleLibroPagina({ usuario }) {
  const { id } = useParams()
  const [libro, setLibro] = useState(null)
  const [imagenes, setImagenes] = useState([])
  const [cantidad, setCantidad] = useState(1)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [agregando, setAgregando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [pedirSesion, setPedirSesion] = useState(false)

  useEffect(() => {
    let componenteActivo = true
    window.scrollTo(0, 0)

    obtenerDetalleLibro(id)
      .then(({ libro: libroObtenido, imagenes: imagenesObtenidas }) => {
        if (!componenteActivo) return
        setLibro(libroObtenido)
        setImagenes(imagenesObtenidas)
      })
      .catch(() => {
        if (componenteActivo) {
          setError('No pudimos cargar este libro. Puede que no exista o que no esté disponible.')
        }
      })
      .finally(() => {
        if (componenteActivo) setCargando(false)
      })

    return () => {
      componenteActivo = false
    }
  }, [id])

  const manejarAgregar = () => {
    if (!usuario) {
      setPedirSesion(true)
      return
    }

    setAgregando(true)
    setMensaje('')

    agregarAlCarrito(libro.id, cantidad)
      .then(() => {
        setMensaje(
          `Agregaste ${cantidad} ${cantidad === 1 ? 'ejemplar' : 'ejemplares'} de ${libro.titulo} al carrito.`,
        )
      })
      .catch(() => {
        setMensaje('No pudimos agregar el libro al carrito. Intentá nuevamente.')
      })
      .finally(() => setAgregando(false))
  }

  const sinStock = libro !== null && libro.stock === 0

  return (
    <main className="contenedor detalle-libro" aria-labelledby="titulo-libro">
      <Link className="volver" to="/">
        ← Volver al catálogo
      </Link>

      {cargando && <p className="estado-catalogo" role="status">Cargando libro…</p>}
      {error && <p className="estado-catalogo error" role="alert">{error}</p>}

      {!cargando && !error && (
        <article className="detalle-contenido">
          <GaleriaImagenes imagenes={imagenes} titulo={libro.titulo} libroId={libro.id} />

          <div className="detalle-columna">
            <InformacionLibro libro={libro} />

            <div className="detalle-acciones">
              <SelectorCantidad
                cantidad={cantidad}
                maximo={libro.stock}
                alCambiar={setCantidad}
                deshabilitado={sinStock}
              />
              <BotonAgregarCarrito
                alAgregar={manejarAgregar}
                agregando={agregando}
                deshabilitado={sinStock}
              />
            </div>

            {mensaje && (
              <p className="detalle-mensaje" role="status">
                {mensaje}
              </p>
            )}

            {pedirSesion && !usuario && (
              <p className="detalle-mensaje" role="alert">
                Para agregar libros al carrito tenés que <Link to="/acceso">iniciar sesión</Link>.
              </p>
            )}
          </div>
        </article>
      )}
    </main>
  )
}

export default DetalleLibroPagina
