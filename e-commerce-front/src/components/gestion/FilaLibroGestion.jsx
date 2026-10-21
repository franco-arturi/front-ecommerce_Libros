import { formatoPrecio } from '../../utils/formato.js'
import FormularioLibro from './FormularioLibro.jsx'
import AdministradorImagenes from './AdministradorImagenes.jsx'

function FilaLibroGestion({
  libro,
  categorias,
  enEdicion,
  libroEdicionDatos,
  enImagenes,
  imagenes,
  alEditar,
  alMostrarImagenes,
  alEliminar,
  alGuardarEdicion,
  alCancelarEdicion,
  alAgregarImagen,
  alEliminarImagen,
  alCerrarImagenes,
}) {
  return (
    <>
      <tr>
        <td data-etiqueta="Libro">
          <strong>{libro.titulo}</strong>
          <span className="libro-autor">{libro.autor}</span>
        </td>
        <td data-etiqueta="Categoría">{libro.categoria.nombre}</td>
        <td data-etiqueta="Precio">{formatoPrecio.format(libro.precio)}</td>
        <td className="libro-acciones">
          <button type="button" onClick={() => alEditar(libro.id)}>
            Editar
          </button>
          <button type="button" onClick={() => alMostrarImagenes(libro.id)}>
            Imagen
          </button>
          <button
            type="button"
            className="boton-peligro"
            onClick={() => alEliminar(libro.id)}
            aria-label={`Eliminar ${libro.titulo}`}
          >
            Eliminar
          </button>
        </td>
      </tr>

      {enEdicion && (
        <tr className="fila-expandida">
          <td colSpan={4}>
            {libroEdicionDatos ? (
              <FormularioLibro
                libro={libroEdicionDatos}
                categorias={categorias}
                alGuardar={alGuardarEdicion}
                alCancelar={alCancelarEdicion}
              />
            ) : (
              <p className="gestion-estado" role="status">
                Cargando datos del libro…
              </p>
            )}
          </td>
        </tr>
      )}

      {enImagenes && (
        <tr className="fila-expandida">
          <td colSpan={4}>
            <AdministradorImagenes
              imagenes={imagenes}
              alAgregarImagen={alAgregarImagen}
              alEliminarImagen={alEliminarImagen}
              alCerrar={alCerrarImagenes}
            />
          </td>
        </tr>
      )}
    </>
  )
}

export default FilaLibroGestion
