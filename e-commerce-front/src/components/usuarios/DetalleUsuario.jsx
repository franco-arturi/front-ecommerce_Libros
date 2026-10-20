import { textoRol } from './textoRol.js'

function DetalleUsuario({ usuario, alVolver }) {
  return (
    <article className="detalle-usuario" aria-labelledby="titulo-detalle-usuario">
      <div className="detalle-usuario-cabecera">
        <span className="usuario-iniciales grande" aria-hidden="true">
          {usuario.nombre.charAt(0)}
          {usuario.apellido.charAt(0)}
        </span>
        <div>
          <h3 id="titulo-detalle-usuario">
            {usuario.nombre} {usuario.apellido}
          </h3>
          <span className={`usuario-rol rol-${usuario.rol.toLowerCase()}`}>
            {textoRol(usuario.rol)}
          </span>
        </div>
      </div>

      <dl className="detalle-usuario-datos">
        <div>
          <dt>Nombre de usuario</dt>
          <dd>@{usuario.username}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{usuario.email}</dd>
        </div>
        <div>
          <dt>Número de usuario</dt>
          <dd>{usuario.id}</dd>
        </div>
      </dl>

      <button className="boton-volver" type="button" onClick={alVolver}>
        Volver al listado
      </button>
    </article>
  )
}

export default DetalleUsuario
