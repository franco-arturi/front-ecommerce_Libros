import { useState } from 'react'

function AdministradorImagenes({ imagenes, alAgregarImagen, alEliminarImagen, alCerrar }) {
  const [url, setUrl] = useState('')

  const manejarEnvio = (evento) => {
    evento.preventDefault()
    if (url.trim() === '') return

    alAgregarImagen(url.trim())
    setUrl('')
  }

  return (
    <div className="administrador-imagenes">
      {imagenes.length === 0 ? (
        <p className="imagenes-vacio">Este libro todavía no tiene imágenes cargadas.</p>
      ) : (
        <ul className="lista-imagenes">
          {imagenes.map((imagen) => (
            <li key={imagen.id}>
              <span>{imagen.url}</span>
              <button type="button" onClick={() => alEliminarImagen(imagen.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      <form className="formulario-imagen" onSubmit={manejarEnvio}>
        <label>
          <span className="texto-solo-lectores">URL de la nueva imagen</span>
          <input
            type="text"
            value={url}
            onChange={(evento) => setUrl(evento.target.value)}
            placeholder="/img/libros/nueva-imagen.jpg"
          />
        </label>
        <button type="submit">Agregar imagen</button>
      </form>

      <button type="button" className="boton-secundario" onClick={alCerrar}>
        Cerrar
      </button>
    </div>
  )
}

export default AdministradorImagenes
