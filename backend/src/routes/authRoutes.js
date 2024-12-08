const express = require('express')
const {registerUser} = require('../controllers/authController')

const validateInput = require('../middlewares/validateInput')


const router = express.Router();


router.post('/register', validateInput(['username', 'email', 'password']), registerUser);

module.exports = router;