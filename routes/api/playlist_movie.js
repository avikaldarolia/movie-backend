const express = require('express');
const router = express.Router();
const playlistMovie = require('../../controller/playlist_movie');
const auth = require('../../controller/auth');

router.route('/')
    .get(auth.isJWT, playlistMovie.get)
    .post(auth.isJWT, playlistMovie.create)
    .delete(auth.isJWT, playlistMovie.deleteById)

// router.route('/:id')
// .put(playlistMovie.updateById)

router.route('/fetch')
    .post(auth.isJWT, playlistMovie.fetchOrCreate)

module.exports = router;
