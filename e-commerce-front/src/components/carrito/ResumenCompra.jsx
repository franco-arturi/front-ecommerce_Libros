import { formatoPrecio } from '../../utils/formato.js'

function ResumenCompra({ cantidadTotal, precioTotal }) {
  return (
    <aside className="resumen-compra" aria-label="Resumen de la compra">
      <h3>Resumen de compra</h3>
      <p>
        {cantidadTotal} {cantidadTotal === 1 ? 'libro' : 'libros'}
      </p>
      <p className="total">Total: {formatoPrecio.format(precioTotal)}</p>
    </aside>
  )
}

export default ResumenCompra
