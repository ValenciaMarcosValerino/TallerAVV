
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Inicio from './pages/Inicio';
import Portafolio from './pages/Portafolio';
import CategoriaProyectos from './pages/CategoriaProyectos';
import DetalleProyecto from './pages/DetalleProyectos';

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <Navbar />

        <Routes>

          {/* PÁGINA PRINCIPAL */}
          <Route
            path="/"
            element={<Inicio />}
          />

          {/* PORTAFOLIO GENERAL */}
          <Route
            path="/proyectos"
            element={<Portafolio />}
          />

          {/* CATEGORÍAS */}
          <Route
            path="/proyectos/:categoriaId"
            element={<CategoriaProyectos />}
          />

          {/* DETALLE DE CADA OBRA */}
          <Route
            path="/proyecto/:proyectoId"
            element={<DetalleProyecto />}
          />

          {/* RUTA NO ENCONTRADA */}
          <Route
            path="*"
            element={
              <main
                className="seccion"
                style={{ minHeight: '60vh' }}
              >
                <h1>Página no encontrada</h1>
                <p>
                  La dirección solicitada no existe.
                </p>
              </main>
            }
          />

        </Routes>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
