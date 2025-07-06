const fs = require('fs');

class CartManager {
  constructor(path) {
    this.path = path;
  }

  getCarts() {
    if (!fs.existsSync(this.path)) return [];
    const data = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(data);
  }

  createCart() {
    const carts = this.getCarts();
    const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;

    const newCart = {
      id: newId,
      products: []
    };

    carts.push(newCart);
    fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  getCartById(id) {
    const carts = this.getCarts();
    return carts.find(cart => cart.id === id);
  }

  addProductToCart(cartId, productId) {
    const carts = this.getCarts();
    const cart = carts.find(c => c.id === cartId);
    if (!cart) return null;

    const existingProduct = cart.products.find(p => p.product === productId);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
    return cart;
  }
}

module.exports = CartManager;
