const express = require('express');
const { v4: uuidv4 } = require('uuid');
const authenticateToken = require('./middleware/auth');

const app = express();
app.use(express.json());

let products = [];

function validateProduct(req, res, next) {
  const { name, price } = req.body;
  if (!name || typeof name !== 'string' || !price || typeof price !== 'number') {
    return res.status(400).json({ error: 'Invalid product data' });
  }
  next();
}

app.post('/api/products', authenticateToken, validateProduct, (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: uuidv4(), name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(3000, () => {
  console.log('✅ Server is running on http://localhost:3000');
});
