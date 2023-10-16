const express = require('express');
const router  = express.Router();
const {homePage, addProduct, detailsProduct, getViewProduct, updateProduct} = require('../controller/productController');
const upload = require('..');
router.get('/product',homePage);
router.get('/add', (req,res) => {
    res.render('addProduct')
});
router.get('/product/:id', detailsProduct);
router.post('/add',upload.single('hinhanh'),addProduct);
router.get('/edit-product/:id', getViewProduct)
router.post('/edit-product',upload.single('hinhanh'),updateProduct);
module.exports = router;
