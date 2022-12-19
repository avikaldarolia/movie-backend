const DataTypes = require('../Generic/DataTypes')

const Name = 'FriendRequest';

const Attributes = {
    id: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
}

const ACCEPTED = 'Accepted'
const DECLINED = 'Declined'
const PENDING = 'Pending'

const ALLOWED_STATUS = [ACCEPTED, DECLINED, PENDING]

const REQUIRED_ATTRIBUTES = ['id']

const GetAttributes = ['id', 'status', 'senderId', 'receiverId', 'createdAt', 'updatedAt'];
const CreateAttributes = ['senderId', 'receiverId', 'status'];
const UpdateAttributes = ['status'];

module.exports = {
    Attributes,
    Name,
    GetAttributes,
    CreateAttributes,
    UpdateAttributes,
    REQUIRED_ATTRIBUTES,
    ALLOWED_STATUS,
    ACCEPTED,
    DECLINED,
    PENDING
}

