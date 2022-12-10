module.exports = (sequelize, DataTypes) => {
    const Playlist_Movie = sequelize.define('Playlist_Movie', {
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
    Playlist_Movie.associate = (models) => {
        Playlist_Movie.belongsTo(models.Playlist, { foreignKey: 'playlistId', as: 'Playlist', onDelete: 'cascade', hooks: true, allowNull: false });
        Playlist_Movie.belongsTo(models.Movie, { foreignKey: 'movieId', as: 'Movie' });
    };
    return Playlist_Movie;
}
