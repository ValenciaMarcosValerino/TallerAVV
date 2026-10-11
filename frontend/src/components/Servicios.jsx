
import { Link } from 'react-router-dom';
import '../styles/Servicios.css';

const imagenes = import.meta.glob(
  '../assets/*.{png,jpg,jpeg,webp,avif}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

function obtenerImagen(nombreArchivo) {
  const resultado = Object.entries(imagenes).find(
    ([ruta]) => {
      const nombre = ruta
        .split('/')
        .pop()
        .replace(/\.[^.]+$/, '');

      return nombre === nombreArchivo;
    }
  );

  return resultado ? resultado[1] : null;
}

// Servicios provisionales por confirmar con AVV
const servicios = [
  {
    id: 'diseno-arquitectonico',
    numero: '01',
    titulo: 'Diseño arquitectónico',
    categoria: 'DISEÑO',
    archivo: 'DisArquitectonicoAVV',
    descripcion:
      'Desarrollamos propuestas arquitectónicas funcionales y estéticas, adaptadas a las necesidades de cada espacio.',
  },
  {
    id: 'construccion',
    numero: '02',
    titulo: 'Construcción',
    categoria: 'OBRA',
    archivo: 'ConstruccionAVV',
    descripcion:
      'Planeación y ejecución de proyectos constructivos, integrando funcionalidad y soluciones de calidad.',
  },
  {
    id: 'remodelaciones',
    numero: '03',
    titulo: 'Remodelaciones',
    categoria: 'RENOVACIÓN',
    archivo: 'RemodelacionAVV',
    descripcion:
      'Transformación de espacios existentes mediante propuestas de renovación y mejoramiento arquitectónico.',
  },
  {
    id: 'visualizacion-3d',
    numero: '04',
    titulo: 'Visualización 3D',
    categoria: 'VISUALIZACIÓN',
    archivo: 'Visualizacion3DAVV',
    descripcion:
      'Representaciones visuales para comunicar propuestas de diseño y explorar soluciones arquitectónicas.',
  },
];

function Servicios() {
  return (
    <section
      id="servicios"
      className="servicios-seccion"
    >
      <div className="servicios-container">

        {/* ENCABEZADO */}
        <div className="servicios-encabezado">

          <div className="servicios-introduccion">

            <span className="servicios-etiqueta">
              02 / NUESTROS SERVICIOS
            </span>

            <h2>
              Soluciones para
              <br />
              cada espacio.
            </h2>

          </div>

          <p className="servicios-descripcion">
            En Taller de Arquitectura AVV exploramos
            las posibilidades de cada proyecto,
            integrando diseño, creatividad y
            funcionalidad para ofrecer soluciones
            arquitectónicas a la medida.
          </p>

        </div>

        {/* TARJETAS */}
        <div className="servicios-lista">

          {servicios.map((servicio) => {
            const imagen = obtenerImagen(
              servicio.archivo
            );

            return (
              <article
                className="servicios-tarjeta"
                key={servicio.id}
              >

                {/* IMAGEN */}
                <div className="servicios-imagen">

                  {imagen ? (
                    <img
                      src={imagen}
                      alt={`Imagen ilustrativa de ${servicio.titulo}`}
                      className="servicios-fotografia"
                      loading="lazy"
                    />
                  ) : (
                    <div className="servicios-placeholder">

                      <span
                        className="servicios-placeholder-icono"
                        aria-hidden="true"
                      >
                        ◇
                      </span>

                      <p>Imagen pendiente</p>

                      <span>
                        {servicio.archivo}
                      </span>

                    </div>
                  )}

                </div>

                {/* INFORMACIÓN */}
                <div className="servicios-tarjeta-cuerpo">

                  <div className="servicios-tarjeta-superior">

                    <span className="servicios-numero">
                      {servicio.numero}
                    </span>

                    <span className="servicios-categoria">
                      {servicio.categoria}
                    </span>

                  </div>

                  <div className="servicios-tarjeta-contenido">

                    <h3>{servicio.titulo}</h3>

                    <p>{servicio.descripcion}</p>

                  </div>

                  {/* REDIRECCIÓN A SU CATEGORÍA */}
                  <Link
                    to={`/proyectos/${servicio.id}`}
                    className="servicios-tarjeta-enlace"
                    aria-label={`Explorar proyectos de ${servicio.titulo}`}
                  >
                    Ver proyectos
                    <span aria-hidden="true">↗</span>
                  </Link>

                </div>
              </article>
            );
          })}

        </div>

        {/* LLAMADO A LA ACCIÓN */}
        <div className="servicios-cta">

          <div>
            <span className="servicios-cta-etiqueta">
              ¿TIENES UN PROYECTO EN MENTE?
            </span>

            <h3>
              Hablemos de tu próximo espacio.
            </h3>
          </div>

          <Link
            to="/#contacto"
            className="servicios-cta-boton"
          >
            Contactar
            <span aria-hidden="true">→</span>
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Servicios;
