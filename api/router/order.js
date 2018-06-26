const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Order = require('../models/order');

router.post('/', function (req, res, next) {
    let order = new Order({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity
    })
    order
        .save()
        .then(doc => {
            res.status(201).json({
                message: 'order was created',
                createdOrder: doc
            })
        })
        .catch(err=> {
            res.status(500).json(err)
        })
})

router.get('/', function (req, res, next) {
    Order
        .find()
        .exec()
        .then(docs => {
            res.status(200).json({
                message: 'here is a list orders',
                allOrders: docs
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router