const express = require('express');
const router = express.Router();
const auth = require('../../controller/auth');
const friendRequest = require('../../controller/friendRequest')

router.route('/:id')
    .get(auth.isJWT, friendRequest.getFriends)

router.route('/addFriend')
    .post(auth.isJWT, friendRequest.sendFriendRequest)

router.route('/removeFriend')
    .post(auth.isJWT, friendRequest.removeFriend)

router.route('/status/:status')
    .get(auth.isJWT, friendRequest.getStatusList)

router.route('/review/:id')
    .patch(auth.isJWT, friendRequest.reviewFriendRequest)

module.exports = router