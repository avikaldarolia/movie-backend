const { Router } = require('express');

const router = Router();
router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/playlist', require('./playlist'));
router.use('/movie', require('./movie'));
router.use('/playlist_movie', require('./playlist_movie'));
router.use('/friends', require('./friendRequest'));
module.exports = router;
