const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const throwError = require("../utility/throwError.util");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!this.isModified("password")) return next();
  const hashRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, hashRounds);
  user.password = hashedPassword;
  next();
});

userSchema.set("toJSON", {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id;
    delete returnObj._id;
    delete returnObj.password;
    delete returnObj.__v;
  },
});

userSchema.statics.matchPassword = async function (email, password) {
  if (!email || !password)
    throwError(400, "email and password are required field");
  const user = await this.findOne({ email });
  if (!user) throwError(404, "Not Found");
  return (await bcrypt.compare(password, user.password)) ? user : null;
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
