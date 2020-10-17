const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  email: {
    // Trim and lowercase
    type: String, required: true, index: { unique: true }, lowercase: true, trim: true,
  },
  password: {
    type: String, required: true, trim: true,
  },
}, { timestamps: true });

async function generateHash(password) {
  const COST = 12;
  return bcrypt.hash(password, COST);
}

UserSchema.pre('save', function preSave(next) {
  const user = this;
  if(user.password) {
    return generateHash(user.password).then(hash => {
      user.password = hash;
      return next();
    }).catch(error => {
      return next(error);
    });
  }
  return next();
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};


module.exports = mongoose.model('User', UserSchema);