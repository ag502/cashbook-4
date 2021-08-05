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
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(80),
      },
      provider: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'local',
      },
    },
    {
      tableName: 'user',
      indexes: [
        {
          unique: true,
          fields: ['nickname', 'provider'],
        },
      ],
    }
  );

  return user;
};

export default user;
