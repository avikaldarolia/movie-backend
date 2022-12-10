const utils = require('../../utils/utils')
const models = require('../../models/index')

const Constants = require('./Constants')

/**
 * Finds or Creates playlist_movie mapping
 * @param {*} mapping 
 * @returns 
 */
const FindorCreate = async (mapping) => {
    let mappingData = {
        playlistId: parseInt(mapping.playlistId),
        movieId: parseInt(mapping.movieId),
    }
    try {
        let fetchedMapping = utils.parseSafe(await models[Constants.Name].findOrCreate({
            where: {
                playlistId: parseInt(mapping.playlistId),
                movieId: parseInt(mapping.movieId),
            },
            defaults: mappingData
        }))
        return utils.classResponse(true, fetchedMapping, '')

    } catch (err) {
        return utils.classResponse(false, {}, '')
    }
}

/**
 * Delete playlist_movie mappings by playlistId
 * @param {*} playlistId 
 * @returns 
 */
const deleteByPlaylistId = async (playlistId) => {
    try {
        let mappings = utils.parseSafe(await models[Constants.Name].destroy({
            where: {
                playlistId: parseInt(playlistId)
            }
        }))

        return utils.classResponse(true, mappings, '')
    } catch (err) {
        return utils.classResponse(false, {}, '')
    }
}

module.exports = {
    FindorCreate,
    deleteByPlaylistId
}
