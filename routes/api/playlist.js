const express = require('express');
const router = express.Router();
const playlist = require('../../controller/playlist');

router.route('/')
    .get(playlist.get)
    .post(playlist.create)
    .delete(playlist.deleteById)

router.route('/userId/:userId')
    .get(playlist.getByUserId)

router.route('/:id')
    .get(playlist.getPlaylistDetails)
    .put(playlist.updateById)


router.route('/checkValidName')
    .post(playlist.checkValidName)

module.exports = router;
