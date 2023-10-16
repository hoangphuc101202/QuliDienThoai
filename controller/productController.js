const {findAllProduct, addProduct, detailsProductByID, updateProduct, getImageFromDB} = require('../model/product');
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
    },
    
    getViewProduct : async(req,res) => {
    const product = await detailsProductByID(+req.params.id);
    if(!product) 
    return res.redirect('/product');
    res.render('editproduct.ejs', {product});
    },
    updateProduct : async (req,res) =>{
        const {id, tensanpham, soluong, giaban, ProductType } = req.body;
        let file = req.file;
        let hinhanh = null
        if(!file) {
            hinhanh = req.body.hinhanh;
        } 
        else{
            hinhanh = file.filename
        }
      
    
    const product = await updateProduct(id,tensanpham,soluong,giaban,hinhanh,ProductType );
    if(!product) return res.redirect('/product');
    res.redirect('/product');
    }
    
    
}