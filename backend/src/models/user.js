import DataTypes from 'sequelize';

const user = (sequelize) => {
  const user = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nickname: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
    },
    {
      tableName: 'user',
    }
  );

  return user;
};

export default user;
