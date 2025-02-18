const { User, sequelize, Sequelize } = require("../models");
const { Op } = Sequelize;

class UserService {
  static async updateBalance(userId, amount) {
    const condition = {
      id: userId,
      [Op.and]: sequelize.where(sequelize.literal(`balance + ${amount}`), {
        [Op.gte]: 0,
      }),
    };

    const [affectedRows] = await User.update(
      { balance: sequelize.literal(`balance + ${amount}`) },
      { where: condition }
    );

    if (affectedRows === 0) {
      throw new Error("Недостаточно средств или неверный userId");
    }

    return await User.findByPk(userId);
  }
}

module.exports = UserService;
