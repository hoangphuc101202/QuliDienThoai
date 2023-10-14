const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/png"
        ) {
            cb(null, './public/images'); // Thư mục đích để lưu hình ảnh
        } else {
            cb(new Error('Không phải là hình ảnh'), false);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.jpg');
    }
});
const upload = multer({
    storage:storage
});
module.exports = upload;

app.use(cookieParser(''));
app.use(flash());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

const productRouter = require('./router/product.router');
app.use('/', productRouter);



app.listen(3000, () => {
    console.log("App listen on port 3000");
})