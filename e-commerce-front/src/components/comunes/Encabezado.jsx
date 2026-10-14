function Encabezado() {
  return (
    <header className="encabezado-principal">
      <div className="contenedor encabezado-contenido">
        <a className="marca" href="#inicio" aria-label="Ir al inicio de Librería JU">
          <span className="marca-icono" aria-hidden="true">JU</span>
          <span>Librería JU</span>
        </a>

        <nav className="navegacion" aria-label="Navegación principal">
          <a href="#catalogo">Catálogo</a>
          <a href="#categorias">Categorías</a>
          <button className="boton-carrito" type="button" aria-label="Abrir carrito">
            <span aria-hidden="true">🛒</span>
            Carrito
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Encabezado
