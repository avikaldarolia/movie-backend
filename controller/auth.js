const utils = require('../utils/utils')
const bcrypt = require('bcrypt')
const errorConstants = require('../errorConstants')

const User = require('../classes/User/User')
const UserFunctions = require('../classes/User/Functions')


exports.isNewUserValid = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let user = await User.GetByEmail(req.body.email)
        if (user && !utils.empty(user)) {
            return utils.sendResponse(req, res, false, {}, errorConstants.email_already_in_use)
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

        let user = await User.GetByEmail(req.body.email)
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