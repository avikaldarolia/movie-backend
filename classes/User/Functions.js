const utils = require('../../utils/utils');
const config = require('../../config/config');
const jwt = require('jwt-simple');
const _ = require('lodash');
const moment = require('moment');

const Constants = require('./Constants');

const getUserJWT = (loginData, options = {}) => {
    let jwtData = _.pick(loginData, ['id', 'email', 'createdAt', 'phone']);
    jwtData.expireTime = moment() + Constants.LOGIN_EXPIRE_TIME;
    let jwtToken = 'JWT ' + jwt.encode(jwtData, config.parameters.jwtKey);
    return utils.classResponse(true, jwtToken, '');
}

module.exports = {
    getUserJWT
}