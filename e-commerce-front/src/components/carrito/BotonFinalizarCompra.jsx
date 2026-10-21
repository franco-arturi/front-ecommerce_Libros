function BotonFinalizarCompra({ deshabilitado, finalizando, alFinalizarCompra }) {
  return (
    <button
      type="button"
      className="boton-ancho"
      disabled={deshabilitado || finalizando}
      onClick={alFinalizarCompra}
    >
      {finalizando ? 'Confirmando…' : 'Finalizar compra'}
    </button>
  )
}

export default BotonFinalizarCompra
