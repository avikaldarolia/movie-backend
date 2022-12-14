const utils = require('../utils/utils');
const _ = require('lodash');

const Playlist = require('../classes/Playlist/Playlist')
const PlaylistFunctions = require('../classes/Playlist/Functions')
const Playlist_MovieFunctions = require('../classes/Playlist_Movie/Functions')
const Constants = require('../classes/Playlist/Constants')

exports.create = utils.asyncMiddleware(async (req, res, next) => {
    let options = {}
    try {
        let data = _.pick(req.body, Constants.CreateAttributes);
        let nameValidity = await PlaylistFunctions.playlistNameExists(data.userId, data.name)
        if (!nameValidity.data) {
            return utils.sendResponse(req, res, false, nameValidity.data, nameValidity.err)
        }
        let response = await Playlist.Create(data, options)
        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})

exports.get = utils.asyncMiddleware(async (req, res, next) => {
    let options = {}
    try {
        let query = _.pick(req.query, [...Constants.GetAttributes], ...['page', 'size'])
        let response = await Playlist.Get(query, options)

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})

exports.updateById = utils.asyncMiddleware(async (req, res, next) => {
    let options = {}
    let id = parseInt(req.params.id)
    let body = _.pick(req.body, Constants.UpdateAttributes);
    let data = _.assign({ id }, { ...body });

    try {
        let response = await Playlist.Update(data, options)
        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next()
    }
});

exports.deleteById = utils.asyncMiddleware(async (req, res, next) => {
    let options = {}
    try {
        let data = req.body
        await Playlist_MovieFunctions.deleteByPlaylistId(data.id)
        let response = await Playlist.Delete(data, options)
        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})

exports.getByUserId = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let userId = parseInt(req.params.userId);
        let response = await PlaylistFunctions.getByUserId(userId)

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})

exports.checkPlaylistNameExists = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let { name } = req.body
        let userId = parseInt(req.user.id)
        let response = await PlaylistFunctions.playlistNameExists(userId, name)

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})

exports.getPlaylistDetails = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let id = parseInt(req.params.id)
        let response = await PlaylistFunctions.playlistDetails(id)

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})
