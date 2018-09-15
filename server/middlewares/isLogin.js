const jwt = require('jsonwebtoken')
const User = require('../models/user');
const Cart = require('../models/cart');

const isLogin = (req, res, next) => {
    var token = req.headers.token
     if (token) {
        var decode = jwt.verify(token, process.env.jwt_secret)
        User.findOne({
            email: decode.email 
        })
        .then((data) => {
            if (data) {
                req.loggedInUser = data
                next()
            } else {
                res.status(400).json({
                    message: 'User is not Authenticated'
                })
            } 
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        })
    } else {
        res.status(400).json({
            message: 'no token'
        })
    }
}

const authTrx = (req, res) => {
    Cart.findOne({userId : req.params.id})
    .populate("userId")
    .then(function(data){
        next()
    })
    .catch(function(err){
        res.status(500).json({
            message : `access daniend`
        })
    })
}

module.exports = { 
    isLogin,
    authTrx
}