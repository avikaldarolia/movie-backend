const express = require('express');
const router = express.Router();
const playlist = require('../../controller/playlist');
const auth = require('../../controller/auth');

router.route('/')
    .get(auth.isJWT, playlist.get)
    .post(auth.isJWT, playlist.create)
    .delete(auth.isJWT, playlist.deleteById)

router.route('/userId/:userId')
    .get(auth.isJWT, playlist.getByUserId)

router.route('/:id')
    .get(auth.isJWT, playlist.getPlaylistDetails)
    .put(auth.isJWT, playlist.updateById)


router.route('/checkValidName')
    .post(auth.isJWT, playlist.checkPlaylistNameExists)

module.exports = router;
