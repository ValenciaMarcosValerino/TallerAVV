
import { Link, useParams } from 'react-router-dom';

import {
  obtenerProyecto,
  obtenerCategoria,
} from '../data/proyectos';

const imagenes = import.meta.glob(
  '../assets/*.{png,jpg,jpeg,webp,avif}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

function obtenerImagen(nombre) {
  if (!nombre) return null;

  const resultado = Object.entries(imagenes).find(
    ([ruta]) => {
      const archivo = ruta
        .split('/')
        .pop()
        .replace(/\.[^.]+$/, '');

      return archivo === nombre;
    }
  );

  return resultado ? resultado[1] : null;
}

function DetalleProyecto() {
  const { proyectoId } = useParams();

  const proyecto = obtenerProyecto(proyectoId);

  if (!proyecto) {
    return (
      <main className="proyectos-seccion">
        <div className="proyectos-container">

          <h1>Proyecto no encontrado</h1>

          <p>
            El proyecto solicitado aún no
            está registrado.
          </p>

          <Link to="/proyectos">
            Volver al portafolio
          </Link>

        </div>
      </main>
    );
  }

  const categoria = obtenerCategoria(
    proyecto.categoria
  );

  const fotografias = (
    proyecto.imagenes || []
  )
    .map((nombre) => ({
      nombre,
      src: obtenerImagen(nombre),
    }))
    .filter((foto) => foto.src !== null);

  return (
    <main className="proyectos-seccion">
      <div className="proyectos-container">

        <Link
          to={`/proyectos/${proyecto.categoria}`}
          className="nosotros-enlace"
        >
          ← Volver a {categoria?.nombre || 'Proyectos'}
        </Link>

        <div
          className="proyectos-encabezado"
          style={{ marginTop: '45px' }}
        >
          <span className="proyectos-etiqueta">
            TALLER DE ARQUITECTURA AVV
          </span>

          <div className="proyectos-presentacion">
            <h1>{proyecto.nombre}</h1>
            <p>{proyecto.descripcion}</p>
          </div>
        </div>

        <h2 style={{ marginBottom: '30px' }}>
          Galería de evidencias
        </h2>

        {fotografias.length === 0 ? (
          <div
            className="proyecto-placeholder"
            style={{ minHeight: '300px' }}
          >
            <p>
              Fotografías pendientes
            </p>
          </div>
        ) : (
          <div className="proyectos-grid">
            {fotografias.map((foto, indice) => (
              <figure
                className="proyecto-card"
                key={`${foto.nombre}-${indice}`}
              >
                <div className="proyecto-imagen">
                  <img
                    src={foto.src}
                    alt={`${proyecto.nombre} - Evidencia ${indice + 1}`}
                    className="proyecto-fotografia"
                    loading="lazy"
                  />
                </div>

                <figcaption className="proyecto-info">
                  Evidencia {indice + 1}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default DetalleProyecto;
