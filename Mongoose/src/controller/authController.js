const authService = require("../service/authService");
const jwt = require("jsonwebtoken");

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

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.loginService({
      email,
      password,
    });

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "technoNJR",
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log("Token created");
    console.log("Cookie created");

    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (err) {
    console.log("error", err);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
