
/*
  TALLER DE ARQUITECTURA AVV
  CATÁLOGO TEMPORAL DE PROYECTOS
*/

// Categorías oficiales de nuestro portafolio visual

export const categorias = [
  {
    id: 'diseno-arquitectonico',
    nombre: 'Diseño arquitectónico',
    descripcion:
      'Propuestas arquitectónicas y diseño de espacios.',
    imagen: 'ProyectoDisArquitectonicoAVV',
  },
  {
    id: 'construccion',
    nombre: 'Construcción',
    descripcion:
      'Proyectos de construcción y ejecución de obra.',
    imagen: 'ProyectoConstruccionAVV',
  },
  {
    id: 'remodelaciones',
    nombre: 'Remodelaciones',
    descripcion:
      'Transformación y renovación de espacios existentes.',
    imagen: 'ProyectoRemodelacionAVV',
  },
  {
    id: 'visualizacion-3d',
    nombre: 'Visualización 3D',
    descripcion:
      'Renders y representaciones arquitectónicas.',
    imagen: 'ProyectoVisualizacion3DAVV',
  },
];

/*
  Agregaremos aquí los proyectos reales.

  Estructura que utilizaremos:

  {
    id: 'nombre-del-proyecto',
    nombre: 'Nombre real del proyecto',
    categoria: 'remodelaciones',
    descripcion: 'Descripción de la obra',
    portada: 'NombreImagenPortada',
    imagenes: [
      'NombreFoto01',
      'NombreFoto02',
      'NombreFoto03'
    ]
  }

  No registrar obras ficticias.
*/

export const proyectos = [];

// Funciones para consultar la información

export function obtenerCategoria(id) {
  return categorias.find(
    (categoria) => categoria.id === id
  );
}

export function obtenerProyectosCategoria(categoriaId) {
  return proyectos.filter(
    (proyecto) => proyecto.categoria === categoriaId
  );
}

export function obtenerProyecto(id) {
  return proyectos.find(
    (proyecto) => proyecto.id === id
  );
}
