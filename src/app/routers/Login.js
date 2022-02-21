const express = require('express');
const rescue = require('express-rescue');

const Login = require('../controllers/Login');

const router = express.Router({ mergeParams: true });

router.post('/', rescue(Login));

module.exports = router;
