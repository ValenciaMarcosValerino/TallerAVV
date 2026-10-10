
import { useEffect, useState } from 'react';
import logoAVV from '../assets/LogoAVV.jpeg';

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const alternarMenu = () => {
    setMenuAbierto((anterior) => !anterior);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  // Bloquear el desplazamiento mientras el menú esté abierto.
  useEffect(() => {
    if (!menuAbierto) return;

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const manejarTeclado = (evento) => {
      if (evento.key === 'Escape') {
        cerrarMenu();
      }
    };

    window.addEventListener('keydown', manejarTeclado);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener('keydown', manejarTeclado);
    };
  }, [menuAbierto]);

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGOTIPO Y NOMBRE */}
        <a
          href="#inicio"
          className="logo-link"
          onClick={cerrarMenu}
        >
          <img
            src={logoAVV}
            alt="Logotipo Taller de Arquitectura AVV"
            className="logo-img"
          />

          <span className="nombre-empresa">
            TALLER DE ARQUITECTURA AVV
          </span>
        </a>

        {/* FONDO OSCURO */}
        <div
          className={`nav-overlay ${
            menuAbierto ? 'activo' : ''
          }`}
          onClick={cerrarMenu}
          aria-hidden="true"
        />

        {/* PANEL LATERAL */}
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

          <a href="#inicio" onClick={cerrarMenu}>
            Inicio
          </a>

          <a href="#nosotros" onClick={cerrarMenu}>
            Nosotros
          </a>

          <a href="#servicios" onClick={cerrarMenu}>
            Servicios
          </a>

          <a href="#proyectos" onClick={cerrarMenu}>
            Proyectos
          </a>

          <a href="#contacto" onClick={cerrarMenu}>
            Contacto
          </a>
        </nav>

        {/* ÚNICO BOTÓN PARA ABRIR Y CERRAR */}
        <button
          type="button"
          className={`menu-toggle ${
            menuAbierto ? 'menu-abierto' : ''
          }`}
          aria-label={
            menuAbierto ? 'Ocultar menú' : 'Mostrar menú'
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
