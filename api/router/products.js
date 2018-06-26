
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

let Product = require('../models/products');

router.get('/', function (req, res, next) {
    Product
        .find()
        .select('-__v')
        .exec()  //перетворює пвсевдо promise и справжній promise
        .then(docs => {
            res.status(200).json({
                message: 'products',
                allProducts: docs
            })
        })
        .catch(err => {
            res.status(500).json({
                error: er
            })
        })
})

router.post('/', function (req, res, next) {
    let product = new Product({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        price: req.body.price
    })
    product
        .save()
        .then(doc => {
            res.status(201).json({
                message: 'product was created',
                createdProduct: doc
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            })
        })
})

// /:productId dunamic router
router.patch('/:productId', function (req, res, next) {
    Product
        .findByIdAndUpdate(req.params.productId, { title: req.body.title })
        .exec()
        .then(doc =>{
            return Product.findById(req.params.productId).exec()
        })
        .then(newDoc => {
            res.status(200).json({
                message: 'product patched!',
                patchedProduct: newDoc
            })
        })
        // .then(doc => {
        //     res.status(200).json({
        //         message: 'product is patched now',
        //         patchedProduct: {
        //             id: req.body.id,
        //             title: req.body.title,
        //         }
        //     })
        // })
        .catch(res => {
            res.status(500).json({
                error: err,
            })
        })
})

router.delete('/:productId', function(req, res, next) {
    if(req.auth){
        Product
        .findByIdAndRemove(req.params.productId)
        .exec()
        .then((doc)=>{
            res.status(200).json({
                message: 'product is delete now',
                id: doc._id
            })
        })
        .catch(res =>{
            res.status(500).json({
                error: er
            })
        })
    } else {
        res.status(401).json({
            message: "you need to login",
        })
    }

})

router.put('/:productId', function (req, res, next) {
    Product
        .findByIdAndUpdate(req.params.productId, { title: req.body.title })
        .exec()
        .then(doc =>{
            return Product.findById(req.params.productId).exec()
        })
        .then(newDoc => {
            res.status(200).json({
                message: 'product put!',
                patchedProduct: newDoc
            })
        })
        .catch(res => {
            res.status(500).json({
                error: err,
            })
        })
})

module.exports = router
