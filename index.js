require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

app.get('/perfil', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM perfil');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
