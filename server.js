const http = require('http');
const app = require('./app');
const PORT = 3080;
const mongoose = require('mongoose');
const db = require('./config/db');

 mongoose.connect(db.url)
// mongoose.connect('mongodb://localhost:27017/local')

http.createServer(app).listen(PORT, console.log('Server started' + PORT))
