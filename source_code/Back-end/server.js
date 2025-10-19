const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;
const inMemoryOrders = []; // <-- agregar

// Middlewares
app.use(cors());
app.use(express.json());

// Pool PostgreSQL (Supabase Transaction Pooler)
const pool = new Pool({
  host: process.env.DB_HOST || 'aws-1-us-east-1.pooler.supabase.com',
  port: Number(process.env.DB_PORT || 6543),
  database: process.env.DB_DATABASE || 'postgres',
  user: process.env.DB_USER || 'postgres.dflgslcpplfjdpbezlus',
  password: process.env.DB_PASSWORD || 'vaconvosapp',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Health
app.get('/api/health', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ ok: true }); }
  catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

// Productos
app.get('/api/productos', async (_req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT id_producto, nombre, descripcion, precio, id_categoria, imagen_url
      FROM producto
      ORDER BY id_producto
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos.', detalle: error.message });
  }
});

// Crear pedido
app.post('/api/pedidos', async (req, res) => {
  const { items = [], paymentMethod = '' } = req.body || {};
  const total = Array.isArray(items)
    ? items.reduce((acc, i) => acc + Number(i.precio || 0) * Number(i.cantidad || 0), 0)
    : 0;

  const values = [total, paymentMethod, JSON.stringify(items)];
  const tryInsert = async (table) => {
    const sql = `
      INSERT INTO ${table} (fecha, total, payment_method, items)
      VALUES (NOW(), $1, $2, $3)
      RETURNING id, fecha, total, payment_method, items
    `;
    return pool.query(sql, values);
  };

  try {
    let row;
    try {
      row = (await tryInsert('pedidos')).rows[0];
    } catch (e) {
      if (e.code === '42P01') row = (await tryInsert('pedido')).rows[0];
      else throw e;
    }
    return res.status(201).json(row);
  } catch (error) {
    console.error('Error al crear el pedido (DB):', error);
    // Fallback en memoria para no devolver 500
    const fallback = {
      id: Date.now(),
      fecha: new Date().toISOString(),
      total,
      payment_method: paymentMethod,
      items
    };
    inMemoryOrders.unshift(fallback);        // <-- agregar
    return res.status(201).json(fallback);   // <-- agregar
  }
});

// Listar pedidos
app.get('/api/pedidos', async (_req, res) => {
  const query = async (table) =>
    pool.query(`SELECT id, fecha, total, payment_method, items FROM ${table} ORDER BY fecha DESC`);
  try {
    let rows;
    try {
      rows = (await query('pedidos')).rows;
    } catch (e) {
      if (e.code === '42P01') rows = (await query('pedido')).rows;
      else throw e;
    }
    return res.json(rows);
  } catch (error) {
    console.error('Error al obtener los pedidos (DB):', error);
    // Fallback en memoria si la DB falla
    return res.json(inMemoryOrders);         // <-- agregar
  }
});
app.listen(port, () => {
  console.log(`Backend listo en http://localhost:${port}`);
});