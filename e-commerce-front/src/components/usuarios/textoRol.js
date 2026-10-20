// Traduce el rol que manda el backend (ADMIN, USER) a un texto para mostrar.
const nombresDeRol = {
  ADMIN: 'Administrador',
  USER: 'Cliente',
}

export const textoRol = (rol) => nombresDeRol[rol] ?? rol
