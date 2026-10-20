import { Route, Routes } from 'react-router-dom'
import Encabezado from './components/comunes/Encabezado.jsx'
import DetalleLibroPagina from './pages/DetalleLibroPagina.jsx'
import InicioPagina from './pages/InicioPagina.jsx'
import UsuariosPagina from './pages/UsuariosPagina.jsx'
import './App.css'

function App() {
  return (
    <>
      <Encabezado />
      <Routes>
        <Route path="/" element={<InicioPagina />} />
        <Route path="/libros/:id" element={<DetalleLibroPagina />} />
        <Route path="/usuarios" element={<UsuariosPagina />} />
      </Routes>
    </>
  )
}

export default App
