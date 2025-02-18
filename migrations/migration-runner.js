const { Umzug, SequelizeStorage } = require("umzug");
const { sequelize, Sequelize } = require("../models");

const runMigrations = async () => {
  const umzug = new Umzug({
    migrations: { glob: "migrations/*.js" },
    storage: new SequelizeStorage({ sequelize }),
    // Передаём объект с queryInterface и Sequelize в контекст
    context: { queryInterface: sequelize.getQueryInterface(), Sequelize },
    logger: console,
  });

  await umzug.up();
};

module.exports = runMigrations;
