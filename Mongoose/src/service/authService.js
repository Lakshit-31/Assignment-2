const bcrypt = require("bcrypt");
const AuthModel = require("../model/authModel");

const registerService = async ({ name, email, password }) => {
  const userExist = await AuthModel.findOne({ email });

  if (userExist) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await AuthModel.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

module.exports = {
  registerService,
};
