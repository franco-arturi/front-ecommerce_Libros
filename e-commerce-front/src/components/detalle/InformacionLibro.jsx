import { formatoPrecio } from '../../utils/formato.js'

function InformacionLibro({ libro }) {
  const hayStock = libro.stock > 0

  return (
    <div className="informacion-libro">
      <span className="tarjeta-categoria">{libro.categoria.nombre}</span>
      <h1 id="titulo-libro">{libro.titulo}</h1>
      <p className="detalle-autor">{libro.autor}</p>

      <strong className="detalle-precio">{formatoPrecio.format(libro.precio)}</strong>

      <p className={hayStock ? 'detalle-stock' : 'detalle-stock agotado'}>
        {hayStock
          ? `${libro.stock} ${libro.stock === 1 ? 'unidad disponible' : 'unidades disponibles'}`
          : 'Sin stock'}
      </p>

      <h2 className="detalle-subtitulo">Descripción</h2>
      <p className="detalle-descripcion">{libro.descripcion}</p>
    </div>
  )
}

export default InformacionLibro
