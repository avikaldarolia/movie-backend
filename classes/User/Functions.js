const utils = require('../../utils/utils');
const config = require('../../config/config');
const jwt = require('jwt-simple');
const _ = require('lodash');
const { Op } = require('sequelize');
const moment = require('moment');

const models = require('../../models/index')
const Constants = require('./Constants');
const User = require('./User')

/**
 * Check username validity
 * @param {*} username
 * @returns
 */
const isValidUsername = async username => {
    let userDetails = await User.Get(
        { username: username, isUsernameVerified: true },
        {}
    );
    if (userDetails.data.count > 0) {
        return utils.classResponse(false, {}, i18n.__('error_user_exist_email'));
    }

    return utils.classResponse(true);
};

const getUserJWT = (loginData, options = {}) => {
    let jwtData = _.pick(loginData, ['id', 'email', 'createdAt', 'username']);
    jwtData.expireTime = moment() + Constants.LOGIN_EXPIRE_TIME;
    let jwtToken = 'JWT ' + jwt.encode(jwtData, config.parameters.jwtKey);
    return utils.classResponse(true, jwtToken, '');
}

const searchUser = async (name) => {
    try {
        let users = utils.parseSafe(await models[Constants.Name].findAll({
            where: {
                username: {
                    [Op.like]: `%${name}%`
                }
            }
        }))
        console.log("users", users);
        return utils.classResponse(true, users, '')
    } catch (err) {
        return utils.classResponse(false, {}, '')
    }
}

module.exports = {
    getUserJWT,
    searchUser
}
