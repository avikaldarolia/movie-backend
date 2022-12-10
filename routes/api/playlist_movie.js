const express = require('express');
const router = express.Router();
const playlistMovie = require('../../controller/playlist_movie');

router.route('/')
    .get(playlistMovie.get)
    .post(playlistMovie.create)
    .delete(playlistMovie.deleteById)

// router.route('/:id')
// .put(playlistMovie.updateById)

router.route('/fetch')
    .post(playlistMovie.fetchOrCreate)

module.exports = router;
