
import { useState } from 'react';
import '../styles/Contacto.css';

/* ==========================================
   TALLER DE ARQUITECTURA AVV
   CONTACTO Y SOLICITUD DE COTIZACIONES
========================================== */

const estadoInicial = {
  tipo: 'cotizacion',
  nombre: '',
  correo: '',
  telefono: '',
  servicio: '',
  ubicacion: '',
  mensaje: '',
};

const servicios = [
  'Diseño arquitectónico',
  'Construcción',
  'Remodelaciones',
  'Visualización 3D',
  'Otro servicio',
];

function Contacto() {
  const [formulario, setFormulario] =
    useState(estadoInicial);

  const [errores, setErrores] = useState({});

  const [solicitudPreparada, setSolicitudPreparada] =
    useState(false);

  const [mensajeCopia, setMensajeCopia] =
    useState('');

  const esCotizacion =
    formulario.tipo === 'cotizacion';

  /* ========================================
     1. ACTUALIZAR CAMPOS
  ======================================== */

  function actualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));

    setErrores((anteriores) => ({
      ...anteriores,
      [name]: '',
    }));

    setSolicitudPreparada(false);
    setMensajeCopia('');
  }

  /* ========================================
     2. CAMBIAR ENTRE OPCIONES
  ======================================== */

  function cambiarTipo(tipo) {
    setFormulario((anterior) => ({
      ...anterior,
      tipo,
    }));

    setErrores({});
    setSolicitudPreparada(false);
    setMensajeCopia('');
  }

  /* ========================================
     3. LIMPIAR SIN CAMBIAR DE PESTAÑA
  ======================================== */

  function limpiarFormulario() {
    setFormulario((anterior) => ({
      ...estadoInicial,
      tipo: anterior.tipo,
    }));

    setErrores({});
    setSolicitudPreparada(false);
    setMensajeCopia('');
  }

  /* ========================================
     4. VALIDACIONES
  ======================================== */

  function validarFormulario() {
    const nuevosErrores = {};

    const nombre = formulario.nombre.trim();
    const correo = formulario.correo.trim();
    const mensaje = formulario.mensaje.trim();

    if (!nombre) {
      nuevosErrores.nombre =
        'Por favor, ingresa tu nombre completo.';
    } else if (nombre.length < 2) {
      nuevosErrores.nombre =
        'El nombre debe contener al menos 2 caracteres.';
    }

    if (!correo) {
      nuevosErrores.correo =
        'Por favor, ingresa tu correo electrónico.';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
    ) {
      nuevosErrores.correo =
        'Ingresa un correo electrónico válido.';
    }

    if (
      esCotizacion &&
      !formulario.servicio
    ) {
      nuevosErrores.servicio =
        'Por favor, selecciona un servicio.';
    }

    if (!mensaje) {
      nuevosErrores.mensaje = esCotizacion
        ? 'Por favor, describe tu proyecto.'
        : 'Por favor, escribe tu mensaje.';
    } else if (mensaje.length < 10) {
      nuevosErrores.mensaje =
        'Escribe al menos 10 caracteres.';
    }

    return nuevosErrores;
  }

  /* ========================================
     5. PREPARAR SOLICITUD
  ======================================== */

  function prepararSolicitud(evento) {
    evento.preventDefault();

    const nuevosErrores = validarFormulario();

    setErrores(nuevosErrores);
    setSolicitudPreparada(false);
    setMensajeCopia('');

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    setSolicitudPreparada(true);
  }

  /* ========================================
     6. CONSTRUIR MENSAJE
  ======================================== */

  function construirMensaje() {
    const lineas = [
      'TALLER DE ARQUITECTURA AVV',
      '',
      esCotizacion
        ? 'SOLICITUD DE COTIZACIÓN'
        : 'CONTACTO GENERAL',
      '',
      `Nombre: ${formulario.nombre.trim()}`,
      `Correo: ${formulario.correo.trim()}`,
    ];

    if (formulario.telefono.trim()) {
      lineas.push(
        `Teléfono: ${formulario.telefono.trim()}`
      );
    }

    if (esCotizacion) {
      lineas.push(
        `Servicio: ${formulario.servicio}`
      );

      if (formulario.ubicacion.trim()) {
        lineas.push(
          `Ubicación: ${formulario.ubicacion.trim()}`
        );
      }
    }

    lineas.push(
      '',
      esCotizacion
        ? 'DESCRIPCIÓN DEL PROYECTO:'
        : 'MENSAJE:',
      formulario.mensaje.trim()
    );

    return lineas.join('\n');
  }

  /* ========================================
     7. COPIAR SOLICITUD
  ======================================== */

  async function copiarSolicitud() {
    try {
      await navigator.clipboard.writeText(
        construirMensaje()
      );

      setMensajeCopia(
        'Solicitud copiada correctamente.'
      );
    } catch {
      setMensajeCopia(
        'No se pudo copiar automáticamente. ' +
        'Selecciona el texto de la vista previa.'
      );
    }
  }

  /* ========================================
     8. INTERFAZ
  ======================================== */

  return (
    <section
      id="contacto"
      className="contacto-avv"
    >
      <div className="contacto-avv__contenedor">

        {/* ENCABEZADO */}
        <div className="contacto-avv__encabezado">

          <span className="contacto-avv__etiqueta">
            05 / CONTACTO
          </span>

          <h2>
            Hablemos de tu
            <br />
            próximo proyecto.
          </h2>

          <p>
            Estamos interesados en conocer tus ideas.
            Escríbenos para resolver tus dudas o
            preparar una solicitud de cotización.
          </p>

        </div>

        <div className="contacto-avv__distribucion">

          {/* INFORMACIÓN */}
          <aside className="contacto-avv__informacion">

            <span className="contacto-avv__subtitulo">
              TALLER DE ARQUITECTURA AVV
            </span>

            <h3>
              Cada gran espacio
              comienza con una idea.
            </h3>

            <p>
              Selecciona el motivo de tu mensaje
              y comparte la información necesaria.
              Nuestro formulario está diseñado
              para consultas generales y proyectos
              de arquitectura.
            </p>

            <div className="contacto-avv__nota">

              <span aria-hidden="true">↗</span>

              <p>
                Próximamente habilitaremos el envío
                directo de solicitudes desde
                nuestro sitio web.
              </p>

            </div>

          </aside>

          {/* PANEL */}
          <div className="contacto-avv__panel">

            <div className="contacto-avv__panel-cabecera">

              <span>
                SELECCIONA UNA OPCIÓN
              </span>

              <p>
                ¿Cómo podemos ayudarte?
              </p>

            </div>

            {/* PESTAÑAS */}
            <div
              className="contacto-avv__selector"
              role="group"
              aria-label="Tipo de solicitud"
            >

              <button
                type="button"
                className={
                  'contacto-avv__opcion ' +
                  (esCotizacion
                    ? 'contacto-avv__opcion--activa'
                    : '')
                }
                onClick={() =>
                  cambiarTipo('cotizacion')
                }
                aria-pressed={esCotizacion}
              >
                Solicitar cotización
              </button>

              <button
                type="button"
                className={
                  'contacto-avv__opcion ' +
                  (!esCotizacion
                    ? 'contacto-avv__opcion--activa'
                    : '')
                }
                onClick={() =>
                  cambiarTipo('contacto')
                }
                aria-pressed={!esCotizacion}
              >
                Contacto general
              </button>

            </div>

            {/* FORMULARIO */}
            <form
              className="contacto-avv__formulario"
              onSubmit={prepararSolicitud}
              noValidate
            >

              {/* NOMBRE */}
              <div className="contacto-avv__campo">

                <label htmlFor="avv-nombre">
                  Nombre completo *
                </label>

                <input
                  id="avv-nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  placeholder="Escribe tu nombre"
                  value={formulario.nombre}
                  onChange={actualizarCampo}
                  maxLength={120}
                  aria-invalid={Boolean(errores.nombre)}
                  aria-describedby={
                    errores.nombre
                      ? 'error-avv-nombre'
                      : undefined
                  }
                />

                {errores.nombre && (
                  <span
                    id="error-avv-nombre"
                    className="contacto-avv__error"
                    role="alert"
                  >
                    {errores.nombre}
                  </span>
                )}

              </div>

              {/* CORREO Y TELÉFONO */}
              <div className="contacto-avv__fila">

                <div className="contacto-avv__campo">

                  <label htmlFor="avv-correo">
                    Correo electrónico *
                  </label>

                  <input
                    id="avv-correo"
                    name="correo"
                    type="email"
                    autoComplete="email"
                    placeholder="correo@ejemplo.com"
                    value={formulario.correo}
                    onChange={actualizarCampo}
                    maxLength={254}
                    aria-invalid={Boolean(errores.correo)}
                    aria-describedby={
                      errores.correo
                        ? 'error-avv-correo'
                        : undefined
                    }
                  />

                  {errores.correo && (
                    <span
                      id="error-avv-correo"
                      className="contacto-avv__error"
                      role="alert"
                    >
                      {errores.correo}
                    </span>
                  )}

                </div>

                <div className="contacto-avv__campo">

                  <label htmlFor="avv-telefono">
                    Teléfono (opcional)
                  </label>

                  <input
                    id="avv-telefono"
                    name="telefono"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Número de contacto"
                    value={formulario.telefono}
                    onChange={actualizarCampo}
                    maxLength={30}
                  />

                </div>

              </div>

              {/* OPCIONES EXCLUSIVAS DE COTIZACIÓN */}
              {esCotizacion && (
                <>

                  <div className="contacto-avv__campo">

                    <label htmlFor="avv-servicio">
                      Servicio de interés *
                    </label>

                    <select
                      id="avv-servicio"
                      name="servicio"
                      value={formulario.servicio}
                      onChange={actualizarCampo}
                      aria-invalid={
                        Boolean(errores.servicio)
                      }
                      aria-describedby={
                        errores.servicio
                          ? 'error-avv-servicio'
                          : undefined
                      }
                    >

                      <option value="">
                        Selecciona un servicio
                      </option>

                      {servicios.map((servicio) => (
                        <option
                          key={servicio}
                          value={servicio}
                        >
                          {servicio}
                        </option>
                      ))}

                    </select>

                    {errores.servicio && (
                      <span
                        id="error-avv-servicio"
                        className="contacto-avv__error"
                        role="alert"
                      >
                        {errores.servicio}
                      </span>
                    )}

                  </div>

                  <div className="contacto-avv__campo">

                    <label htmlFor="avv-ubicacion">
                      Ubicación del proyecto
                      (opcional)
                    </label>

                    <input
                      id="avv-ubicacion"
                      name="ubicacion"
                      type="text"
                      placeholder={
                        'Ciudad, alcaldía o municipio'
                      }
                      value={formulario.ubicacion}
                      onChange={actualizarCampo}
                      maxLength={150}
                    />

                  </div>

                </>
              )}

              {/* MENSAJE */}
              <div className="contacto-avv__campo">

                <label htmlFor="avv-mensaje">
                  {esCotizacion
                    ? 'Descripción del proyecto *'
                    : 'Tu mensaje *'}
                </label>

                <textarea
                  id="avv-mensaje"
                  name="mensaje"
                  rows={6}
                  placeholder={
                    esCotizacion
                      ? 'Cuéntanos qué tipo de obra ' +
                        'o intervención necesitas...'
                      : 'Escribe aquí tu consulta...'
                  }
                  value={formulario.mensaje}
                  onChange={actualizarCampo}
                  maxLength={3000}
                  aria-invalid={Boolean(errores.mensaje)}
                  aria-describedby={
                    errores.mensaje
                      ? 'error-avv-mensaje'
                      : undefined
                  }
                />

                {errores.mensaje && (
                  <span
                    id="error-avv-mensaje"
                    className="contacto-avv__error"
                    role="alert"
                  >
                    {errores.mensaje}
                  </span>
                )}

                <span className="contacto-avv__contador">
                  {formulario.mensaje.length} / 3000
                </span>

              </div>

              <p className="contacto-avv__aviso">
                * Campos obligatorios.
                Esta versión prepara una solicitud
                para copiar; todavía no envía datos
                a Taller de Arquitectura AVV.
              </p>

              {/* BOTONES */}
              <div className="contacto-avv__acciones">

                <button
                  type="submit"
                  className="contacto-avv__enviar"
                >
                  Preparar solicitud
                  <span aria-hidden="true">→</span>
                </button>

                <button
                  type="button"
                  className="contacto-avv__limpiar"
                  onClick={limpiarFormulario}
                >
                  Limpiar
                </button>

              </div>

            </form>

            {/* VISTA PREVIA */}
            {solicitudPreparada && (
              <div
                className="contacto-avv__resultado"
                role="status"
              >

                <h3>
                  Solicitud preparada
                </h3>

                <p>
                  Revisa el contenido.
                  Aún no se ha enviado a AVV.
                </p>

                <textarea
                  className="contacto-avv__vista-previa"
                  value={construirMensaje()}
                  readOnly
                  rows={12}
                  aria-label="Vista previa de solicitud"
                />

                <button
                  type="button"
                  className="contacto-avv__copiar"
                  onClick={copiarSolicitud}
                >
                  Copiar solicitud
                </button>

                {mensajeCopia && (
                  <p className="contacto-avv__mensaje-copia">
                    {mensajeCopia}
                  </p>
                )}

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

export default Contacto;
