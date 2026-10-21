import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Encabezado from './components/comunes/Encabezado.jsx'
import DetalleLibroPagina from './pages/DetalleLibroPagina.jsx'
import InicioPagina from './pages/InicioPagina.jsx'
import ResultadosPagina from './pages/ResultadosPagina.jsx'
import UsuariosPagina from './pages/UsuariosPagina.jsx'
import CarritoPagina from './pages/CarritoPagina.jsx'
import GestionLibrosPagina from './pages/GestionLibrosPagina.jsx'
import AccesoPagina from './pages/AccesoPagina.jsx'
import './App.css'

function App() {
  // Usuario que inició sesión. Vive en App para que el encabezado y
  // la pantalla de acceso lo compartan (se les pasa por props).
  const [usuario, setUsuario] = useState(null)

  const cerrarSesion = () => setUsuario(null)

  return (
    <>
      <Encabezado usuario={usuario} alCerrarSesion={cerrarSesion} />
      <Routes>
        <Route path="/" element={<InicioPagina />} />
        <Route path="/resultados" element={<ResultadosPagina />} />
        <Route path="/libros/:id" element={<DetalleLibroPagina usuario={usuario} />} />
        <Route path="/usuarios" element={<UsuariosPagina />} />
        {/* El carrito pide sesión: sin usuario se muestra el login y,
            al iniciar sesión, App se vuelve a renderizar con el carrito. */}
        <Route
          path="/carrito"
          element={
            usuario ? (
              <CarritoPagina />
            ) : (
              <AccesoPagina
                usuario={usuario}
                alIniciarSesion={setUsuario}
                alCerrarSesion={cerrarSesion}
                aviso="Iniciá sesión para ver tu carrito."
              />
            )
          }
        />
        <Route path="/gestion/libros" element={<GestionLibrosPagina />} />
        <Route
          path="/acceso"
          element={
            <AccesoPagina usuario={usuario} alIniciarSesion={setUsuario} alCerrarSesion={cerrarSesion} />
          }
        />
      </Routes>
    </>
  )
}

export default App
