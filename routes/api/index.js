const { Router } = require('express');

const router = Router();
router.use('/user', require('./user'));
router.use('/playlist', require('./playlist'));
module.exports = router;
