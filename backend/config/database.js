
/* ==========================================
   TALLER DE ARQUITECTURA AVV
   SQL SERVER EXPRESS - WINDOWS AUTH
========================================== */

require('dotenv').config();

const sql = require('mssql/msnodesqlv8');

// Datos de conexión
const servidor = process.env.DB_SERVER || 'localhost';
const instancia = process.env.DB_INSTANCE || 'SQLEXPRESS';
const baseDatos = process.env.DB_NAME || 'newAVV';

// Controlador ODBC instalado en Windows
const driver = 'ODBC Driver 18 for SQL Server';

// Cadena de conexión
const connectionString = [
  `Driver={${driver}}`,
  `Server=${servidor}\\${instancia}`,
  `Database=${baseDatos}`,
  'Trusted_Connection=Yes',
  'Encrypt=Yes',
  'TrustServerCertificate=Yes',
].join(';') + ';';

const dbConfig = {
  connectionString,

  connectionTimeout: 15000,
  requestTimeout: 15000,

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool = null;

/* ==========================================
   CONECTAR A LA BASE DE DATOS
========================================== */

async function conectarBD() {
  try {
    if (pool && pool.connected) {
      return pool;
    }

    pool = await sql.connect(dbConfig);

    const resultado = await pool.request().query(`
      SELECT
        DB_NAME() AS baseDatos,
        SYSTEM_USER AS usuarioActual
    `);

    console.log(
      'Conexión exitosa a SQL Server Express'
    );

    console.log(
      'Base de datos:',
      resultado.recordset[0].baseDatos
    );

    console.log(
      'Autenticación Windows:',
      resultado.recordset[0].usuarioActual
    );

    return pool;

  } catch (error) {
    console.error(
      'Error de conexión SQL Server:',
      error.message
    );

    throw error;
  }
}

/* ==========================================
   OBTENER CONEXIÓN
========================================== */

async function obtenerConexion() {
  return conectarBD();
}

module.exports = {
  sql,
  conectarBD,
  obtenerConexion,
};
