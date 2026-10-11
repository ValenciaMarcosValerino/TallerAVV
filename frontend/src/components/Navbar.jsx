
import { useEffect, useState } from 'react';

import {
  Link,
  useLocation,
} from 'react-router-dom';

import logoAVV from '../assets/LogoAVV.jpeg';

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();

  const alternarMenu = () => {
    setMenuAbierto((anterior) => !anterior);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  // Cerrar el panel cuando cambie la página
  useEffect(() => {
    setMenuAbierto(false);
  }, [location.pathname, location.hash]);

  // Evitar que el fondo se desplace
  useEffect(() => {
    if (!menuAbierto) return;

    const overflowAnterior =
      document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const manejarTecla = (evento) => {
      if (evento.key === 'Escape') {
        cerrarMenu();
      }
    };

    window.addEventListener(
      'keydown',
      manejarTecla
    );

    return () => {
      document.body.style.overflow =
        overflowAnterior;

      window.removeEventListener(
        'keydown',
        manejarTecla
      );
    };
  }, [menuAbierto]);

  // Desplazarse a la sección seleccionada
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });

      return;
    }

    const id = decodeURIComponent(
      location.hash.substring(1)
    );

    const destino = document.getElementById(id);

    if (destino) {
      destino.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [location.pathname, location.hash]);

  const enlaces = [
    { nombre: 'Inicio', ruta: '/#inicio' },
    { nombre: 'Nosotros', ruta: '/#nosotros' },
    { nombre: 'Servicios', ruta: '/#servicios' },
    { nombre: 'Proyectos', ruta: '/proyectos' },
    { nombre: 'Contacto', ruta: '/#contacto' },
  ];

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGOTIPO */}
        <Link
          to="/"
          className="logo-link"
          onClick={cerrarMenu}
        >
          <img
            src={logoAVV}
            alt="Taller de Arquitectura AVV"
            className="logo-img"
          />

          <span className="nombre-empresa">
            TALLER DE ARQUITECTURA AVV
          </span>
        </Link>

        {/* FONDO OSCURO */}
        <div
          className={`nav-overlay ${
            menuAbierto ? 'activo' : ''
          }`}
          onClick={cerrarMenu}
          aria-hidden="true"
        />

        {/* MENÚ LATERAL */}
        <nav
          id="menu-principal"
          className={`nav-links ${
            menuAbierto ? 'activo' : ''
          }`}
          aria-label="Navegación principal"
          inert={!menuAbierto}
        >
          <div className="nav-mobile-header">
            <span>Menú</span>
          </div>

          {enlaces.map((enlace) => (
            <Link
              key={enlace.nombre}
              to={enlace.ruta}
              onClick={(evento) => {
                cerrarMenu();

                const rutaActual =
                  location.pathname + location.hash;

                if (rutaActual === enlace.ruta &&
                    enlace.ruta.includes('#')) {
                  const id = enlace.ruta.split('#')[1];

                  document
                    .getElementById(id)
                    ?.scrollIntoView({
                      behavior: 'smooth',
                    });
                }
              }}
            >
              {enlace.nombre}
            </Link>
          ))}
        </nav>

        {/* ÚNICO BOTÓN HAMBURGUESA */}
        <button
          type="button"
          className={`menu-toggle ${
            menuAbierto ? 'menu-abierto' : ''
          }`}
          aria-label={
            menuAbierto
              ? 'Ocultar menú'
              : 'Mostrar menú'
          }
          aria-expanded={menuAbierto}
          aria-controls="menu-principal"
          onClick={alternarMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
}

export default Navbar;
