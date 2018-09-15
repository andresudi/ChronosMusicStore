var express = require('express');
var router = express.Router();
const { isLogin } = require('../middlewares/isLogin');
const { createCart, getAllCart } = require('../controllers/cartController');

router.post('/', isLogin, createCart)
router.get('/', getAllCart)

module.exports = router
