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

const loginService = async ({ email, password }) => {
  // Find user by email
  const user = await AuthModel.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare entered password with hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  return user;
};

module.exports = {
  registerService,
  loginService,
};
