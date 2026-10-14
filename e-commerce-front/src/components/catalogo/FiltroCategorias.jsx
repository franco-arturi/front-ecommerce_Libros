function FiltroCategorias({ categorias, seleccionada, alSeleccionar }) {
  return (
    <div className="filtro-categorias" id="categorias" aria-label="Filtrar por categoría">
      <button
        className={seleccionada === null ? 'categoria activa' : 'categoria'}
        type="button"
        onClick={() => alSeleccionar(null)}
      >
        Todas
      </button>

      {categorias.map((categoria) => (
        <button
          className={seleccionada === categoria.id ? 'categoria activa' : 'categoria'}
          type="button"
          key={categoria.id}
          onClick={() => alSeleccionar(categoria.id)}
        >
          {categoria.nombre}
        </button>
      ))}
    </div>
  )
}

export default FiltroCategorias
