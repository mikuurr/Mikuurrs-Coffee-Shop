require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const db = require('./db');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://as2.ftcdn.net"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    }
  }
}));

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

app.get('/api/beans', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM products');
    console.log('Query results:', results.rows);
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        beans: results.rows,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

app.get('/api/beans/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const results = await db.query('SELECT * FROM products where id = $1', [req.params.id]);
    if (results.rows.length > 0) {
      res.status(200).json({
        status: 'success',
        data: {
          product: results.rows[0],
        },
      });
    } else {
      res.status(404).json({ status: 'error', message: 'Bean not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

app.post('/api/beans', async (req, res) => {
  try {
    const results = await db.query('INSERT INTO products (name, price) values ($1, $2) returning *', [req.body.name, req.body.price]);
    res.status(201).json({
      status: 'success',
      data: {
        product: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

app.put('/api/beans/:id', async (req, res) => {
  try {
    const results = await db.query('UPDATE products SET name = $1, price = $2, on_sale = $3 where id = $4 returning *', [req.body.name, req.body.price, req.body.on_sale, req.params.id]);
    if (results.rows.length > 0) {
      res.status(200).json({
        status: 'success',
        data: {
          product: results.rows[0],
        },
      });
    } else {
      res.status(404).json({ status: 'error', message: 'Bean not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

app.delete('/api/beans/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM products where id = $1', [req.params.id]);
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
