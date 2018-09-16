var express = require('express');
var router = express.Router();
const { getItem, addItem, updateItem, deleteItem, cd, merch, buyItem } = require('../controllers/itemController')
const { isLogin } = require('../middlewares/isLogin')
const isAdmin = require('../middlewares/isAdmin')

router.get('/', getItem)
router.get('/cd', cd)
router.get('/merch', merch)
router.post('/', isLogin, isAdmin, addItem)
router.put('/:id', isLogin, isAdmin, updateItem)
router.put('/buy', isLogin, buyItem)
router.delete('/:id', isLogin, isAdmin, deleteItem)

module.exports = router;
