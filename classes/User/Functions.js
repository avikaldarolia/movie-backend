const utils = require('../../utils/utils');
const config = require('../../config/config');
const jwt = require('jwt-simple');
const _ = require('lodash');
const { Op } = require('sequelize/types');
const moment = require('moment');

const models = require('../../models/index')
const Constants = require('./Constants');

const getUserJWT = (loginData, options = {}) => {
    let jwtData = _.pick(loginData, ['id', 'email', 'createdAt', 'phone']);
    jwtData.expireTime = moment() + Constants.LOGIN_EXPIRE_TIME;
    let jwtToken = 'JWT ' + jwt.encode(jwtData, config.parameters.jwtKey);
    return utils.classResponse(true, jwtToken, '');
}

const searchUser = async (name) => {
    try {
        let users = utils.parseSafe(await models[Constants.Name].findAll({
            where: {
                username: {
                    [Op.like]: `*${name}*`
                }
            }
        }))
        return utils.classResponse(true, users, '')
    } catch (err) {
        return utils.classResponse(false, {}, '')
    }
}

module.exports = {
    getUserJWT,
    searchUser
}
