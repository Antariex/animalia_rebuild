const { json } = require('express');
const path = require('path');
const fs = require('fs');

const productFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productFilePath, 'utf8'));

const mainController = {

    home: (req, res, next) => {
        res.render('index', {products});
    },

    aboutUs: (req, res) => {
        res.render('./aboutUs'); 
    },

    sucursales: (req, res) => {
        res.render('./sucursales');
    },

    pagos: (req, res) => {
        res.render('./pagos');
    },

    envios: (req, res) => {
        res.render('./envios');
    },

    preguntas: (req, res) => {
        res.render('./preguntas');
    }
};

module.exports = mainController;