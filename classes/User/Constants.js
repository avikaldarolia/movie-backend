const DataTypes = require('../Generic/DataTypes')

const Name = 'User';

const Attributes = {
    id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
}

const REQUIRED_ATTRIBUTES = ['id']

const GetAttributes = ['id', 'email', 'password', 'createdAt', 'updatedAt'];
const CreateAttributes = ['email', 'password'];
const UpdateAttributes = ['password'];
module.exports = {
    Attributes,
    Name,
    GetAttributes,
    CreateAttributes,
    UpdateAttributes,

    REQUIRED_ATTRIBUTES
}

