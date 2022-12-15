'use strict';
const { DataTypes } = require('sequelize')
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('FriendRequest', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.BIGINT,
                autoIncrement: true,
            },
            senderId: {
                allowNull: false,
                type: DataTypes.BIGINT,
                unique: true
            },
            receiverId: {
                allowNull: false,
                type: DataTypes.BIGINT,
                unique: true
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
        }, {
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('FriendRequest');
    }
};