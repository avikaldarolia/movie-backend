const utils = require('../utils/utils');
const _ = require('lodash');

const FriendRequest = require('../classes/FriendRequest/FriendRequest')
const Constants = require('../classes/FriendRequest/Constants')

exports.sendFriendRequest = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let data = _.pick(req.body, Constants.CreateAttributes)
        data.status = Constants.PENDING
        console.log(data);
        let response = await FriendRequest.Create(data)

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})
