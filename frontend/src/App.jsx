
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Nosotros from './components/Nosotros';
import Servicios from './components/Servicios';
import Proyectos from './components/Proyectos';
import Contacto from './components/Contacto';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Hero />
        <Nosotros />
        <Servicios />
        <Proyectos />
        <Contacto />
      </main>

      <Footer />
    </div>
  );
}

export default App;
