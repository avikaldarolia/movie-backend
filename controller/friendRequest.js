const utils = require('../utils/utils');
const _ = require('lodash');

const Constants = require('../classes/FriendRequest/Constants')
const FriendRequest = require('../classes/FriendRequest/FriendRequest')
const FriendRequestFunctions = require('../classes/FriendRequest/Functions');
const errorConstants = require('../errorConstants');

exports.sendFriendRequest = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let data = _.pick(req.body, Constants.CreateAttributes)
        if (data.senderId == data.receiverId) {
            return utils.sendResponse(req, res, false, {}, errorConstants.invalid_action)
        }

        let mappingCheck = await FriendRequestFunctions.checkMapping(data.senderId, data.receiverId)
        if (utils.empty(mappingCheck)) {
            return utils.sendResponse(req, res, false, {}, errorConstants.friend_request_exits)
        }

        data.status = Constants.PENDING
        let response = await FriendRequest.Create(data)

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})

exports.removeFriend = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let response = await FriendRequest.Delete(req.body)
        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})

exports.requestList = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let userId = parseInt(req.user.id)
        let type = req.params.type
        let response = await FriendRequestFunctions.getRequestList(userId, type)
        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})


exports.getStatusList = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let userId = parseInt(req.user.id)
        // console.log(userId);
        let status = req.params.status
        // console.log(status);
        if (!Constants.ALLOWED_STATUS.includes(status)) {
            return utils.sendResponse(req, res, false, {}, errorConstants.invalid_friendRequest_status)
        }
        let response = await FriendRequestFunctions.statusRequests(userId, status)

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})

exports.reviewFriendRequest = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let status = req.body.status
        if (!Constants.ALLOWED_STATUS.includes(status)) {
            return utils.sendResponse(req, res, false, {}, errorConstants.invalid_friendRequest_status)
        }
        let data = { id: parseInt(req.params.id), status }
        let response = await FriendRequest.Update(data)

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})

exports.getFriends = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let userId = parseInt(req.params.id)
        let response = await FriendRequestFunctions.getFriendLists(userId)

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})

exports.checkFriendRequestMapping = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let senderId = parseInt(req.user.id)
        let receiverId = parseInt(req.params.userId)
        let response = await FriendRequestFunctions.checkMapping(senderId, receiverId)

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})