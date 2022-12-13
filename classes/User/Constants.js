const DataTypes = require('../Generic/DataTypes')

const Name = 'User';

const LOGIN_EXPIRE_TIME = 365 * 24 * 60 * 60 * 1000;

const Attributes = {
    id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
}

const REQUIRED_ATTRIBUTES = ['id']

const GetAttributes = ['id', 'username', 'email', 'createdAt', 'updatedAt'];
const CreateAttributes = ['username', 'email', 'password'];
const UpdateAttributes = ['username', 'password'];
module.exports = {
    Attributes,
    Name,
    GetAttributes,
    CreateAttributes,
    UpdateAttributes,
    LOGIN_EXPIRE_TIME,
    REQUIRED_ATTRIBUTES
}

