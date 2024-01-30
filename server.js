const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
var cors = require('cors')

const app = express();
const port = 3001;

db_config = { 
  user: 'user_database',
  host: 'localhost',
  database: 'name_database',
  password: 'password_database',
  port: 5432,
}

const pool = new Pool(db_config);

app.use(bodyParser.json());

app.use(cors())

// Rota para listar clientes
app.get('/clientes', async (req, res) => {
  try {
    let q = 'SELECT *, SQRT((coord_x - 0)^2 + (coord_y - 0)^2) AS distance FROM clients';
    const result = await pool.query(q);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar clients.' });
  }
});

app.get('/rota-otimizada', async (req, res) => {
  try {
    const result = await pool.query('SELECT *, SQRT((coord_x - 0)^2 + (coord_y - 0)^2) AS distance FROM clients ORDER BY distance');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao calcular rota otimizada.' });
  }
});

// Rota para cadastrar clientes
app.post('/clientes', async (req, res) => {
  const { name, email, phone, coordX, coordY } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO clients (name, email, phone, coord_x, coord_y) VALUES ($1, $2, $3, $4, $5) RETURNING *, SQRT((coord_x - 0)^2 + (coord_y - 0)^2) AS distance',
      [name, email, phone, parseFloat(coordX), parseFloat(coordY)]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar cliente.' });
  }
});

// Rota para deletar cliente
app.delete('/cliente', async (req, res) => {
  const { id } = req.body;

  try {
    const delClient = await pool.query(
      `DELETE FROM clients
        WHERE id = $1`,
      [id]
    );

    const result = await pool.query('SELECT *, SQRT((coord_x - 0)^2 + (coord_y - 0)^2) AS distance FROM clients');

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar cliente.' });
  }
});



app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});