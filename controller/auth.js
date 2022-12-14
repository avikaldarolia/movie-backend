const utils = require('../utils/utils')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const _ = require('lodash')
const configParameters = require('../config/config').parameters;

const errorConstants = require('../errorConstants')
const User = require('../classes/User/User')
const UserFunctions = require('../classes/User/Functions')

exports.isJWT = async (req, res, next) => {
    if (utils.isLocalEnvironment()) {
        console.log('123');
        req.user = await User.GetById(1)
        console.log('345');
        return next();
    }

    if (utils.empty(req.headers.authorization)) {
        return res.status(401).send({ message: "Invalid Authorization" });
    }

    let token = _.trimStart(req.headers.authorization, 'JWT ');
    let jwtKey = configParameters.jwtKey;

    let payload = jwt.decode(token, jwtKey);

    let user = await User.GetById(payload.id, {});
    if (utils.empty(user)) {
        return res.status(401).send({ message: "Invalid Authorization" });
    }

    req.user = user;

    return next();
}

exports.isNewUserValid = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let data = _.pick(req.body, Constants.CreateAttributes);
        if (!data.username || !data.email || !data.password) {
            return utils.sendResponse(req, res, false, {}, errorConstants.invalid_data)
        }
        if (data.password.length < 6) {
            return utils.sendResponse(req, res, false, {}, errorConstants.invalid_password_length)
        }

        let user = await User.GetByEmailorUsername(data.email, data.username)
        if (user && !utils.empty(user)) {
            return utils.sendResponse(req, res, false, {}, errorConstants.cred_already_in_use)
        }

        return next();
    } catch (err) {
        return utils.sendResponse(req, res, false, {}, err)
    }
})

exports.login = utils.asyncMiddleware(async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    try {
        if (!email || !password) {
            return utils.sendResponse(req, res, false, {}, errorConstants.invalid_data)
        }
        if (password.length < 6) {
            return utils.sendResponse(req, res, false, {}, errorConstants.invalid_password_length)
        }

        let user = await User.GetByEmailorUsername(req.body.email, req.body.username)
        console.log(user);

        if (!user || utils.empty(user)) {
            return utils.sendResponse(req, res, false, {}, errorConstants.invalid_credentials)
        }
        let verifyPassword = await bcrypt.compare(password, user.password)
        if (!verifyPassword) {
            return utils.sendResponse(req, res, false, {}, errorConstants.invalid_credentials)
        }
        let jwt = UserFunctions.getUserJWT(user)

        return utils.sendResponse(req, res, true, { user, jwt: jwt.data }, "")
    } catch (err) {
        return utils.sendResponse(req, res, false, {}, err)
    }
})