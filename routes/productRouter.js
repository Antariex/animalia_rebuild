const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const productController = require('../controllers/productController');

// Configuración de entorno
const storage = multer.diskStorage({
  destination: './public/images/products',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-img${path.extname(file.originalname)}`);
  }
});

// Cargamos las variables de entorno
const upload = multer({ storage });

// Rutas
router.get('/products', productController.catalogo);
router.get('/productCreate', productController.creacion);
router.get('/productDetail/:id', productController.detalle);
router.post('/create/confirm', upload.single('thumbnail'), productController.almacenar);
router.get('/edit/:id', productController.edicion);
router.put('/edit/:id/success', upload.single('thumbnail'), productController.actualizar);
router.delete('/delete/:id', productController.borrado);

// Exportamos la variable del router
module.exports = router;
