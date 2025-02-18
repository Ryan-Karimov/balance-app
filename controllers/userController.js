const UserService = require("../services/userService");

class UserController {
  static async updateBalance(req, res) {
    try {
      const { userId, amount } = req.body;

      if (typeof userId !== "number" || typeof amount !== "number") {
        return res
          .status(400)
          .json({ error: "Параметры userId и amount должны быть числами" });
      }

      const user = await UserService.updateBalance(userId, amount);
      res.json({ balance: user.balance });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;
