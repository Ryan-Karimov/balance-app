"use strict";

module.exports = {
  up: async ({ context }) => {
    const { queryInterface, Sequelize } = context;
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });

    await queryInterface.bulkInsert("users", [
      {
        balance: 10000,
      },
    ]);
  },

  down: async ({ context }) => {
    const { queryInterface } = context;
    await queryInterface.dropTable("users");
  },
};
