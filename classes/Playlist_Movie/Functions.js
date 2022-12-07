const utils = require('../../utils/utils')
const models = require('../../models/index')

const Constants = require('./Constants')

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

module.exports = {
    FindorCreate
}
