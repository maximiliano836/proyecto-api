const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');
const manager = new ProductManager('./src/data/products.json');

router.get('/', (req, res) => {
  const products = manager.getAllProducts();
  res.json(products);
});

router.get('/:pid', (req, res) => {
  const product = manager.getProductById(req.params.pid);
  product
    ? res.json(product)
    : res.status(404).json({ error: 'Producto no encontrado' });
});

router.post('/', (req, res) => {
  try {
    const product = manager.addProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:pid', (req, res) => {
  try {
    const product = manager.updateProduct(req.params.pid, req.body);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete('/:pid', (req, res) => {
  try {
    manager.deleteProduct(req.params.pid);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
