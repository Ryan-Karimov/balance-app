const express = require("express");
const router = express.Router();
const User = require("../models/user");
const sequelize = require("../config/database");

router.post("/", async (req, res) => {
  const { userId, amount } = req.body;

  if (!userId || typeof amount !== "number") {
    return res.status(400).json({ error: "Неверные входные данные" });
  }

  const transaction = await sequelize.transaction();
  try {
    const user = await User.findOne({
      where: { id: userId },
      lock: transaction.LOCK.UPDATE,
      transaction,
    });

    if (!user) {
      await transaction.rollback();
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    if (amount < 0 && user.balance + amount < 0) {
      await transaction.rollback();
      return res.status(400).json({ error: "Недостаточно средств на балансе" });
    }

    user.balance += amount;
    await user.save({ transaction });
    await transaction.commit();

    return res.json({ balance: user.balance });
  } catch (error) {
    await transaction.rollback();
    console.error("Ошибка при обновлении баланса:", error);
    return res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

module.exports = router;
