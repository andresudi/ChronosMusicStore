var express = require('express');
var router = express.Router();
const { register, getAllUser, login } = require('../controllers/usersController')

router.get('/', getAllUser)
router.post('/register', register)
router.post('/login', login)

module.exports = router;
