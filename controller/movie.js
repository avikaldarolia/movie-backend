const utils = require('../utils/utils');
const _ = require('lodash');

const Movie = require('../classes/Movie/Movie')
const MovieFunctions = require('../classes/Movie/Functions')
const Constants = require('../classes/Movie/Constants')

exports.create = utils.asyncMiddleware(async (req, res, next) => {
    let options = {}
    try {
        let data = _.pick(req.body, Constants.CreateAttributes);
        let response = await Movie.Create(data, options);

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})

exports.get = utils.asyncMiddleware(async (req, res, next) => {
    let options = {}
    try {
        let query = _.pick(req.query, [...Constants.GetAttributes], ...['page', 'size'])
        let response = await Movie.Get(query, options)

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
        let response = await Movie.Update(data, options)
        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next()
    }
});

exports.deleteById = utils.asyncMiddleware(async (req, res, next) => {
    let options = {}
    try {
        let data = req.body
        let response = await Movie.Delete(data, options)

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})

exports.fetchOrCreate = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let movie = req.body;
        let response = await MovieFunctions.FindorCreate(movie)

        return utils.sendResponse(req, res, response.success, response.data, response.err)
    } catch (err) {
        next(err)
    }
})
