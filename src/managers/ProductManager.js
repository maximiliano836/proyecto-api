const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  getProducts() {
    if (!fs.existsSync(this.path)) {
      return [];
    }
    const data = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(data);
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(product => product.id === id);
  }

  addProduct(product) {
    const products = this.getProducts();

    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = {
      id: newId,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock
    };

    products.push(newProduct);
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    return newProduct;
  }
}

module.exports = ProductManager;
