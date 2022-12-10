const utils = require('../../utils/utils')
const models = require('../../models/index')
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
        let playlists = utils.parseSafe(await models[Constants.Name].findAll({
            where: {
                userId: parseInt(userId),
            },
            include: [models.Movie]
        }))
        return utils.classResponse(true, playlists, '')
    } catch (err) {
        console.log(err);
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
        let playlist = utils.parseSafe(await models[Constants.Name].findOne({
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

const playlistDetails = async (id) => {
    try {
        let playlist = utils.parseSafe(await models[Constants.Name].findOne({
            where: {
                id: parseInt(id),
            },
            include: [
                models.Movie,
            ]
        }))
        return utils.classResponse(true, playlist, '')
    } catch (err) {
        console.log(err);
        return utils.classResponse(false, {}, err)
    }
}

module.exports = {
    getByUserId,
    checkValidName,
    playlistDetails
}