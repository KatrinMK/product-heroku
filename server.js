const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const db = require('./config/db');

 mongoose.connect(db.url)
// mongoose.connect('mongodb://localhost:27017/local')

http.createServer(app).listen(PORT, console.log('Server started' + PORT))
