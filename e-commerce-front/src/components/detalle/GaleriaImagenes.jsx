import { useState } from 'react'

function GaleriaImagenes({ imagenes, titulo, libroId }) {
  const [indiceSeleccionado, setIndiceSeleccionado] = useState(0)
  const [imagenesFallidas, setImagenesFallidas] = useState([])

  const imagenSeleccionada = imagenes[indiceSeleccionado]
  const mostrarImagen =
    imagenSeleccionada !== undefined && !imagenesFallidas.includes(imagenSeleccionada.id)

  const marcarFallida = (id) => {
    setImagenesFallidas((fallidas) => [...fallidas, id])
  }

  return (
    <div className="galeria">
      <div className="galeria-principal">
        {mostrarImagen ? (
          <img
            src={imagenSeleccionada.url}
            alt={`Portada de ${titulo}`}
            onError={() => marcarFallida(imagenSeleccionada.id)}
          />
        ) : (
          <div className={`portada portada-${(libroId % 4) + 1}`} role="img" aria-label={`Portada de ${titulo}`}>
            <span>{titulo.slice(0, 1)}</span>
          </div>
        )}
      </div>

      {imagenes.length > 1 && (
        <div className="galeria-miniaturas" aria-label="Imágenes del libro">
          {imagenes.map((imagen, indice) => (
            <button
              className={indice === indiceSeleccionado ? 'miniatura activa' : 'miniatura'}
              type="button"
              key={imagen.id}
              onClick={() => setIndiceSeleccionado(indice)}
              aria-label={`Ver imagen ${indice + 1} de ${imagenes.length}`}
              aria-pressed={indice === indiceSeleccionado}
            >
              {imagenesFallidas.includes(imagen.id) ? (
                <span className={`portada portada-${(libroId % 4) + 1}`} aria-hidden="true" />
              ) : (
                <img src={imagen.url} alt="" onError={() => marcarFallida(imagen.id)} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default GaleriaImagenes
