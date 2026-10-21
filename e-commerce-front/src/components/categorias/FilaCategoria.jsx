import FormularioCategoria from './FormularioCategoria.jsx'

function FilaCategoria({ categoria, enEdicion, alEditar, alEliminar, alGuardarEdicion, alCancelarEdicion }) {
  const tieneLibros = categoria.cantidadLibros > 0

  return (
    <>
      <tr>
        <td data-etiqueta="Categoría">
          <strong>{categoria.nombre}</strong>
          {categoria.descripcion && <span className="libro-autor">{categoria.descripcion}</span>}
        </td>
        <td data-etiqueta="Libros">
          {categoria.cantidadLibros} {categoria.cantidadLibros === 1 ? 'libro' : 'libros'}
        </td>
        <td className="libro-acciones">
          <button type="button" onClick={() => alEditar(categoria.id)}>
            Editar
          </button>
          <button
            type="button"
            className="boton-peligro"
            onClick={() => alEliminar(categoria.id)}
            disabled={tieneLibros}
            title={tieneLibros ? 'No se puede eliminar: tiene libros asociados' : undefined}
            aria-label={`Eliminar ${categoria.nombre}`}
          >
            Eliminar
          </button>
        </td>
      </tr>

      {enEdicion && (
        <tr className="fila-expandida">
          <td colSpan={3}>
            <FormularioCategoria
              categoria={categoria}
              alGuardar={alGuardarEdicion}
              alCancelar={alCancelarEdicion}
            />
          </td>
        </tr>
      )}
    </>
  )
}

export default FilaCategoria
