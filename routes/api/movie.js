const express = require('express');
const router = express.Router();
const movie = require('../../controller/movie');

router.route('/')
    .get(movie.get)
    .post(movie.create)
// .delete(movie.deleteById)

// router.route('/:id')
// .put(movie.updateById)

router.route('/fetch')
    .post(movie.fetchOrCreate)

module.exports = router;
