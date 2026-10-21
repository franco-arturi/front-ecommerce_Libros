import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListaCarrito from '../components/carrito/ListaCarrito.jsx'
import ResumenCompra from '../components/carrito/ResumenCompra.jsx'
import BotonFinalizarCompra from '../components/carrito/BotonFinalizarCompra.jsx'
import { obtenerCarrito, actualizarCantidadCarrito, quitarDelCarrito, vaciarCarrito } from '../services/carritoService.js'
import { obtenerDetalleLibro } from '../services/catalogoService.js'

const combinarConLibros = async (itemsCarrito) => {
  const items = await Promise.all(
    itemsCarrito.map(async ({ libroId, cantidad }) => {
      const { libro } = await obtenerDetalleLibro(libroId)
      return { libro, cantidad }
    }),
  )

  return items
}

function CarritoPagina() {
  const [items, setItems] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [finalizando, setFinalizando] = useState(false)
  const [compraFinalizada, setCompraFinalizada] = useState(false)

  useEffect(() => {
    let componenteActivo = true

    obtenerCarrito()
      .then(combinarConLibros)
      .then((itemsObtenidos) => {
        if (componenteActivo) setItems(itemsObtenidos)
      })
      .catch(() => {
        if (componenteActivo) {
          setError('No pudimos cargar el carrito. Intentá nuevamente más tarde.')
        }
      })
      .finally(() => {
        if (componenteActivo) setCargando(false)
      })

    return () => {
      componenteActivo = false
    }
  }, [])

  const actualizarCantidad = (libroId, cantidad) => {
    if (cantidad <= 0) {
      quitarDelCarrito(libroId)
      setItems((itemsPrevios) => itemsPrevios.filter((item) => item.libro.id !== libroId))
      return
    }

    actualizarCantidadCarrito(libroId, cantidad)
    setItems((itemsPrevios) =>
      itemsPrevios.map((item) => (item.libro.id === libroId ? { ...item, cantidad } : item)),
    )
  }

  const quitarItem = (libroId) => {
    quitarDelCarrito(libroId)
    setItems((itemsPrevios) => itemsPrevios.filter((item) => item.libro.id !== libroId))
  }

  const cantidadTotal = items.reduce((total, item) => total + item.cantidad, 0)
  const precioTotal = items.reduce((total, item) => total + item.libro.precio * item.cantidad, 0)

  const finalizarCompra = () => {
    setFinalizando(true)

    vaciarCarrito()
      .then(() => {
        setItems([])
        setCompraFinalizada(true)
      })
      .finally(() => setFinalizando(false))
  }

  if (compraFinalizada) {
    return (
      <main className="contenedor carrito-confirmacion">
        <h1>¡Gracias por tu compra!</h1>
        <p>Te enviamos la confirmación por correo electrónico.</p>
        <Link className="boton-volver" to="/">
          Volver al catálogo
        </Link>
      </main>
    )
  }

  return (
    <main className="contenedor carrito" id="carrito">
      <h1>Carrito y compra</h1>

      {cargando && <p className="estado-catalogo" role="status">Cargando carrito…</p>}
      {error && <p className="estado-catalogo error" role="alert">{error}</p>}

      {!cargando && !error && (
        <div className="carrito-contenido">
          <ListaCarrito items={items} alActualizarCantidad={actualizarCantidad} alQuitarDelCarrito={quitarItem} />

          {items.length > 0 && (
            <div className="carrito-lateral">
              <ResumenCompra cantidadTotal={cantidadTotal} precioTotal={precioTotal} />
              <BotonFinalizarCompra
                deshabilitado={items.length === 0}
                finalizando={finalizando}
                alFinalizarCompra={finalizarCompra}
              />
            </div>
          )}
        </div>
      )}
    </main>
  )
}

export default CarritoPagina
