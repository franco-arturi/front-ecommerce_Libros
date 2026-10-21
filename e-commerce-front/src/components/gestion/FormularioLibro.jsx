import { useState } from 'react'

function FormularioLibro({ libro, categorias, alGuardar, alCancelar }) {
  const [titulo, setTitulo] = useState(libro?.titulo ?? '')
  const [autor, setAutor] = useState(libro?.autor ?? '')
  const [precio, setPrecio] = useState(libro?.precio ?? '')
  const [stock, setStock] = useState(libro?.stock ?? '')
  const [categoriaId, setCategoriaId] = useState(libro?.categoria?.id ?? categorias[0]?.id ?? '')

  const manejarEnvio = (evento) => {
    evento.preventDefault()
    const categoria = categorias.find((categoriaActual) => categoriaActual.id === Number(categoriaId))

    alGuardar({
      titulo,
      autor,
      precio: Number(precio),
      stock: Number(stock),
      categoria,
    })
  }

  return (
    <form className="formulario-libro" onSubmit={manejarEnvio}>
      <label>
        Título
        <input value={titulo} onChange={(evento) => setTitulo(evento.target.value)} required />
      </label>

      <label>
        Autor
        <input value={autor} onChange={(evento) => setAutor(evento.target.value)} required />
      </label>

      <label>
        Categoría
        <select value={categoriaId} onChange={(evento) => setCategoriaId(evento.target.value)} required>
          {categorias.map((categoria) => (
            <option value={categoria.id} key={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </label>

      <label>
        Precio
        <input
          type="number"
          min="0"
          value={precio}
          onChange={(evento) => setPrecio(evento.target.value)}
          required
        />
      </label>

      <label>
        Stock
        <input
          type="number"
          min="0"
          value={stock}
          onChange={(evento) => setStock(evento.target.value)}
          required
        />
      </label>

      <div className="formulario-libro-acciones">
        <button type="button" className="boton-secundario" onClick={alCancelar}>
          Cancelar
        </button>
        <button type="submit">Guardar</button>
      </div>
    </form>
  )
}

export default FormularioLibro
