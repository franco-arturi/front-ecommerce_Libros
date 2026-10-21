import ItemCarrito from './ItemCarrito.jsx'

function ListaCarrito({ items, alActualizarCantidad, alQuitarDelCarrito }) {
  if (items.length === 0) {
    return (
      <div className="carrito-vacio" role="status">
        <h3>Tu carrito está vacío</h3>
        <p>Agregá libros desde el catálogo para verlos acá.</p>
      </div>
    )
  }

  return (
    <div className="lista-carrito">
      {items.map((item) => (
        <ItemCarrito
          item={item}
          alActualizarCantidad={alActualizarCantidad}
          alQuitarDelCarrito={alQuitarDelCarrito}
          key={item.libro.id}
        />
      ))}
    </div>
  )
}

export default ListaCarrito
