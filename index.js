const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Middleware para reportes
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
});

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'joyas',
  password: 'postgres',
  port: 5432,
});

// Ruta GET /joyas (Requerimientos 1 y 2)
app.get('/joyas', async (req, res) => {
  try {
    const { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;
    const [campo, direccion] = order_by.split('_');
    const offset = (page - 1) * limits;

    const { rows } = await pool.query(
      `SELECT * FROM inventario ORDER BY ${campo} ${direccion} LIMIT ${limits} OFFSET ${offset}`
    );
    
    res.json({
      total: rows.length,
      results: rows.map(j => ({ name: j.nombre, href: `/joyas/joya/${j.id}` }))
    });

  } catch (error) {
    res.status(500).json({ error: "Error al obtener joyas" }); // Requerimiento 5
  }
});

// Ruta GET /joyas/filtros (Requerimiento 3 y 6)
app.get('/joyas/filtros', async (req, res) => {
  try {
    const { precio_min, precio_max, categoria, metal } = req.query;
    let where = [], values = [];
    
    if (precio_min) { where.push(`precio >= $${values.length+1}`); values.push(precio_min); }
    if (precio_max) { where.push(`precio <= $${values.length+1}`); values.push(precio_max); }
    if (categoria) { where.push(`categoria = $${values.length+1}`); values.push(categoria); }
    if (metal) { where.push(`metal = $${values.length+1}`); values.push(metal); }

    const { rows } = await pool.query(
      `SELECT * FROM inventario ${where.length ? 'WHERE ' + where.join(' AND ') : ''}`,
      values
    );
    res.json(rows);

  } catch (error) {
    res.status(500).json({ error: "Error al filtrar" }); // Requerimiento 5
  }
});

app.listen(port, () => {
  console.log(`Servidor listo en http://localhost:${port}`);
});