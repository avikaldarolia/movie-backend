const DataTypes = require('../Generic/DataTypes')

const Name = 'Playlist';

const Attributes = {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
}

const REQUIRED_ATTRIBUTES = ['id']

const GetAttributes = ['id', 'name', 'status', 'userId', 'createdAt', 'updatedAt'];
const CreateAttributes = ['name', 'status', 'userId'];
const UpdateAttributes = ['name', 'status'];
module.exports = {
    Attributes,
    Name,
    GetAttributes,
    CreateAttributes,
    UpdateAttributes,

    REQUIRED_ATTRIBUTES
}

