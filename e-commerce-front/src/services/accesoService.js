// Registro e inicio de sesión.
// Por ahora simula el backend con los JSON locales de /public/data:
//   credenciales.json -> lo que el backend tiene guardado (formato UsuarioLoginDTO: { email, password })
//   usuarios.json     -> lo que el backend responde (formato UsuarioResponseDTO)
//
// Cuando se conecte con la API de Spring Boot, cada función pasa a ser un fetch:
//   iniciarSesion(datos) -> POST /api/usuarios/login     body: { email, password }
//   registrar(datos)     -> POST /api/usuarios/register  body: { username, email, password, nombre, apellido }
// y ambas devuelven el UsuarioResponseDTO.

const CREDENCIALES_INVALIDAS = 'Email o password incorrectos'

// Usuarios registrados durante la sesión (simula lo que guardaría la base de datos).
let usuariosRegistrados = []
let credencialesRegistradas = []
let proximoIdUsuario = 1000

const simularRetardo = (valor) => new Promise((resolver) => setTimeout(() => resolver(valor), 400))

const obtenerJson = async (ruta) => {
  const respuesta = await fetch(ruta)

  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar ${ruta}`)
  }

  return respuesta.json()
}

const obtenerDatosSimulados = async () => {
  const [usuarios, credenciales] = await Promise.all([
    obtenerJson('/data/usuarios.json'),
    obtenerJson('/data/credenciales.json'),
  ])

  return {
    usuarios: [...usuarios, ...usuariosRegistrados],
    credenciales: [...credenciales, ...credencialesRegistradas],
  }
}

// Simula POST /api/usuarios/login.
export const iniciarSesion = async ({ email, password }) => {
  const { usuarios, credenciales } = await obtenerDatosSimulados()
  const emailNormalizado = email.trim().toLowerCase()

  const credencial = credenciales.find(
    (c) => c.email === emailNormalizado && c.password === password,
  )

  if (!credencial) {
    // Simula la respuesta 401 del backend (CredencialesInvalidasException).
    throw new Error(CREDENCIALES_INVALIDAS)
  }

  return simularRetardo(usuarios.find((u) => u.email === emailNormalizado))
}

// Simula POST /api/usuarios/register.
export const registrar = async ({ username, email, password, nombre, apellido }) => {
  const { usuarios } = await obtenerDatosSimulados()
  const emailNormalizado = email.trim().toLowerCase()

  // Simula la respuesta 409 del backend (RecursoDuplicadoException).
  if (usuarios.some((u) => u.email === emailNormalizado)) {
    throw new Error(`Ya existe un usuario con el email ${emailNormalizado}`)
  }
  if (usuarios.some((u) => u.username === username)) {
    throw new Error(`Ya existe un usuario con el username ${username}`)
  }

  const usuario = {
    id: proximoIdUsuario,
    username,
    email: emailNormalizado,
    nombre,
    apellido,
    rol: 'USER',
  }
  proximoIdUsuario += 1
  usuariosRegistrados = [...usuariosRegistrados, usuario]
  credencialesRegistradas = [...credencialesRegistradas, { email: emailNormalizado, password }]

  return simularRetardo(usuario)
}

// Simula GET /api/usuarios/{id}, incluyendo a los usuarios recién registrados.
export const obtenerUsuarioPorId = async (id) => {
  const { usuarios } = await obtenerDatosSimulados()
  const usuario = usuarios.find((u) => u.id === id)

  if (!usuario) {
    throw new Error(`No existe el usuario con id ${id}`)
  }

  return simularRetardo(usuario)
}
