const express = require('express');
const router = express.Router();
const user = require('../../controller/user');

router.route('/')
    .get(user.get)
    .post(user.create)

module.exports = router;
