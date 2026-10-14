function Buscador({ valor, alCambiar }) {
  return (
    <label className="buscador">
      <span className="texto-solo-lectores">Buscar libros por título o autor</span>
      <span className="buscador-icono" aria-hidden="true">⌕</span>
      <input
        type="search"
        value={valor}
        onChange={(evento) => alCambiar(evento.target.value)}
        placeholder="Buscar por título o autor"
      />
    </label>
  )
}

export default Buscador
