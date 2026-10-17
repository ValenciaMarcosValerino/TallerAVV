
require('dotenv').config();

const app = require('./app');

const {
  conectarBD,
} = require('./config/database');

const PORT = process.env.PORT || 5000;

async function iniciarServidor() {
  try {
    console.log('Iniciando backend AVV...');

    // Conectar a SQL Server
    await conectarBD();

    // Iniciar Express
    app.listen(PORT, () => {
      console.log('');
      console.log('================================');
      console.log(' TALLER DE ARQUITECTURA AVV');
      console.log('================================');
      console.log(`Servidor: http://localhost:${PORT}`);
      console.log(`API: http://localhost:${PORT}/api`);
      console.log('Base de datos: newAVV');
    });

  } catch (error) {
    console.error(
      'Error al iniciar el backend:',
      error.message
    );

    process.exitCode = 1;
  }
}

iniciarServidor();
