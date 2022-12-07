const DataTypes = require('../Generic/DataTypes')

const Name = 'Playlist_Movie';

const Attributes = {
    id: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
}

const REQUIRED_ATTRIBUTES = ['id']

const GetAttributes = ['id', 'playlistId', 'isPrivate', 'movieId', 'createdAt', 'updatedAt'];
const CreateAttributes = ['playlistId', 'isPrivate', 'movieId'];
const UpdateAttributes = ['playlistId', 'isPrivate'];
module.exports = {
    Attributes,
    Name,
    GetAttributes,
    CreateAttributes,
    UpdateAttributes,

    REQUIRED_ATTRIBUTES
}

