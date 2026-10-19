// Acceso a los datos de usuarios.
// Por ahora lee el JSON local de /public/data, que tiene el mismo formato que
// UsuarioResponseDTO del backend: { id, username, email, nombre, apellido, rol }.
//
// Cuando se conecte con la API de Spring Boot, solo cambian las rutas:
//   obtenerUsuarios()        -> GET /api/usuarios/listarUser  (solo ADMIN, requiere token)
//   obtenerUsuarioPorId(id)  -> GET /api/usuarios/{id}        (requiere token)
// y se agrega el header Authorization: Bearer <token>.

const RUTA_USUARIOS = '/data/usuarios.json'

const obtenerJson = async (ruta) => {
  const respuesta = await fetch(ruta)

  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar ${ruta}`)
  }

  return respuesta.json()
}

export const obtenerUsuarios = async () => {
  return obtenerJson(RUTA_USUARIOS)
}

export const obtenerUsuarioPorId = async (id) => {
  // Con datos locales se busca dentro de la lista.
  // Con la API real será: obtenerJson(`/api/usuarios/${id}`)
  const usuarios = await obtenerJson(RUTA_USUARIOS)
  const usuario = usuarios.find((u) => u.id === id)

  if (!usuario) {
    // Simula la respuesta 404 del backend (RecursoNoEncontradoException).
    throw new Error(`No existe el usuario con id ${id}`)
  }

  return usuario
}
