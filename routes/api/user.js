const express = require('express');
const router = express.Router();
const user = require('../../controller/user');
router.route('/').post(user.create);

module.exports = router;
