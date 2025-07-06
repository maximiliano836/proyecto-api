const fs = require('fs');

class ProductManager {
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

  getAllProducts() {
    return this._readFile();
  }

  getProductById(id) {
    const products = this._readFile();
    return products.find(p => p.id == id);
  }

  addProduct(product) {
    const requiredFields = [
      'title', 'description', 'code', 'price',
      'status', 'stock', 'category', 'thumbnails'
    ];

    for (const field of requiredFields) {
      if (!(field in product)) {
        throw new Error(`Campo obligatorio faltante: ${field}`);
      }
    }

    const products = this._readFile();
    const newId = products.length > 0
      ? parseInt(products[products.length - 1].id) + 1
      : 1;

    const newProduct = {
      id: newId,
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      status: product.status,
      stock: product.stock,
      category: product.category,
      thumbnails: Array.isArray(product.thumbnails)
        ? product.thumbnails
        : [product.thumbnails]
    };

    products.push(newProduct);
    this._writeFile(products);
    return newProduct;
  }

  updateProduct(id, updatedData) {
    const products = this._readFile();
    const index = products.findIndex(p => p.id == id);
    if (index === -1) throw new Error('Producto no encontrado');

    const updatedProduct = {
      ...products[index],
      ...updatedData,
      id: products[index].id
    };

    products[index] = updatedProduct;
    this._writeFile(products);
    return updatedProduct;
  }

  deleteProduct(id) {
    const products = this._readFile();
    const index = products.findIndex(p => p.id == id);
    if (index === -1) throw new Error('Producto no encontrado');

    products.splice(index, 1);
    this._writeFile(products);
    return true;
  }
}

module.exports = ProductManager;
