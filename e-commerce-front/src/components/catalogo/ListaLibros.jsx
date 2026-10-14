import TarjetaLibro from './TarjetaLibro.jsx'

function ListaLibros({ libros }) {
  if (libros.length === 0) {
    return (
      <div className="sin-resultados" role="status">
        <h3>No encontramos libros</h3>
        <p>Probá con otro título, autor o categoría.</p>
      </div>
    )
  }

  return (
    <div className="lista-libros">
      {libros.map((libro) => (
        <TarjetaLibro libro={libro} key={libro.id} />
      ))}
    </div>
  )
}

export default ListaLibros
