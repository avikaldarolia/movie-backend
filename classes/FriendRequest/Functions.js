const utils = require('../../utils/utils')
const models = require('../../models/index')
const { Op } = require('sequelize')

const Constants = require('./Constants')

const checkMapping = async (senderId, receiverId) => {
    try {
        senderId = parseInt(senderId)
        receiverId = parseInt(receiverId)
        let mapping = utils.parseSafe(await models[Constants.Name].findOne({
            where: {
                [Op.or]: [
                    {
                        senderId: senderId,
                        receiverId: receiverId
                    },
                    {
                        senderId: receiverId,
                        receiverId: senderId
                    }
                ]
            }
        }))
        return utils.classResponse(true, mapping, '')
    } catch (err) {
        return utils.classResponse(false, {}, err)
    }
}

/**
 * Return the list of pending/declined friend requests of logged in user
 * @param {*} userId 
 * @returns 
 */
const statusRequests = async (userId, status) => {
    try {
        console.log(userId);
        let requests = utils.parseSafe(await models[Constants.Name].findAll({
            where: {
                receiverId: parseInt(userId),
                status: status
            }
        }))
        console.log(requests);
        return utils.classResponse(true, requests, '')
    } catch (err) {
        console.log(err);
        return utils.classResponse(false, {}, err)
    }
}

/**
 * Return all the friends of the user
 * @param {*} userId 
 * @returns 
 */
const getFriendLists = async (userId) => {
    try {
        let friends = utils.parseSafe(await models[Constants.Name].findAll({
            where: {
                status: Constants.ACCEPTED,
                [Op.or]: [
                    { receiverId: parseInt(userId) },
                    { senderId: parseInt(userId) }
                ]
            },
            include: [
                { model: models.User, as: 'Sender' },
                { model: models.User, as: 'Receiver' }
            ]
        }))

        return utils.classResponse(true, friends, '')
    } catch (err) {
        return utils.classResponse(false, {}, err)
    }
}



module.exports = {
    checkMapping,
    statusRequests,
    getFriendLists
}