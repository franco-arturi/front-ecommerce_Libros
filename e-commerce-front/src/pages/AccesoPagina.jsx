import { useState } from 'react'
import FormularioAcceso from '../components/acceso/FormularioAcceso.jsx'
import BienvenidaUsuario from '../components/acceso/BienvenidaUsuario.jsx'
import { iniciarSesion, obtenerUsuarioPorId, registrar } from '../services/accesoService.js'
import '../components/acceso/acceso.css'

// El usuario logueado lo guarda App y llega por props,
// así el encabezado también sabe que se inició sesión.
// 'aviso' es opcional: explica por qué se pide iniciar sesión (ej: para ver el carrito).
function AccesoPagina({ usuario, alIniciarSesion, alCerrarSesion, aviso }) {
  // 'login' (POST /login) o 'registro' (POST /register)
  const [modo, setModo] = useState('login')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  const enviarFormulario = (datos) => {
    setEnviando(true)
    setError('')

    const pedido = modo === 'registro' ? registrar(datos) : iniciarSesion(datos)

    // Con el id que devuelve login/register se piden los datos del usuario.
    pedido
      .then((usuarioObtenido) => obtenerUsuarioPorId(usuarioObtenido.id))
      .then((usuarioCompleto) => alIniciarSesion(usuarioCompleto))
      .catch((errorObtenido) => setError(errorObtenido.message))
      .finally(() => setEnviando(false))
  }

  const cambiarModo = () => {
    setModo(modo === 'login' ? 'registro' : 'login')
    setError('')
  }

  const cerrarSesion = () => {
    alCerrarSesion()
    setModo('login')
  }

  return (
    <main className="contenedor pagina-acceso">
      <section className="tarjeta-acceso" aria-labelledby="titulo-acceso">
        <div className="tarjeta-acceso-barra">
          <strong>Librería JU</strong>
          <span>Acceso</span>
        </div>

        <div className="tarjeta-acceso-contenido">
          {usuario ? (
            <BienvenidaUsuario usuario={usuario} alCerrarSesion={cerrarSesion} />
          ) : (
            <>
              <h1 id="titulo-acceso">
                {modo === 'registro' ? 'Crear cuenta' : 'Registro e inicio de sesión'}
              </h1>
              {aviso && <p className="acceso-aviso">{aviso}</p>}
              <FormularioAcceso
                modo={modo}
                enviando={enviando}
                error={error}
                alEnviar={enviarFormulario}
                alCambiarModo={cambiarModo}
              />
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default AccesoPagina
