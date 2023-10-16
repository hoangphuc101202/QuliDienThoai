const DBConnect = require('../config/DBConnect');
const dbconnect = require('../config/DBConnect');

module.exports = {
    findAllProduct : async () => {
        const connection = await dbconnect.connection;
        const result = await connection.execute('SELECT * FROM product');
       return result[0];
    },
    addProduct : async (tensanpham, soluong, giaban, hinhanh , ProductType) =>{
        const connection = await dbconnect.connection;
        const result = await connection
        .execute('INSERT INTO product (tensanpham, soluong, giaban, hinhanh , ProductType) VALUES (?,?,?,?,?)', 
        [tensanpham, soluong, giaban, hinhanh, ProductType ]);
         if(result[0].changeRows == 0) return null
        return true;
    },
    detailsProductByID: async (id) => {
        const connection = await DBConnect.connection;
        const result = await connection.execute('SELECT * FROM product WHERE id = ?', [id]);
        if(result[0].length == 0) {
            return null;
          }
          return result[0][0]
    },
    updateProduct: async(id, tensanpham, soluong, giaban, hinhanh, ProductType) => {
        const connection = await DBConnect.connection;
        const result  = await connection.execute('UPDATE product SET tensanpham=?,soluong=?, giaban=?, hinhanh=?, ProductType=? WHERE id=?',
        [tensanpham, soluong, giaban, hinhanh, ProductType, id]);
        if(result[0].changedRows == 0) return null;
        return true;
    }
}
