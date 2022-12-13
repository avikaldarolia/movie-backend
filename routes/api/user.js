const express = require('express');
const router = express.Router();
const user = require('../../controller/user');
const auth = require('../../controller/auth');

router.route('/')
    .get(auth.isJWT, user.get)
    .post(user.create)

module.exports = router;
