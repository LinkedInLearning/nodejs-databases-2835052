const UserModel = require('../models/mongoose/User');

class UserService {
  static async getAll() {
    return UserModel.find({}).sort({ createdAt: -1 });
  }

  static async getOne(userId) {
    return UserModel.findById(userId).exec();
  }

  static async create(data) {
    const user = new UserModel(data);
    return user.save();
  }

  static async update(userId, data) {
    // This is a bit clumsy but makes sure that the
    // pre save hook is applied.
    const user = await UserModel.findById(userId);
    const updatedUser = Object.assign(user, data);
    return updatedUser.save();
  }

  static async remove(userId) {
    return UserModel.deleteOne({ _id: userId }).exec();
  }
}

module.exports = UserService;