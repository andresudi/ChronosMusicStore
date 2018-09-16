var express = require('express');
var router = express.Router();
const { isLogin } = require('../middlewares/isLogin');
const { createCart, getAllCart, getOneCart } = require('../controllers/cartController');

router.post('/', isLogin, createCart)
router.get('/', getAllCart)
router.get('/:id', getOneCart)

module.exports = router
