const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Usamos pg para PostgreSQL

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de la conexión a tu base de datos PostgreSQL
const pool = new Pool({
  host: 'aws-1-us-east-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  user: 'postgres.dflgslcpplfjdpbezlus',
  password: 'vaconvosapp', // <-- agrega tu contraseña real aquí
  max: 10, // número máximo de conexiones en el pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Conectar a la base de datos
pool.connect()
    .then(() => console.log('Conectado a PostgreSQL'))
    .catch(err => console.error('Error de conexión', err.stack));
// === RUTAS DE LA API ===

// Ruta para obtener todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM producto');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los productos:', error); 
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
});

// Si necesitas una ruta para categorías, debería ser algo así:

app.get('/api/categorias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categoria'); // Asumiendo que tienes una tabla 'categoria'
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener las categorías:', error); 
    res.status(500).json({ error: 'Error al obtener las categorías.', detalle: error.message });
  }
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${port}`);
});