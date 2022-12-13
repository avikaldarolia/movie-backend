'use strict';
const { DataTypes } = require('sequelize')
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Movies', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.BIGINT,
                autoIncrement: true,
            },
            actors: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            awards: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            boxOffice: {
                type: DataTypes.STRING,
                allowNull: true
            },
            country: {
                type: DataTypes.STRING,
                allowNull: true
            },
            director: {
                type: DataTypes.STRING,
                allowNull: true
            },
            dvd: {
                type: DataTypes.STRING,
                allowNull: true
            },
            genre: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            language: {
                type: DataTypes.STRING,
                allowNull: true
            },
            metascore: {
                type: DataTypes.STRING,
                allowNull: true
            },
            plot: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            poster: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            rated: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ratings: {
                type: DataTypes.STRING,
                allowNull: true
            },
            released: {
                type: DataTypes.STRING,
                allowNull: true
            },
            runtime: {
                type: DataTypes.STRING,
                allowNull: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: true
            },
            type: {
                type: DataTypes.STRING,
                allowNull: true
            },
            writer: {
                type: DataTypes.STRING,
                allowNull: true
            },
            year: {
                type: DataTypes.STRING,
                allowNull: true
            },
            imdbID: {
                type: DataTypes.STRING,
                allowNull: true
            },
            imdbRating: {
                type: DataTypes.STRING,
                allowNull: true
            },
            imdbVotes: {
                type: DataTypes.STRING,
                allowNull: true
            },
            totalSeasons: {
                type: DataTypes.STRING,
                allowNull: true
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
            timestamps: true
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Movies');
    }
};