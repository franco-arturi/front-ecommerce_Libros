function Buscador({ valor, alCambiar, alBuscar }) {
  return (
    <form
      className="buscador"
      onSubmit={(evento) => {
        evento.preventDefault()
        alBuscar?.(valor.trim())
      }}
    >
      <span className="texto-solo-lectores">Buscar libros por título o autor</span>
      <span className="buscador-icono" aria-hidden="true">⌕</span>
      <input
        type="search"
        value={valor}
        onChange={(evento) => alCambiar(evento.target.value)}
        placeholder="Buscar por título o autor"
      />
      <button className="buscador-enviar" type="submit" aria-label="Buscar libros">
        Buscar
      </button>
    </form>
  )
}

export default Buscador
