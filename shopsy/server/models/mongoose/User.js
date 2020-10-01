const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


const UserSchema = mongoose.Schema({
  email: {
    // Trim and lowercase
    type: String, required: true, index: { unique: true }, lowercase: true, trim: true,
  },
  password: {
    type: String, required: true, trim: true,
  },
}, { timestamps: true });

UserSchema.pre('save', function preSave(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    // hash the password using our new salt
    return bcrypt.hash(user.password, salt, (hasherr, hash) => {
      if (hasherr) return next(hasherr);
      // override the cleartext password with the hashed one
      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};


module.exports = mongoose.model('User', UserSchema);
