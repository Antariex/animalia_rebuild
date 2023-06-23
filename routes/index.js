const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')

//Homepage (http://localhost:3000)
router.get('/', mainController.home)

//Router de productos (http://localhost:3000/products)
router.use('/products', productRouter)

//Router de usuarios (http://localhost:3000/user)
router.use('/user', userRouter)

//Exportamos las variables del router
module.exports = router