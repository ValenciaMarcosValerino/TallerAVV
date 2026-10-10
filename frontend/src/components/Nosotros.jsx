
import '../styles/Nosotros.css';
import NosotrosAVV from '../assets/NosotrosAVV.png';

function Nosotros() {
  return (
    <section id="nosotros" className="nosotros-seccion">
      <div className="nosotros-container">

        {/* ENCABEZADO PRINCIPAL */}
        <div className="nosotros-encabezado">
          <span className="nosotros-etiqueta">
            01 / SOBRE NOSOTROS
          </span>

          <h2>
            Arquitectura que nace
            <br />
            de grandes ideas.
          </h2>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="nosotros-grid">

          {/* FOTOGRAFÍA DEL ESTUDIO */}
          <div className="nosotros-imagen">
            <img
              src={NosotrosAVV}
              alt="Imagen ilustrativa de un estudio de arquitectura con planos, maquetas y espacios de trabajo"
              className="nosotros-fotografia"
              loading="lazy"
            />
          </div>

          {/* PRESENTACIÓN DE LA EMPRESA */}
          <div className="nosotros-info">

            <span className="nosotros-subtitulo">
              NUESTRA ESENCIA
            </span>

            <h3>
              Espacios que combinan
              diseño y funcionalidad.
            </h3>

            <p>
              En Taller de Arquitectura AVV creemos que
              cada espacio debe responder a las necesidades
              de quienes lo habitan y utilizan.
            </p>

            <p>
              Nuestro enfoque busca integrar creatividad,
              funcionalidad y soluciones arquitectónicas
              para desarrollar proyectos con identidad
              propia, cuidando cada detalle del proceso.
            </p>

            <a
              href="#servicios"
              className="nosotros-enlace"
            >
              Conoce nuestros servicios
              <span aria-hidden="true">→</span>
            </a>

          </div>
        </div>

        {/* MISIÓN, VISIÓN Y VALORES */}
        <div className="nosotros-valores">

          {/* MISIÓN */}
          <article className="nosotros-card">
            <span className="nosotros-numero">01</span>

            <h3>Misión</h3>

            <p>
              Desarrollar propuestas arquitectónicas
              que integren diseño, funcionalidad y
              soluciones adaptadas a las necesidades
              de cada cliente, procurando calidad
              y atención en cada proyecto.
            </p>
          </article>

          {/* VISIÓN */}
          <article className="nosotros-card">
            <span className="nosotros-numero">02</span>

            <h3>Visión</h3>

            <p>
              Consolidarnos como un taller de arquitectura
              reconocido por la calidad de sus propuestas,
              la innovación y el desarrollo de espacios
              que aporten valor a nuestros clientes.
            </p>
          </article>

          {/* VALORES */}
          <article className="nosotros-card">
            <span className="nosotros-numero">03</span>

            <h3>Valores</h3>

            <p>
              Creatividad, responsabilidad, compromiso,
              profesionalismo, honestidad y atención
              a las necesidades de nuestros clientes
              durante cada etapa del proyecto.
            </p>
          </article>

        </div>

      </div>
    </section>
  );
}

export default Nosotros;
