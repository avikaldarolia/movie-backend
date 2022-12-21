const express = require('express');
const router = express.Router();
const user = require('../../controller/user');
const auth = require('../../controller/auth');

router.route('/')
    .get(auth.isJWT, user.get)

router.route('/search')
    .post(auth.isJWT, user.search)

module.exports = router;