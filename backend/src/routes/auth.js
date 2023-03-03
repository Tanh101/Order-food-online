const express = require('express');
require('dotenv').config();

const router = express.Router();
const authController = require('../app/controller/authController');

//@route POST api/auth/register
//@desc Register user
//@access public
router.post('/register', authController.register);

//@route POST api/auth/login
//@desc Login user
//@access public
router.post('/login', authController.login);

module.exports = router;