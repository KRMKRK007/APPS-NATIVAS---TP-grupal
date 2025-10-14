const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de la conexión a tu base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'tu_contraseña_de_mysql', // <-- ¡IMPORTANTE: CAMBIA ESTO!
  database: 'vaconvos_db'
};

// === RUTAS DE LA API ===

// Ruta para obtener todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM Producto');
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
});

// Ruta para obtener todas las categorías
app.get('/api/categorias', async (req, res) => {
    try {
      const connection = await mysql.createConnection(dbConfig);
      // Usamos un JOIN para obtener también el nombre de la categoría
      const [rows] = await connection.execute('SELECT * FROM Categoria');
      await connection.end();
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las categorías.' });
    }
  });


// Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${port}`);
});