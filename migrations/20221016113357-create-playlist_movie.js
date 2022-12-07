'use strict';
const { DataTypes } = require('sequelize')
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Playlist_Movie', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            playlistId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            movieId: {
                type: DataTypes.BIGINT,
                allowNull: false
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
            freezeTableName: true
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Playlist_Movie');
    }
};