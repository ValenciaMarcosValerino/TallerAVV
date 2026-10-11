
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { categorias } from '../data/proyectos';

import '../styles/Proyectos.css';

// Buscar fotografías de categoría en assets
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

function Proyectos() {
  const [filtroActivo, setFiltroActivo] =
    useState('todos');

  const categoriasVisibles =
    filtroActivo === 'todos'
      ? categorias
      : categorias.filter(
          (categoria) =>
            categoria.id === filtroActivo
        );

  return (
    <section
      id="proyectos"
      className="proyectos-seccion"
    >
      <div className="proyectos-container">

        {/* ENCABEZADO */}
        <div className="proyectos-encabezado">

          <span className="proyectos-etiqueta">
            03 / PORTAFOLIO
          </span>

          <div className="proyectos-presentacion">
            <h2>Nuestros proyectos.</h2>

            <p>
              Explora nuestras especialidades
              y descubre los proyectos de
              Taller de Arquitectura AVV.
            </p>
          </div>

        </div>

        {/* FILTROS */}
        <div
          className="proyectos-filtros"
          role="group"
          aria-label="Filtrar categorías"
        >
          <button
            type="button"
            className={`proyectos-filtro ${
              filtroActivo === 'todos'
                ? 'activo'
                : ''
            }`}
            aria-pressed={filtroActivo === 'todos'}
            onClick={() => setFiltroActivo('todos')}
          >
            Todos
          </button>

          {categorias.map((categoria) => (
            <button
              type="button"
              key={categoria.id}
              className={`proyectos-filtro ${
                filtroActivo === categoria.id
                  ? 'activo'
                  : ''
              }`}
              aria-pressed={
                filtroActivo === categoria.id
              }
              onClick={() =>
                setFiltroActivo(categoria.id)
              }
            >
              {categoria.nombre}
            </button>
          ))}
        </div>

        {/* CATEGORÍAS */}
        <div className="proyectos-grid">

          {categoriasVisibles.map((categoria) => {
            const imagen = obtenerImagen(
              categoria.imagen
            );

            return (
              <article
                className="proyecto-card"
                key={categoria.id}
              >
                <Link
                  to={`/proyectos/${categoria.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >

                  <div className="proyecto-imagen">
                    {imagen ? (
                      <img
                        src={imagen}
                        alt={categoria.nombre}
                        className="proyecto-fotografia"
                        loading="lazy"
                      />
                    ) : (
                      <div className="proyecto-placeholder">
                        <span
                          className="proyecto-placeholder-icono"
                          aria-hidden="true"
                        >
                          ◇
                        </span>

                        <p>Fotografía pendiente</p>

                        <span>
                          Próximamente
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="proyecto-info">
                    <span className="proyecto-numero">
                      CATEGORÍA / PORTAFOLIO
                    </span>

                    <h3>{categoria.nombre}</h3>

                    <p>{categoria.descripcion}</p>

                    <span
                      style={{
                        display: 'inline-block',
                        marginTop: '15px',
                        fontWeight: 600,
                        color: '#111111',
                      }}
                    >
                      Explorar proyectos →
                    </span>
                  </div>

                </Link>
              </article>
            );
          })}

        </div>

        {/* CONTACTO */}
        <div className="proyectos-footer">

          <div>
            <span className="proyectos-footer-etiqueta">
              TALLER DE ARQUITECTURA AVV
            </span>

            <h3>
              ¿Tienes una idea para tu próximo proyecto?
            </h3>
          </div>

          <Link
            to="/#contacto"
            className="proyectos-contacto"
          >
            Hablemos de tu proyecto
            <span aria-hidden="true">→</span>
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Proyectos;
