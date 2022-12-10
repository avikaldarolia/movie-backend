module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    isPrivate: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
  });

  Playlist.associate = (models) => {
    Playlist.belongsTo(models.User, { foreignKey: 'userId' });
    Playlist.hasMany(models.Playlist_Movie, { foreignKey: 'playlistId', onDelete: 'CASCADE', hooks: true });
    Playlist.belongsToMany(models.Movie, { through: models.Playlist_Movie, foreignKey: 'playlistId', onDelete: 'CASCADE', hooks: true })
  };
  return Playlist;
}
