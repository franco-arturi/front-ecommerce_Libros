import FilaCategoria from './FilaCategoria.jsx'

function ListaCategorias({ categorias, categoriaEnEdicion, alEditar, alEliminar, alGuardarEdicion, alCancelarEdicion }) {
  if (categorias.length === 0) {
    return (
      <div className="gestion-estado" role="status">
        <h3>Todavía no hay categorías cargadas</h3>
        <p>Agregá una categoría nueva para organizar el catálogo.</p>
      </div>
    )
  }

  return (
    <table className="tabla-gestion">
      <caption className="texto-solo-lectores">Categorías</caption>
      <thead>
        <tr>
          <th scope="col">Categoría</th>
          <th scope="col">Libros</th>
          <th scope="col">
            <span className="texto-solo-lectores">Acciones</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {categorias.map((categoria) => (
          <FilaCategoria
            categoria={categoria}
            enEdicion={categoriaEnEdicion === categoria.id}
            alEditar={alEditar}
            alEliminar={alEliminar}
            alGuardarEdicion={alGuardarEdicion}
            alCancelarEdicion={alCancelarEdicion}
            key={categoria.id}
          />
        ))}
      </tbody>
    </table>
  )
}

export default ListaCategorias
