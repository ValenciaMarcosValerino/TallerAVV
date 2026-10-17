
/* ==========================================
   TALLER DE ARQUITECTURA AVV
   CATÁLOGO DE PROYECTOS
========================================== */

// CATEGORÍAS DISPONIBLES
export const categorias = [
  {
    id: 'diseno-arquitectonico',
    nombre: 'Diseño arquitectónico',
    descripcion:
      'Propuestas arquitectónicas que integran diseño, funcionalidad y las necesidades de cada espacio.',
    imagen: 'ProyectoDisArquitectonicoAVV',
  },
  {
    id: 'construccion',
    nombre: 'Construcción',
    descripcion:
      'Desarrollo de proyectos constructivos, desde la planeación hasta su ejecución.',
    imagen: 'ProyectoConstruccionAVV',
  },
  {
    id: 'remodelaciones',
    nombre: 'Remodelaciones',
    descripcion:
      'Transformación y renovación de espacios para mejorar su funcionalidad y apariencia.',
    imagen: 'ProyectoRemodelacionAVV',
  },
  {
    id: 'visualizacion-3d',
    nombre: 'Visualización 3D',
    descripcion:
      'Representaciones tridimensionales para visualizar propuestas y soluciones arquitectónicas.',
    imagen: 'ProyectoVisualizacion3DAVV',
  },
];

/* ==========================================
   PLANTILLA DE PROYECTO

   IMPORTANTE:
   - No es una obra real.
   - No aparece en el portafolio público.
   - Sirve para preparar y probar la galería.
========================================== */

const plantillaProyecto = {
  id: 'plantilla-avv',

  nombre: 'Plantilla de proyecto AVV',

  categoria: 'remodelaciones',

  descripcion:
    'Vista de preparación para incorporar fotografías y evidencias de una obra.',

  ubicacion: '',
  anio: '',

  // false evita mostrarla en el catálogo público
  publicado: false,

  // true muestra una obra publicada en Inicio
  destacado: false,

  // Fotografía principal
  portada: null,

  // Evidencias fotográficas
  evidencias: {
    antes: [
      null,
      null,
    ],

    proceso: [
      null,
      null,
    ],

    despues: [
      null,
      null,
    ],
  },
};

/* ==========================================
   PROYECTOS REGISTRADOS

   Cuando recibamos las fotografías reales,
   agregaremos aquí cada proyecto.
========================================== */

export const proyectos = [
  plantillaProyecto,
];

/* ==========================================
   FUNCIONES DE CONSULTA
========================================== */

// Buscar una categoría por identificador
export function obtenerCategoria(id) {
  return categorias.find(
    (categoria) => categoria.id === id
  );
}

// Consultar únicamente proyectos publicados
// pertenecientes a una categoría
export function obtenerProyectosCategoria(categoriaId) {
  return proyectos.filter(
    (proyecto) =>
      proyecto.categoria === categoriaId &&
      proyecto.publicado !== false
  );
}

// Buscar un proyecto, incluso si aún no está publicado.
// Esto permite revisar la plantilla directamente por URL.
export function obtenerProyecto(id) {
  return proyectos.find(
    (proyecto) => proyecto.id === id
  );
}

