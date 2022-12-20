module.exports = (sequelize, DataTypes) => {
    const FriendRequest = sequelize.define('FriendRequest', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.BIGINT,
            autoIncrement: true,
        },
        senderId: {
            allowNull: false,
            type: DataTypes.BIGINT,
        },
        receiverId: {
            allowNull: false,
            type: DataTypes.BIGINT,
        },
        status: {
            type: DataTypes.ENUM,
            values: ["Pending", "Declined", "Accepted"],
            defaultValue: "Pending",
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    },
        {
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );
    FriendRequest.associate = (models) => {
        FriendRequest.belongsTo(models.User, { foreignKey: 'senderId', as: 'Sender' });
        FriendRequest.belongsTo(models.User, { foreignKey: 'receiverId', as: 'Receiver' });
    };
    return FriendRequest;
};

