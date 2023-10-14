const express = require('express');
const router  = express.Router();
const {homePage, addProduct, detailsProduct} = require('../controller/productController');
const upload = require('..');
router.get('/product',homePage);
router.get('/add', (req,res) => {
    res.render('addProduct')
});
router.get('/product/:id', detailsProduct);
router.post('/add',upload.single('hinhanh'),addProduct);
module.exports = router;
