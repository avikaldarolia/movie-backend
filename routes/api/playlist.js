const express = require('express');
const router = express.Router();
const playlist = require('../../controller/playlist');

router.route('/')
    .get(playlist.get)
    .post(playlist.create)
    .delete(playlist.deleteById)

router.route('/:id')
    .put(playlist.updateById)

router.route('/userId')
    .get(playlist.getByUserId)

module.exports = router;
