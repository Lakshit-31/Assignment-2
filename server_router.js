const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./Mongoose/src/config/db.js");
const authRouter = require("./Mongoose/src/routes/authRoute");
const addressRouter = require("./Mongoose/src/routes/addressRoute");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/auth", addressRouter);

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });
