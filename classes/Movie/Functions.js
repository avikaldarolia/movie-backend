const utils = require('../../utils/utils')
const models = require('../../models/index')
const _ = require('lodash')

const Constants = require('./Constants')

const FindorCreate = async (movie) => {
    let movieData = {
        actors: movie.Actors,
        awards: movie.Awards,
        boxOffice: movie.BoxOffice,
        country: movie.Country,
        director: movie.Director,
        dvd: movie.DVD,
        genre: movie.Genre,
        language: movie.Language,
        metascore: movie.Metascore,
        plot: movie.Plot,
        poster: movie.Poster,
        rated: movie.Rated,
        ratings: movie.Ratings[0].Value, // taking the first rating always
        released: movie.Released,
        runtime: movie.Runtime,
        title: movie.Title,
        type: movie.Type,
        writer: movie.Writer,
        year: movie.Year,
        imdbID: movie.imdbID,
        imdbRating: movie.imdbRating,
        imdbVotes: movie.imdbVotes,
        totalSeasons: movie.totalSeasons
    }
    movieData = _.omitBy(movieData, _.isNil);
    console.log("movieData:", movieData);
    try {
        let fetchedMovie = utils.parseSafe(await models[Constants.Name].findOrCreate({
            where: {
                title: movieData.title
            },
            defaults: movieData
        }))
        console.log(fetchedMovie);
        return utils.classResponse(true, fetchedMovie, '')
    } catch (err) {
        console.log('=====');
        console.log("err:", err);
        return utils.classResponse(false, {}, '')
    }
}

module.exports = {
    FindorCreate
}
