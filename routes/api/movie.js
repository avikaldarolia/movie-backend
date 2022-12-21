const express = require('express');
const router = express.Router();
const movie = require('../../controller/movie');
const auth = require('../../controller/auth');

router.route('/')
    .get(auth.isJWT, movie.get)
    .post(auth.isJWT, movie.create)
// .delete(movie.deleteById)

// router.route('/:id')
// .put(movie.updateById)

router.route('/fetch')
    .post(auth.isJWT, movie.fetchOrCreate)

module.exports = router;
