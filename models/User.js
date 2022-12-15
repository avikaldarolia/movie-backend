module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
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
      timestamps: true
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Playlist, { foreignKey: 'userId' });
    User.hasMany(models.FriendRequest, { foreignKey: 'senderId', as: 'Sender' })
    User.hasMany(models.FriendRequest, { foreignKey: 'receiverId', as: 'Receiver' })
  };
  return User;
};
