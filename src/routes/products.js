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

  const newId = products.length > 0
    ? parseInt(products[products.length - 1].id) + 1
    : 1;

  const newProduct = {
    id: newId,
    ...req.body
  };

  products.push(newProduct);
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const products = JSON.parse(data);
  const index = products.findIndex(p => p.id == req.params.pid);
  if (index === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const updatedProduct = {
    ...products[index],
    ...req.body,
    id: products[index].id 
  };

  products[index] = updatedProduct;
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  res.json(updatedProduct);
});

router.delete('/:pid', (req, res) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  let products = JSON.parse(data);
  const index = products.findIndex(p => p.id == req.params.pid);
  if (index === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  products.splice(index, 1);
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  res.json({ message: 'Producto eliminado correctamente' });
});

module.exports = router;
