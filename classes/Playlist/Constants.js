const DataTypes = require('../Generic/DataTypes')

const Name = 'Playlist';

const Attributes = {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    isPrivate: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
}

const REQUIRED_ATTRIBUTES = ['id']

const GetAttributes = ['id', 'name', 'isPrivate', 'userId', 'createdAt', 'updatedAt'];
const CreateAttributes = ['name', 'isPrivate', 'userId'];
const UpdateAttributes = ['name', 'isPrivate'];
module.exports = {
    Attributes,
    Name,
    GetAttributes,
    CreateAttributes,
    UpdateAttributes,

    REQUIRED_ATTRIBUTES
}

