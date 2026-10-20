function BotonAgregarCarrito({ alAgregar, agregando, deshabilitado }) {
  return (
    <button
      className="boton-agregar"
      type="button"
      onClick={alAgregar}
      disabled={deshabilitado || agregando}
    >
      {agregando ? 'Agregando…' : 'Agregar al carrito'}
    </button>
  )
}

export default BotonAgregarCarrito
