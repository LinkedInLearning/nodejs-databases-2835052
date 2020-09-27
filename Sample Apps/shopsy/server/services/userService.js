const UserModel = require('../models/mongoose/User');

async function getAll() {
  return UserModel.find({}).sort({ createdAt: -1 });
}

async function getOne(userId) {
  return UserModel.findOne({ _id: userId });
}

async function create(data) {
  const user = new UserModel(data);
  return user.save();
}

async function update(userId, data) {
  const user = await getOne(userId);

  if (!user) return new Error('Could not find requested user');

  Object.keys(data).forEach((key) => {
    user[key] = data[key];
  });

  return user.save();
}

async function remove(userId) {
  const result = await UserModel.remove({ _id: userId });
  return result.result.n;
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
