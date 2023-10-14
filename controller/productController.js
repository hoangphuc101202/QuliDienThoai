const {findAllProduct, addProduct, detailsProductByID} = require('../model/product');
module.exports ={
    homePage: async (req,res) =>{
        const products = await findAllProduct();
        res.render('homepage',{
            products
        })
    },
    addProduct : async (req, res, next) => {
        const file = req.file;
        if(!file) {
            const error = new Error('Please Upload this file');
            return next(error);
        }
        const { tensanpham, soluong, giaban, ProductType } = req.body;
        const hinhanh = file.filename;
        // Call the addProduct function with the extracted data
        const result = await addProduct(tensanpham, soluong, giaban, hinhanh, ProductType);
        if(!result) 
        {
            res.redirect('/add')
        }
        res.redirect('/product');
    },
    detailsProduct: async (req,res) => {
        const product = await detailsProductByID(+req.params.id);
        res.render('detailsProduct', {product});
        
    }
}