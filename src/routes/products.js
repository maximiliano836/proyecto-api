const express = require('express');
const fs = require('fs');
const router = express.Router();

const filePath = './src/data/products.json';

router.get('/', (req, res) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const products = JSON.parse(data);
  res.json(products);
});

router.get('/:pid', (req, res) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const products = JSON.parse(data);
  const product = products.find(p => p.id == req.params.pid);
  product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
});

router.post('/', (req, res) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const products = JSON.parse(data);
  const newProduct = {
    id: Date.now().toString(),
    ...req.body
  };
  products.push(newProduct);
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  res.status(201).json(newProduct);
});

module.exports = router;