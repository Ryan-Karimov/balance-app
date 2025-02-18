const express = require("express");
const bodyParser = require("body-parser");

const runMigrations = require("./migrations/migration-runner");
const { sequelize } = require("./models");
const UserController = require("./controllers/userController");

const app = express();
app.use(bodyParser.json());

app.post("/update-balance", UserController.updateBalance);

const start = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
  } catch (error) {
    console.error("Ошибка запуска приложения:", error);
    process.exit(1);
  }
};

start();
