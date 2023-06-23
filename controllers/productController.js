const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

const productController = {
  catalogo: (req, res) => {
    res.render('./products/products', {
      products: products
    });
  },

  detalle: (req, res) => {
    const productId = req.params.id;
    const productoBuscado = products.find(producto => producto.id == productId);
    if (productoBuscado) {
      res.render('./products/productDetail', {
        producto: productoBuscado
      });
    } else {
      res.render('error', {
        message: 'Product not found'
      });
    }
  },

  creacion: (req, res) => {
    res.render('./products/productCreate');
  },

  almacenar: (req, res) => {
    const newProduct = {
      id: Date.now(),
      ...req.body,
      thumbnail: req.file ? req.file.filename : ''
    };

    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.redirect("/products/detail/" + newProduct.id);
  },

  edicion: (req, res) => {
    const productId = req.params.id;
    const productToEdit = products.find(product => product.id === parseInt(productId));

    if (productToEdit) {
      res.render('./products/productEdit', {
        product: productToEdit
      });
    } else {
      res.render('error', {
        message: 'Product not found'
      });
    }
  },

  actualizar: (req, res) => {
    const productId = req.params.id;
    const productIndex = products.findIndex(product => product.id === parseInt(productId));

    if (productIndex !== -1) {
      const oldProduct = products[productIndex];
      const editedProduct = {
        ...req.body,
        id: oldProduct.id,
        thumbnail: req.file ? req.file.filename : oldProduct.thumbnail,
        category: req.body.category ? req.body.category : oldProduct.category
      };

      products[productIndex] = editedProduct;
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
      res.redirect('/products/detail/' + productId);
    } else {
      res.render('error', {
        message: 'Product not found'
      });
    }
  },

  borrado: (req, res) => {
    const productId = req.params.id;
    const filteredProducts = products.filter(product => product.id != productId);
    fs.writeFileSync(productsFilePath, JSON.stringify(filteredProducts, null, 2));
    res.redirect("/products");
  }
};

module.exports = productController;
