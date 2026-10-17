
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  obtenerProyecto,
  obtenerCategoria,
} from '../data/Proyectos';

import '../styles/DetalleProyectos.css';

/* ==========================================
   1. CARGAR FOTOGRAFÍAS DE ASSETS
========================================== */

const imagenes = import.meta.glob(
  '../assets/*.{png,jpg,jpeg,webp,avif}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

function obtenerImagen(nombreArchivo) {
  if (
    typeof nombreArchivo !== 'string' ||
    !nombreArchivo.trim()
  ) {
    return null;
  }

  const buscado = nombreArchivo
    .split('/')
    .pop()
    .replace(/\.[^.]+$/, '')
    .toLowerCase();

  const encontrado = Object.entries(imagenes).find(
    ([ruta]) => {
      const nombre = ruta
        .split('/')
        .pop()
        .replace(/\.[^.]+$/, '')
        .toLowerCase();

      return nombre === buscado;
    }
  );

  return encontrado ? encontrado[1] : null;
}

/* ==========================================
   2. DEFINIR ETAPAS
========================================== */

const etapas = [
  {
    clave: 'antes',
    titulo: 'Antes de la obra',
  },
  {
    clave: 'proceso',
    titulo: 'Proceso constructivo',
  },
  {
    clave: 'despues',
    titulo: 'Resultado final',
  },
];

/* ==========================================
   3. PREPARAR FOTOGRAFÍAS

   Mínimo dos espacios por etapa.
   Se permiten fotografías adicionales.
========================================== */

function prepararFotografias(proyecto, etapa) {
  const archivos =
    proyecto?.evidencias?.[etapa.clave] || [];

  const lista = Array.isArray(archivos)
    ? [...archivos]
    : [];

  // Completar hasta dos espacios
  while (lista.length < 2) {
    lista.push(null);
  }

  return lista.map((foto, indice) => {
    const archivo =
      typeof foto === 'string'
        ? foto
        : foto?.archivo || null;

    const descripcion =
      typeof foto === 'object' && foto !== null
        ? foto.descripcion ||
          `${etapa.titulo} - fotografía ${indice + 1}`
        : `${etapa.titulo} - fotografía ${indice + 1}`;

    return {
      id: `${etapa.clave}-${indice}`,
      archivo,
      descripcion,
      url: obtenerImagen(archivo),
      numero: indice + 1,
    };
  });
}

/* ==========================================
   4. COMPONENTE PRINCIPAL
========================================== */

function DetalleProyecto() {
  const { proyectoId } = useParams();

  const proyecto = obtenerProyecto(proyectoId);

  const categoria = proyecto
    ? obtenerCategoria(proyecto.categoria)
    : null;

  const [imagenActiva, setImagenActiva] = useState(null);

  // Galerías por etapa
  const grupos = etapas.map((etapa) => ({
    ...etapa,
    fotografias: prepararFotografias(
      proyecto,
      etapa
    ),
  }));

  // Únicamente fotografías que existen
  const todasLasFotos = grupos.flatMap(
    (grupo) =>
      grupo.fotografias.filter(
        (foto) => foto.url !== null
      )
  );

  /* ========================================
     5. CONTROLES DEL VISOR
  ======================================== */

  function abrirImagen(url) {
    const indice = todasLasFotos.findIndex(
      (foto) => foto.url === url
    );

    if (indice >= 0) {
      setImagenActiva(indice);
    }
  }

  function cerrarImagen() {
    setImagenActiva(null);
  }

  function imagenAnterior() {
    setImagenActiva((indice) => {
      if (
        indice === null ||
        todasLasFotos.length === 0
      ) {
        return null;
      }

      return (
        indice - 1 + todasLasFotos.length
      ) % todasLasFotos.length;
    });
  }

  function imagenSiguiente() {
    setImagenActiva((indice) => {
      if (
        indice === null ||
        todasLasFotos.length === 0
      ) {
        return null;
      }

      return (
        indice + 1
      ) % todasLasFotos.length;
    });
  }

  /* ========================================
     6. TECLADO Y BLOQUEO DE SCROLL
  ======================================== */

  useEffect(() => {
    if (imagenActiva === null) return;

    const overflowAnterior =
      document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    function manejarTeclado(evento) {
      if (evento.key === 'Escape') {
        setImagenActiva(null);
      }

      if (
        evento.key === 'ArrowRight' &&
        todasLasFotos.length > 0
      ) {
        setImagenActiva(
          (indice) =>
            (indice + 1) % todasLasFotos.length
        );
      }

      if (
        evento.key === 'ArrowLeft' &&
        todasLasFotos.length > 0
      ) {
        setImagenActiva(
          (indice) =>
            (
              indice - 1 + todasLasFotos.length
            ) % todasLasFotos.length
        );
      }
    }

    window.addEventListener(
      'keydown',
      manejarTeclado
    );

    return () => {
      document.body.style.overflow =
        overflowAnterior;

      window.removeEventListener(
        'keydown',
        manejarTeclado
      );
    };
  }, [imagenActiva, todasLasFotos.length]);

  /* ========================================
     7. PROYECTO NO ENCONTRADO
  ======================================== */

  if (!proyecto) {
    return (
      <main className="detalle-seccion">
        <div className="detalle-container">

          <h1>Proyecto no encontrado</h1>

          <p>
            Este proyecto todavía no está
            registrado en nuestro portafolio.
          </p>

          <Link
            to="/proyectos"
            className="detalle-regresar"
          >
            ← Volver al portafolio
          </Link>

        </div>
      </main>
    );
  }

  const portada = obtenerImagen(proyecto.portada);

  /* ========================================
     8. PÁGINA DEL PROYECTO
  ======================================== */

  return (
    <main className="detalle-seccion">
      <div className="detalle-container">

        {/* REGRESAR */}
        <Link
          to={
            categoria
              ? `/proyectos/${categoria.id}`
              : '/proyectos'
          }
          className="detalle-regresar"
        >
          ← Volver a proyectos
        </Link>

        {/* ENCABEZADO */}
        <header className="detalle-encabezado">

          <span className="detalle-etiqueta">
            PORTAFOLIO /{' '}
            {categoria?.nombre || 'PROYECTOS'}
          </span>

          <h1>{proyecto.nombre}</h1>

          {proyecto.descripcion && (
            <p>{proyecto.descripcion}</p>
          )}

          {(proyecto.ubicacion ||
            proyecto.anio) && (
            <div className="detalle-metadatos">

              {proyecto.ubicacion && (
                <span>{proyecto.ubicacion}</span>
              )}

              {proyecto.anio && (
                <span>{proyecto.anio}</span>
              )}

            </div>
          )}

          {proyecto.publicado === false && (
            <p>
              Vista de preparación. Este proyecto
              todavía no está publicado en el
              catálogo de AVV.
            </p>
          )}

        </header>

        {/* FOTOGRAFÍA PRINCIPAL */}
        <div className="detalle-portada">

          {portada ? (
            <img
              src={portada}
              alt={`Portada de ${proyecto.nombre}`}
            />
          ) : (
            <div className="detalle-placeholder">

              <span aria-hidden="true">◇</span>

              <p>
                Fotografía principal pendiente
              </p>

            </div>
          )}

        </div>

        {/* INTRODUCCIÓN */}
        <div className="detalle-introduccion">

          <span className="detalle-etiqueta">
            DOCUMENTACIÓN DEL PROYECTO
          </span>

          <h2>
            Evolución de la obra
          </h2>

          <p>
            Explora las distintas etapas del
            proyecto: estado original, proceso
            constructivo y resultado final.
          </p>

        </div>

        {/* TRES ETAPAS DEL PROYECTO */}
        {grupos.map((grupo, indiceGrupo) => (
          <section
            className="detalle-grupo"
            key={grupo.clave}
          >

            <div className="detalle-grupo-encabezado">

              <span className="detalle-numero">
                0{indiceGrupo + 1}
              </span>

              <h3>{grupo.titulo}</h3>

            </div>

            <div className="detalle-grid">

              {grupo.fotografias.map((foto) =>
                foto.url ? (

                  /* FOTOGRAFÍA REAL */
                  <button
                    key={foto.id}
                    className="detalle-foto"
                    type="button"
                    onClick={() =>
                      abrirImagen(foto.url)
                    }
                    aria-label={
                      `Ampliar ${foto.descripcion}`
                    }
                  >

                    <img
                      src={foto.url}
                      alt={foto.descripcion}
                      loading="lazy"
                    />

                    <span className="detalle-ampliar">
                      Ampliar imagen ↗
                    </span>

                  </button>

                ) : (

                  /* ESPACIO PENDIENTE */
                  <div
                    className="detalle-sin-fotos"
                    key={foto.id}
                  >

                    <span aria-hidden="true">
                      ◇
                    </span>

                    <p>
                      Fotografía {foto.numero}
                      <br />
                      pendiente de incorporar
                    </p>

                  </div>

                )
              )}

            </div>

          </section>
        ))}

        {/* ENLACE INFERIOR */}
        <div className="detalle-final">

          <Link
            to="/proyectos"
            className="detalle-boton"
          >
            Explorar otros proyectos →
          </Link>

        </div>

      </div>

      {/* VISOR DE FOTOGRAFÍAS */}
      {imagenActiva !== null &&
        todasLasFotos[imagenActiva] && (

          <div
            className="detalle-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Galería de fotografías"
          >

            <button
              type="button"
              className="detalle-cerrar"
              onClick={cerrarImagen}
              aria-label="Cerrar galería"
            >
              ×
            </button>

            <div className="detalle-lightbox-contenido">

              <img
                src={
                  todasLasFotos[imagenActiva].url
                }
                alt={
                  todasLasFotos[imagenActiva]
                    .descripcion
                }
              />

              <p>
                {
                  todasLasFotos[imagenActiva]
                    .descripcion
                }
              </p>

              <span className="detalle-contador">
                {imagenActiva + 1} /{' '}
                {todasLasFotos.length}
              </span>

            </div>

            {todasLasFotos.length > 1 && (
              <>
                <button
                  type="button"
                  className={
                    'detalle-navegar detalle-anterior'
                  }
                  onClick={imagenAnterior}
                  aria-label="Fotografía anterior"
                >
                  ‹
                </button>

                <button
                  type="button"
                  className={
                    'detalle-navegar detalle-siguiente'
                  }
                  onClick={imagenSiguiente}
                  aria-label="Fotografía siguiente"
                >
                  ›
                </button>
              </>
            )}

          </div>
        )}
    </main>
  );
}

export default DetalleProyecto;
