const express = require('express');
const fs = require('fs');
const router = express.Router();

const cartsPath = './src/data/carts.json';

router.post('/', (req, res) => {
  const data = fs.readFileSync(cartsPath, 'utf-8');
  const carts = JSON.parse(data);
  const newId = carts.length > 0
    ? parseInt(carts[carts.length - 1].id) + 1
    : 1;
  const newCart = { id: newId, products: [] };
  carts.push(newCart);
  fs.writeFileSync(cartsPath, JSON.stringify(carts, null, 2));
  res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
  const data = fs.readFileSync(cartsPath, 'utf-8');
  const carts = JSON.parse(data);
  const cart = carts.find(c => c.id == req.params.cid);
  cart ? res.json(cart) : res.status(404).json({ error: 'Carrito no encontrado' });
});

router.post('/:cid/product/:pid', (req, res) => {
  const data = fs.readFileSync(cartsPath, 'utf-8');
  const carts = JSON.parse(data);
  const cart = carts.find(c => c.id == req.params.cid);
  if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

  const productIndex = cart.products.findIndex(p => p.product === req.params.pid);
  if (productIndex !== -1) {
    cart.products[productIndex].quantity += 1;
  } else {
    cart.products.push({ product: req.params.pid, quantity: 1 });
  }

  fs.writeFileSync(cartsPath, JSON.stringify(carts, null, 2));
  res.json(cart);
});

module.exports = router;
