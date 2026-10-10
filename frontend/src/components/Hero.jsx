
import '../styles/Hero.css';
import PortadaAVV from '../assets/PortadaAVV.jpeg';

function Hero() {
  return (
    <section id="inicio" className="hero">

      <div className="hero-container">

        {/* COLUMNA IZQUIERDA */}
        <div className="hero-info">

          <p className="hero-subtitulo">
            TALLER DE ARQUITECTURA AVV
          </p>

          <h1 className="hero-titulo">
            Diseñamos espacios.
            <br />
            Construimos ideas.
          </h1>

          <p className="hero-descripcion">
            En Taller de Arquitectura AVV transformamos
            ideas en espacios funcionales, modernos
            y únicos. Combinamos diseño, innovación
            y arquitectura para desarrollar soluciones
            a la medida de cada proyecto.
          </p>

          {/* BOTONES */}
          <div className="hero-botones">

            <a
              href="#proyectos"
              className="hero-btn-principal"
            >
              Explorar proyectos
              <span aria-hidden="true">→</span>
            </a>

            <a
              href="#contacto"
              className="hero-btn-secundario"
            >
              Contactar
            </a>

          </div>

          <p className="hero-detalle">
            ARQUITECTURA · DISEÑO · CONSTRUCCIÓN
          </p>

        </div>

        {/* COLUMNA DERECHA */}
        <div className="hero-imagen-container">

          <img
            src={PortadaAVV}
            alt="Fachada arquitectónica contemporánea"
            className="hero-imagen"
            fetchPriority="high"
          />

          <div className="hero-imagen-etiqueta">
            TALLER DE ARQUITECTURA AVV
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
