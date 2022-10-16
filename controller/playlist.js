const Playlist = require("../classes/Playlist/Playlist");
const Utils = require("../utils/utils");
const { asyncMiddleware } = require("../utils/utils")
const Constants = require('../classes/Playlist/Constants')
const _ = require('lodash')
const create = asyncMiddleware(async (req, res, next) => {
    let userData = _.pick(req.body, Constants.CreateAttributes);
    try {
        let newPlaylist = await Playlist.Create(userData, {});
        return Utils.sendResponse(
            req,
            res,
            next,
            newPlaylist.success,
            newPlaylist.data,
            newPlaylist.err
        );
    } catch (err) {
        console.log(err);
        return Utils.sendResponse(
            req,
            res,
            next,
            false,
            {},
            err
        );
        // next(err);
    }
})

module.exports = { create }