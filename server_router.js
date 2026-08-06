const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./Mongoose/src/config/db.js");
const authRouter = require("./Mongoose/src/routes/authRoute");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);

// /auth/register
// /auth/login
// /auth/logout

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });
