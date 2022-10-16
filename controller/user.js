const User = require("../classes/User/User");
const Utils = require("../utils/utils");
const { asyncMiddleware } = require("../utils/utils")
const Constants = require('../classes/User/Constants')
const _ = require('lodash')
const create = asyncMiddleware(async (req, res, next) => {
    let userData = _.pick(req.body, Constants.CreateAttributes);
    try {
        let newUser = await User.Create(userData, {});
        return Utils.sendResponse(
            req,
            res,
            next,
            newUser.success,
            newUser.data,
            newUser.err
        );
    } catch (err) {
        console.log(err);
        return Utils.sendResponse(
            req,
            res,
            next,
            false,
            {},
            err
        );
        // next(err);
    }
})

module.exports = { create }