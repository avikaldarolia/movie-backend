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

router.route('/requests/:type')
    .get(auth.isJWT, friendRequest.requestList)

router.route('/mapping/:userId')
    .get(auth.isJWT, friendRequest.checkFriendRequestMapping)

router.route('/review/:id')
    .patch(auth.isJWT, friendRequest.reviewFriendRequest)

router.route('/status/:status')
    .get(auth.isJWT, friendRequest.getStatusList)

module.exports = router