import { useState } from 'react'

function FormularioCategoria({ categoria, alGuardar, alCancelar }) {
  const [nombre, setNombre] = useState(categoria?.nombre ?? '')
  const [descripcion, setDescripcion] = useState(categoria?.descripcion ?? '')

  const manejarEnvio = (evento) => {
    evento.preventDefault()
    if (nombre.trim() === '') return

    alGuardar({ nombre: nombre.trim(), descripcion: descripcion.trim() })
  }

  return (
    <form className="formulario-libro formulario-categoria" onSubmit={manejarEnvio}>
      <label>
        Nombre
        <input value={nombre} onChange={(evento) => setNombre(evento.target.value)} required />
      </label>

      <label>
        Descripción
        <textarea
          rows="3"
          value={descripcion}
          onChange={(evento) => setDescripcion(evento.target.value)}
        />
      </label>

      <div className="formulario-libro-acciones">
        <button type="button" className="boton-secundario" onClick={alCancelar}>
          Cancelar
        </button>
        <button type="submit">Guardar</button>
      </div>
    </form>
  )
}

export default FormularioCategoria
