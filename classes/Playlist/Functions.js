const utils = require('../../utils/utils')
const model = require('../../models/index')
const errorConstants = require('../../errorConstants')

const Constants = require('./Constants')
const { Op } = require('sequelize')

/**
 * Get all Playlists by userId
 * @param {*} userId 
 * @returns 
 */
const getByUserId = async (userId) => {
    try {
        let playlists = utils.parseSafe(await model[Constants.Name].findAll({
            where: {
                userId: parseInt(userId)
            }
        }))
        return utils.classResponse(true, playlists, '')
    } catch (err) {
        return utils.classResponse(false, {}, err)
    }
}

/**
 * Checks if a playlist with @param name exists 
 * @param {*} userId 
 * @param {*} name 
 * @returns 
 */
const checkValidName = async (userId, name) => {
    try {
        let playlist = utils.parseSafe(await model[Constants.Name].findOne({
            where: {
                userId: parseInt(userId),
                name: {
                    [Op.eq]: name
                }
            }
        }))
        return utils.classResponse(true, utils.empty(playlist), utils.empty(playlist) ? '' : errorConstants.playlist_name_already_exits)
    } catch (err) {
        return utils.classResponse(false, {}, err)
    }
}

module.exports = {
    getByUserId,
    checkValidName
}