const utils = require('../../utils/utils')
const model = require('../../models/index')

const Constants = require('./Constants')

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

module.exports = {
    getByUserId
}