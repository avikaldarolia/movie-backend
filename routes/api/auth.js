const express = require('express');
const router = express.Router();
const auth = require('../../controller/auth');
const user = require('../../controller/user')

router.route('/signup')
    .post(auth.isNewUserValid, user.create)

router.route('/login')
    .post(auth.login)

module.exports = router;
