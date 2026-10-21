import { Link } from 'react-router-dom'

function Encabezado() {
  return (
    <header className="encabezado-principal">
      <div className="contenedor encabezado-contenido">
        <Link className="marca" to="/" aria-label="Ir al inicio de Librería JU">
          <span className="marca-icono" aria-hidden="true">JU</span>
          <span>Librería JU</span>
        </Link>

        <nav className="navegacion" aria-label="Navegación principal">
          <a href="/#catalogo">Catálogo</a>
          <a href="/#categorias">Categorías</a>
          <Link to="/usuarios">Usuarios</Link>
          <Link to="/gestion/libros">Gestión</Link>
          <Link className="boton-carrito" to="/carrito" aria-label="Ir al carrito">
            <span aria-hidden="true">🛒</span>
            Carrito
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Encabezado
