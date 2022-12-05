const express = require('express');
const router = express.Router();
const playlist = require('../../controller/playlist');

router.route('/')
    .post(playlist.create);

router.route('/userId')
    .get(playlist.getByUserId)

module.exports = router;
