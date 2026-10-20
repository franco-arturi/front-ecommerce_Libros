import { Link } from 'react-router-dom'
import { formatoPrecio } from '../../utils/formato.js'

function TarjetaLibro({ libro }) {
  return (
    <article className="tarjeta-libro">
      <div className={`portada portada-${(libro.id % 4) + 1}`} aria-hidden="true">
        <span>{libro.titulo.slice(0, 1)}</span>
      </div>

      <div className="tarjeta-contenido">
        <span className="tarjeta-categoria">{libro.categoria.nombre}</span>
        <h3>{libro.titulo}</h3>
        <p>{libro.autor}</p>

        <div className="tarjeta-pie">
          <strong>{formatoPrecio.format(libro.precio)}</strong>
          <Link to={`/libros/${libro.id}`} aria-label={`Ver detalle de ${libro.titulo}`}>
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  )
}

export default TarjetaLibro
