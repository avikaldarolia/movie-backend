const DataTypes = require('../Generic/DataTypes')

const Name = 'Movie';

const Attributes = {
    id: DataTypes.INTEGER,
    actors: DataTypes.TEXT,
    awards: DataTypes.TEXT,
    boxOffice: DataTypes.STRING,
    country: DataTypes.STRING,
    director: DataTypes.STRING,
    dvd: DataTypes.STRING,
    genre: DataTypes.TEXT,
    language: DataTypes.STRING,
    metascore: DataTypes.STRING,
    plot: DataTypes.TEXT,
    poster: DataTypes.TEXT,
    rated: DataTypes.STRING,
    ratings: DataTypes.STRING,
    released: DataTypes.STRING,
    runtime: DataTypes.STRING,
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    writer: DataTypes.STRING,
    year: DataTypes.STRING,
    imdbID: DataTypes.STRING,
    imdbRating: DataTypes.STRING,
    imdbVotes: DataTypes.STRING,
    totalSeasons: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
}

const REQUIRED_ATTRIBUTES = ['id']

const GetAttributes = ['id', 'actors', 'awards', 'boxOffice', 'country', 'director', 'dvd', 'genre', 'language', 'metascore', 'plot', 'poster', 'rated', 'ratings', 'released', 'runtime', 'title', 'type', 'writer', 'year', 'imdbID', 'imdbRating', 'imdbVotes', 'totalSeasons', 'createdAt', 'updatedAt'];
const CreateAttributes = ['actors', 'awards', 'boxOffice', 'country', 'director', 'dvd', 'genre', 'language', 'metascore', 'plot', 'poster', 'rated', 'ratings', 'released', 'runtime', 'title', 'type', 'writer', 'year', 'imdbID', 'imdbRating', 'imdbVotes', 'totalSeasons'];
const UpdateAttributes = ['actors', 'awards', 'boxOffice', 'country', 'director', 'dvd', 'genre', 'language', 'metascore', 'plot', 'poster', 'rated', 'ratings', 'released', 'runtime', 'title', 'type', 'writer', 'year', 'imdbID', 'imdbRating', 'imdbVotes', 'totalSeasons'];

module.exports = {
    Attributes,
    Name,
    GetAttributes,
    CreateAttributes,
    UpdateAttributes,

    REQUIRED_ATTRIBUTES
}