const utils = require('../utils/utils');
const _ = require('lodash');

const Playlist = require('../classes/Playlist/Playlist')
const Constants = require('../classes/Playlist/Constants')

exports.create = utils.asyncMiddleware(async (req, res, next) => {
    let options = {}
    try {
        let data = _.pick(req.body, Constants.CreateAttributes);
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
        let response = await Playlist.Delete(data, options)

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})