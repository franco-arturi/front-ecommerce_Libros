import { formatoPrecio } from '../../utils/formato.js'

function ItemCarrito({ item, alActualizarCantidad, alQuitarDelCarrito }) {
  const { libro, cantidad } = item

  return (
    <article className="item-carrito">
      <div className="item-carrito-info">
        <h3>{libro.titulo}</h3>
        <p>{libro.autor}</p>
      </div>

      <div className="selector-cantidad" aria-label={`Cantidad de ${libro.titulo}`}>
        <button
          type="button"
          onClick={() => alActualizarCantidad(libro.id, cantidad - 1)}
          aria-label={`Quitar una unidad de ${libro.titulo}`}
        >
          −
        </button>
        <span>{cantidad}</span>
        <button
          type="button"
          onClick={() => alActualizarCantidad(libro.id, cantidad + 1)}
          disabled={cantidad >= libro.stock}
          aria-label={`Agregar una unidad de ${libro.titulo}`}
        >
          +
        </button>
      </div>

      <strong className="item-carrito-precio">{formatoPrecio.format(libro.precio * cantidad)}</strong>

      <button
        type="button"
        className="boton-quitar"
        onClick={() => alQuitarDelCarrito(libro.id)}
        aria-label={`Quitar ${libro.titulo} del carrito`}
      >
        Quitar
      </button>
    </article>
  )
}

export default ItemCarrito
