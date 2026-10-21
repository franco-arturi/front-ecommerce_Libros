import { useState } from 'react'
import CampoFormulario from './CampoFormulario.jsx'

// Un mismo formulario sirve para iniciar sesión y para registrarse.
// En modo 'registro' se muestran además los campos de UsuarioRegistroDTO.
function FormularioAcceso({ modo, enviando, error, alEnviar, alCambiarModo }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')

  const esRegistro = modo === 'registro'

  const manejarEnvio = (evento) => {
    evento.preventDefault()

    if (esRegistro) {
      alEnviar({ username, email, password, nombre, apellido })
    } else {
      alEnviar({ email, password })
    }
  }

  return (
    <form className="formulario-acceso" onSubmit={manejarEnvio}>
      {esRegistro && (
        <>
          <div className="campos-dobles">
            <CampoFormulario etiqueta="Nombre" valor={nombre} alCambiar={setNombre} autoComplete="given-name" />
            <CampoFormulario etiqueta="Apellido" valor={apellido} alCambiar={setApellido} autoComplete="family-name" />
          </div>
          <CampoFormulario etiqueta="Nombre de usuario" valor={username} alCambiar={setUsername} autoComplete="username" />
        </>
      )}

      <CampoFormulario
        etiqueta="Correo electrónico"
        tipo="email"
        valor={email}
        alCambiar={setEmail}
        autoComplete="email"
      />
      <CampoFormulario
        etiqueta="Contraseña"
        tipo="password"
        valor={password}
        alCambiar={setPassword}
        autoComplete={esRegistro ? 'new-password' : 'current-password'}
      />

      {error && <p className="acceso-error" role="alert">{error}</p>}

      <button className="boton-acceso" type="submit" disabled={enviando}>
        {enviando ? 'Enviando…' : esRegistro ? 'Crear cuenta' : 'Iniciar sesión'}
      </button>

      <p className="acceso-cambio-modo">
        {esRegistro ? '¿Ya tenés cuenta?' : '¿No tenés cuenta?'}{' '}
        <button type="button" onClick={alCambiarModo}>
          {esRegistro ? 'Iniciá sesión' : 'Registrate'}
        </button>
      </p>
    </form>
  )
}

export default FormularioAcceso
