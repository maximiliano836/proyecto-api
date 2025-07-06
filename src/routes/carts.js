const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');
const manager = new CartManager('./src/data/carts.json');

router.post('/', (req, res) => {
  const newCart = manager.createCart();
  res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
  const cart = manager.getCartById(req.params.cid);
  cart
    ? res.json(cart)
    : res.status(404).json({ error: 'Carrito no encontrado' });
});

router.post('/:cid/product/:pid', (req, res) => {
  const quantity = parseInt(req.body?.quantity) || 1;
  try {
    const updatedCart = manager.addProductToCart(req.params.cid, req.params.pid, quantity);
    res.json(updatedCart);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
