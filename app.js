const express = require('express');
const app = express();
const routerProducts = require('./api/router/products');
const routerOrder = require('./api/router/order');
const routerUser = require('./api/router/user');
const checkAuth = require('./api/middlewares/middlewares');


app.use(express.json());
app.use(express.urlencoded());

app.use('/products', checkAuth, routerProducts);
app.use('/order', routerOrder);
app.use('/user', routerUser);

app.get('/', function(req, res){
    res.sendFile(__dirname+'/static/index.html')
})
module.exports = app;
