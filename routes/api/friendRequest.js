const express = require('express');
const router = express.Router();
const auth = require('../../controller/auth');
const friendRequest = require('../../controller/friendRequest')

router.route('/addFriend')
    .post(friendRequest.sendFriendRequest)


module.exports = router