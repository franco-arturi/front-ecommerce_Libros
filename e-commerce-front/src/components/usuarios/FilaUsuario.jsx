import { textoRol } from './textoRol.js'

function FilaUsuario({ usuario, alVer }) {
  const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`

  return (
    <tr>
      <td data-etiqueta="Usuario">
        <div className="usuario-identidad">
          <span className="usuario-iniciales" aria-hidden="true">
            {usuario.nombre.charAt(0)}
            {usuario.apellido.charAt(0)}
          </span>
          <div>
            <strong>{nombreCompleto}</strong>
            <span className="usuario-alias">@{usuario.username}</span>
          </div>
        </div>
      </td>
      <td data-etiqueta="Email">{usuario.email}</td>
      <td data-etiqueta="Rol">
        <span className={`usuario-rol rol-${usuario.rol.toLowerCase()}`}>
          {textoRol(usuario.rol)}
        </span>
      </td>
      <td className="usuario-accion">
        <button
          type="button"
          onClick={() => alVer(usuario.id)}
          aria-label={`Ver datos de ${nombreCompleto}`}
        >
          Ver
        </button>
      </td>
    </tr>
  )
}

export default FilaUsuario
