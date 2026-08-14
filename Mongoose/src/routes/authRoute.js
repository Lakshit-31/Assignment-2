const express = require("express");
const validationMiddleware = require("../middleware/middleware");
const authController = require("../controller/authController");
const {
  registrationSchema,
  loginSchema,
} = require("../validationSchema/allSchema");

const authRouter = express.Router();

// register api logic
authRouter.post(
  "/register",
  validationMiddleware(registrationSchema),
  authController.registerUser,
);

// login api logic
authRouter.post(
  "/login",
  validationMiddleware(loginSchema),
  authController.loginUser,
);
module.exports = authRouter;