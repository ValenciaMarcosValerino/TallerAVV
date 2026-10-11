
import Hero from '../components/Hero';
import Nosotros from '../components/Nosotros';
import Servicios from '../components/Servicios';
import ProyectosDestacados from '../components/ProyectosDestacados';
import Contacto from '../components/Contacto';

function Inicio() {
  return (
    <main>
      <Hero />
      <Nosotros />
      <Servicios />
      <ProyectosDestacados />
      <Contacto />
    </main>
  );
}

export default Inicio;
