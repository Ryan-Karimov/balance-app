module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );

  return User;
};
