function SelectorCantidad({ cantidad, maximo, alCambiar, deshabilitado }) {
  return (
    <div className="selector-cantidad" role="group" aria-label="Cantidad">
      <button
        type="button"
        onClick={() => alCambiar(cantidad - 1)}
        disabled={deshabilitado || cantidad <= 1}
        aria-label="Restar una unidad"
      >
        −
      </button>
      <span aria-live="polite">{cantidad}</span>
      <button
        type="button"
        onClick={() => alCambiar(cantidad + 1)}
        disabled={deshabilitado || cantidad >= maximo}
        aria-label="Sumar una unidad"
      >
        +
      </button>
    </div>
  )
}

export default SelectorCantidad
