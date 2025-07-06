const fs = require('fs');

class CartManager {
  constructor(path) {
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, '[]');
    }
  }

  _readFile() {
    const data = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(data);
  }

  _writeFile(data) {
    fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
  }

  getCarts() {
    return this._readFile();
  }

  getCartById(id) {
    const carts = this._readFile();
    return carts.find(cart => cart.id == id);
  }

  createCart() {
    const carts = this._readFile();
    const newId = carts.length > 0
      ? parseInt(carts[carts.length - 1].id) + 1
      : 1;

    const newCart = { id: newId, products: [] };
    carts.push(newCart);
    this._writeFile(carts);
    return newCart;
  }

  addProductToCart(cartId, productId, quantity = 1) {
    const carts = this._readFile();
    const cart = carts.find(c => c.id == cartId);
    if (!cart) throw new Error('Carrito no encontrado');

    const productIndex = cart.products.findIndex(p => p.product == productId);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    this._writeFile(carts);
    return cart;
  }
}

module.exports = CartManager;
