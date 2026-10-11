
import { Link } from 'react-router-dom';

import { proyectos } from '../data/Proyectos';

import '../styles/ProyectosDestacados.css';

// Buscar fotografías dentro de src/assets
const imagenes = import.meta.glob(
  '../assets/*.{png,jpg,jpeg,webp,avif}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

function obtenerImagen(nombreArchivo) {
  if (!nombreArchivo) return null;

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

function ProyectosDestacados() {
  // Tomar hasta dos obras marcadas como destacadas
  const destacados = proyectos
    .filter((proyecto) => proyecto.destacado === true)
    .slice(0, 2);

  // Mantener dos espacios en la página
  const espacios = [
    destacados[0] || null,
    destacados[1] || null,
  ];

  return (
    <section
      id="destacados"
      className="destacados-seccion"
    >
      <div className="destacados-container">

        {/* ENCABEZADO */}
        <div className="destacados-encabezado">

          <span className="destacados-etiqueta">
            04 / PROYECTOS DESTACADOS
          </span>

          <div className="destacados-presentacion">

            <h2>
              Nuestro trabajo
              <br />
              habla por nosotros.
            </h2>

            <p>
              Una selección de proyectos que refleja
              nuestro interés por el diseño,
              la funcionalidad y la transformación
              de espacios.
            </p>

          </div>
        </div>

        {/* TARJETAS DE PROYECTOS */}
        <div className="destacados-grid">

          {espacios.map((proyecto, indice) => {
            const imagen = proyecto
              ? obtenerImagen(proyecto.portada)
              : null;

            if (!proyecto) {
              return (
                <article
                  className="destacado-card"
                  key={`pendiente-${indice}`}
                >
                  <div className="destacado-imagen">

                    <div className="destacado-placeholder">

                      <span
                        className="destacado-placeholder-icono"
                        aria-hidden="true"
                      >
                        ◇
                      </span>

                      <p>
                        Próximamente
                      </p>

                      <span>
                        Proyecto destacado
                      </span>

                    </div>
                  </div>

                  <div className="destacado-info">
                    <span className="destacado-numero">
                      0{indice + 1} / AVV
                    </span>

                    <h3>
                      Proyecto por incorporar
                    </h3>
                  </div>
                </article>
              );
            }

            return (
              <article
                className="destacado-card"
                key={proyecto.id}
              >
                <Link
                  to={`/proyecto/${proyecto.id}`}
                  className="destacado-enlace-card"
                >

                  <div className="destacado-imagen">

                    {imagen ? (
                      <img
                        src={imagen}
                        alt={proyecto.nombre}
                        className="destacado-fotografia"
                        loading="lazy"
                      />
                    ) : (
                      <div className="destacado-placeholder">
                        <p>Fotografía pendiente</p>
                      </div>
                    )}

                  </div>

                  <div className="destacado-info">

                    <span className="destacado-numero">
                      0{indice + 1} / AVV
                    </span>

                    <h3>{proyecto.nombre}</h3>

                    <span className="destacado-ver">
                      Ver proyecto →
                    </span>

                  </div>

                </Link>
              </article>
            );
          })}

        </div>

        {/* BOTÓN PORTAFOLIO COMPLETO */}
        <div className="destacados-footer">

          <p>
            Descubre nuestras áreas de trabajo
            y los proyectos que incorporaremos
            a nuestro portafolio.
          </p>

          <Link
            to="/proyectos"
            className="destacados-boton"
          >
            Explorar portafolio completo
            <span aria-hidden="true">→</span>
          </Link>

        </div>

      </div>
    </section>
  );
}

export default ProyectosDestacados;
