const authService = require("../service/authService");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.registerService({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  registerUser,
};
