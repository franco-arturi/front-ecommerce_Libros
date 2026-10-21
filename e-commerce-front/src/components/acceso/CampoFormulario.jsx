function CampoFormulario({ etiqueta, tipo = 'text', valor, alCambiar, autoComplete }) {
  return (
    <label className="campo-acceso">
      <span className="texto-solo-lectores">{etiqueta}</span>
      <input
        type={tipo}
        placeholder={etiqueta}
        value={valor}
        onChange={(evento) => alCambiar(evento.target.value)}
        autoComplete={autoComplete}
        required
      />
    </label>
  )
}

export default CampoFormulario
