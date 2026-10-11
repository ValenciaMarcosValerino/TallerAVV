
import { Link, useParams } from 'react-router-dom';

import {
  obtenerCategoria,
  obtenerProyectosCategoria,
} from '../data/Proyectos';

// Buscar imágenes guardadas en assets
const imagenes = import.meta.glob(
  '../assets/*.{png,jpg,jpeg,webp,avif}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

// Obtener imagen por nombre
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

function CategoriaProyectos() {
  const { categoriaId } = useParams();

  const categoria = obtenerCategoria(categoriaId);

  // Comprobar si existe la categoría
  if (!categoria) {
    return (
      <main className="proyectos-seccion">
        <div className="proyectos-container">
          <h1>Categoría no encontrada</h1>

          <p>
            La categoría solicitada no existe.
          </p>

          <Link to="/proyectos">
            ← Volver al portafolio
          </Link>
        </div>
      </main>
    );
  }

  const obras = obtenerProyectosCategoria(categoriaId);

  return (
    <main className="proyectos-seccion">
      <div className="proyectos-container">

        {/* BOTÓN REGRESAR */}
        <Link
          to="/proyectos"
          className="nosotros-enlace"
        >
          ← Volver al portafolio
        </Link>

        {/* ENCABEZADO */}
        <div
          className="proyectos-encabezado"
          style={{ marginTop: '45px' }}
        >
          <span className="proyectos-etiqueta">
            PORTAFOLIO / CATEGORÍAS
          </span>

          <div className="proyectos-presentacion">
            <h1>{categoria.nombre}</h1>

            <p>{categoria.descripcion}</p>
          </div>
        </div>

        {/* OBRAS DE LA CATEGORÍA */}
        {obras.length === 0 ? (
          <div
            className="proyecto-placeholder"
            style={{
              minHeight: '320px',
              padding: '40px 20px',
            }}
          >
            <span
              className="proyecto-placeholder-icono"
              aria-hidden="true"
            >
              ◇
            </span>

            <p>
              Próximamente agregaremos proyectos
              de esta categoría.
            </p>

            <span>
              Taller de Arquitectura AVV
            </span>
          </div>
        ) : (
          <div className="proyectos-grid">
            {obras.map((obra) => {
              const imagen = obtenerImagen(obra.portada);

              return (
                <article
                  className="proyecto-card"
                  key={obra.id}
                >
                  <Link
                    to={`/proyecto/${obra.id}`}
                    style={{
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    <div className="proyecto-imagen">
                      {imagen ? (
                        <img
                          src={imagen}
                          alt={obra.nombre}
                          className="proyecto-fotografia"
                          loading="lazy"
                        />
                      ) : (
                        <div className="proyecto-placeholder">
                          <p>Fotografía pendiente</p>
                        </div>
                      )}
                    </div>

                    <div className="proyecto-info">
                      <h3>{obra.nombre}</h3>
                      <p>{obra.descripcion}</p>

                      <span>
                        Ver evidencias →
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}

// ESTA LÍNEA ES FUNDAMENTAL
export default CategoriaProyectos;
