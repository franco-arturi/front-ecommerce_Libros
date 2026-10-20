import FilaUsuario from './FilaUsuario.jsx'

function ListaUsuarios({ usuarios, alVer }) {
  if (usuarios.length === 0) {
    return (
      <div className="usuarios-estado" role="status">
        <h3>Todavía no hay usuarios registrados</h3>
        <p>Los usuarios aparecen acá cuando se registran en la librería.</p>
      </div>
    )
  }

  return (
    <table className="tabla-usuarios">
      <caption className="texto-solo-lectores">Usuarios registrados</caption>
      <thead>
        <tr>
          <th scope="col">Usuario</th>
          <th scope="col">Email</th>
          <th scope="col">Rol</th>
          <th scope="col">
            <span className="texto-solo-lectores">Acciones</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <FilaUsuario usuario={usuario} alVer={alVer} key={usuario.id} />
        ))}
      </tbody>
    </table>
  )
}

export default ListaUsuarios
