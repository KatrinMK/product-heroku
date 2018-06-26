const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    price: {type: String, required: true}
})

module.exports = mongoose.model('Product', productSchema)
