import { Link } from 'react-router-dom'

// Se muestra después de iniciar sesión, con los datos de GET /api/usuarios/{id}.
function BienvenidaUsuario({ usuario, alCerrarSesion }) {
  return (
    <div className="bienvenida-usuario">
      <span className="acceso-iniciales" aria-hidden="true">
        {usuario.nombre.charAt(0)}
        {usuario.apellido.charAt(0)}
      </span>
      <h2>¡Hola, {usuario.nombre}!</h2>
      <p>
        Ingresaste como <strong>@{usuario.username}</strong>
        <br />
        {usuario.email}
      </p>

      <Link className="boton-acceso" to="/gestion/libros">
        Entrar
      </Link>
      <button className="boton-cerrar-sesion" type="button" onClick={alCerrarSesion}>
        Cerrar sesión
      </button>
    </div>
  )
}

export default BienvenidaUsuario
