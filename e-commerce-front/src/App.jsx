import { Route, Routes } from 'react-router-dom'
import Encabezado from './components/comunes/Encabezado.jsx'
import DetalleLibroPagina from './pages/DetalleLibroPagina.jsx'
import InicioPagina from './pages/InicioPagina.jsx'
import ResultadosPagina from './pages/ResultadosPagina.jsx'
import UsuariosPagina from './pages/UsuariosPagina.jsx'
import CarritoPagina from './pages/CarritoPagina.jsx'
import './App.css'

function App() {
  return (
    <>
      <Encabezado />
      <Routes>
        <Route path="/" element={<InicioPagina />} />
        <Route path="/resultados" element={<ResultadosPagina />} />
        <Route path="/libros/:id" element={<DetalleLibroPagina />} />
        <Route path="/usuarios" element={<UsuariosPagina />} />
        <Route path="/carrito" element={<CarritoPagina />} />
      </Routes>
    </>
  )
}

export default App
