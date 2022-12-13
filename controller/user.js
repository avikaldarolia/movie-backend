const config = require('../config/config').parameters
const utils = require('../utils/utils');
const _ = require('lodash');
const bcrypt = require("bcrypt");
const errorConstants = require('../errorConstants')

const User = require('../classes/User/User')
const UserFunctions = require('../classes/User/Functions')
const Constants = require('../classes/User/Constants')

exports.create = utils.asyncMiddleware(async (req, res, next) => {
    let options = {}
    try {
        let data = _.pick(req.body, Constants.CreateAttributes);
        if (!data.username || !data.email || !data.password) {
            return utils.sendResponse(req, res, false, {}, errorConstants.invalid_data)
        }
        if (data.password.length < 6) {
            return utils.sendResponse(req, res, false, {}, errorConstants.invalid_password_length)
        }

        const salt = await bcrypt.genSalt(+config.salt)
        data.password = await bcrypt.hash(data.password, salt);

        let response = utils.parseSafe(await User.Create(data, options))
        let jwt = UserFunctions.getUserJWT(response)

        return utils.sendResponse(req, res, response.success, { user: response.data, jwt: jwt.data }, response.err)

    } catch (err) {
        next(err)
    }
})

exports.get = utils.asyncMiddleware(async (req, res, next) => {
    let options = {}
    try {
        let query = _.pick(req.query, [...Constants.GetAttributes], ...['page', 'size'])
        let response = await User.Get(query, options)

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})

exports.updateById = utils.asyncMiddleware(async (req, res, next) => {
    let options = {}
    let id = parseInt(req.params.id)
    let body = _.pick(req.body, Constants.UpdateAttributes);
    let data = _.assign({ id }, { ...body });

    try {
        let response = await User.Update(data, options)
        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next()
    }
});

exports.deleteById = utils.asyncMiddleware(async (req, res, next) => {
    let options = {}
    try {
        let data = req.body
        let response = await User.Delete(data, options)

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})
