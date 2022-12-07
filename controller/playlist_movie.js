const utils = require('../utils/utils');
const _ = require('lodash');

const Playlist_Movie = require('../classes/Playlist_Movie/Playlist_Movie')
const PlaylistMovieFunctions = require('../classes/Playlist_Movie/Functions')
const Constants = require('../classes/Playlist_Movie/Constants')

exports.create = utils.asyncMiddleware(async (req, res, next) => {
    let options = {}
    try {
        let data = _.pick(req.body, Constants.CreateAttributes);
        let response = await Playlist_Movie.Create(data, options);

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})

exports.get = utils.asyncMiddleware(async (req, res, next) => {
    let options = {}
    try {
        let query = _.pick(req.query, [...Constants.GetAttributes], ...['page', 'size'])
        let response = await Playlist_Movie.Get(query, options)

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
        let response = await Playlist_Movie.Update(data, options)
        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next()
    }
});

exports.deleteById = utils.asyncMiddleware(async (req, res, next) => {
    let options = {}
    try {
        let data = req.body
        let response = await Playlist_Movie.Delete(data, options)

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})

exports.fetchOrCreate = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let mapping = req.body;
        let response = await PlaylistMovieFunctions.FindorCreate(mapping)

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})
