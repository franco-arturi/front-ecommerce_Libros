import { useEffect, useState } from 'react'
import ListaUsuarios from '../components/usuarios/ListaUsuarios.jsx'
import DetalleUsuario from '../components/usuarios/DetalleUsuario.jsx'
import { obtenerUsuarioPorId, obtenerUsuarios } from '../services/usuarioService.js'
import '../components/usuarios/usuarios.css'

function UsuariosPagina() {
  // Listado (GET /api/usuarios/listarUser)
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  // Detalle (GET /api/usuarios/{id})
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
  const [cargandoDetalle, setCargandoDetalle] = useState(false)
  const [errorDetalle, setErrorDetalle] = useState('')

  // Se ejecuta una sola vez, al montar la página: trae el listado.
  useEffect(() => {
    let componenteActivo = true

    obtenerUsuarios()
      .then((usuariosObtenidos) => {
        if (componenteActivo) setUsuarios(usuariosObtenidos)
      })
      .catch(() => {
        if (componenteActivo) {
          setError('No se pudo cargar la lista de usuarios. Recargá la página para intentarlo de nuevo.')
        }
      })
      .finally(() => {
        if (componenteActivo) setCargando(false)
      })

    return () => {
      componenteActivo = false
    }
  }, [])

  // Al tocar "Ver" se pide el usuario por id, como hará la API real.
  const verUsuario = (id) => {
    setCargandoDetalle(true)
    setErrorDetalle('')

    obtenerUsuarioPorId(id)
      .then((usuario) => setUsuarioSeleccionado(usuario))
      .catch((errorObtenido) => setErrorDetalle(errorObtenido.message))
      .finally(() => setCargandoDetalle(false))
  }

  const volverAlListado = () => {
    setUsuarioSeleccionado(null)
    setErrorDetalle('')
  }

  return (
    <main className="contenedor pagina-usuarios" id="usuarios">
      <div className="usuarios-encabezado">
        <div>
          <p className="sobrelinea">Administración</p>
          <h1>Usuarios</h1>
        </div>
        {!cargando && !error && !usuarioSeleccionado && (
          <p className="cantidad-resultados" aria-live="polite">
            {usuarios.length} {usuarios.length === 1 ? 'usuario' : 'usuarios'}
          </p>
        )}
      </div>

      {cargando && <p className="usuarios-estado" role="status">Cargando usuarios…</p>}
      {error && <p className="usuarios-estado error" role="alert">{error}</p>}
      {errorDetalle && <p className="usuarios-estado error" role="alert">{errorDetalle}</p>}
      {cargandoDetalle && <p className="usuarios-estado" role="status">Cargando datos del usuario…</p>}

      {!cargando && !error && !cargandoDetalle && (
        usuarioSeleccionado
          ? <DetalleUsuario usuario={usuarioSeleccionado} alVolver={volverAlListado} />
          : <ListaUsuarios usuarios={usuarios} alVer={verUsuario} />
      )}
    </main>
  )
}

export default UsuariosPagina
