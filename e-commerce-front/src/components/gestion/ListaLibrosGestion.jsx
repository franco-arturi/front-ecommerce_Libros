import FilaLibroGestion from './FilaLibroGestion.jsx'

function ListaLibrosGestion({
  libros,
  categorias,
  libroEnEdicion,
  libroEnEdicionDatos,
  libroEnImagenes,
  imagenesDelLibro,
  alEditar,
  alMostrarImagenes,
  alEliminar,
  alGuardarEdicion,
  alCancelarEdicion,
  alAgregarImagen,
  alEliminarImagen,
  alCerrarImagenes,
}) {
  if (libros.length === 0) {
    return (
      <div className="gestion-estado" role="status">
        <h3>Todavía no hay libros cargados</h3>
        <p>Agregá un libro nuevo para empezar a administrar el catálogo.</p>
      </div>
    )
  }

  return (
    <table className="tabla-gestion">
      <caption className="texto-solo-lectores">Libros e imágenes</caption>
      <thead>
        <tr>
          <th scope="col">Libro</th>
          <th scope="col">Categoría</th>
          <th scope="col">Precio</th>
          <th scope="col">
            <span className="texto-solo-lectores">Acciones</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {libros.map((libro) => (
          <FilaLibroGestion
            libro={libro}
            categorias={categorias}
            enEdicion={libroEnEdicion === libro.id}
            libroEdicionDatos={libroEnEdicionDatos}
            enImagenes={libroEnImagenes === libro.id}
            imagenes={imagenesDelLibro}
            alEditar={alEditar}
            alMostrarImagenes={alMostrarImagenes}
            alEliminar={alEliminar}
            alGuardarEdicion={alGuardarEdicion}
            alCancelarEdicion={alCancelarEdicion}
            alAgregarImagen={alAgregarImagen}
            alEliminarImagen={alEliminarImagen}
            alCerrarImagenes={alCerrarImagenes}
            key={libro.id}
          />
        ))}
      </tbody>
    </table>
  )
}

export default ListaLibrosGestion
