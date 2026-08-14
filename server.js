const express = require("express");
const connectDB = require("./Mongoose/src/config/db.js");
const app = express();
const {
  ProductModel,
  UserModel,
  StudentModel,
} = require("../models/indexModel");
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authMiddleware = require("../middleware/AuthMiddleware.js");
const validationMiddleware = require("../middleware/middleware");
app.use(cookieParser());
app.use(express.json());

// ****** CREATE ******

app.post("/createStudent", async (req, res) => {
  try {
    const { name, course, stream, roll, email } = req.body;
    let studentData = {
      name: name,
      course: course,
      stream: stream,
      roll: roll,
      email: email,
    };
    await StudentModel.create(studentData);
    res.send("student successfully created");
  } catch (err) {
    console.log("error", err);
  }
});

// ********* GET DATA ********

app.get("/getAllStudents", async (req, res) => {
  try {
    const { page, limit } = req.query;
    let allStudent = await StudentModel.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(allStudent);
  } catch (err) {
    console.log("Error", err);
  }
});

// ******* GET DATA BY ID ********

app.get("/getStudentByID/:id", async (req, res) => {
  try {
    let singleStudent = await StudentModel.findById(req.params.id);
    if (singleStudent === null) {
      res.status(404).send("student not found");
    }
    res.status(200).json(singleStudent);
  } catch (err) {
    console.log("error", err);
  }
});

// ****** UPDATE DATA *******

app.put("/updateStudent/:id", async (req, res) => {
  try {
    let updateStudent = await StudentModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    );

    if (updateStudent === null) {
      res.status(404).send("student not found");
    }
    res.json(updateStudent);
  } catch (err) {
    console.log("error", err);
  }
});

// ****** DELETE DATA ******

app.delete("/deleteStudent/:id", async (req, res) => {
  try {
    await StudentModel.findByIdAndDelete(req.params.id);
    res.status(200).send("student data deleted successfully");
  } catch (err) {
    console.log("error", err);
  }
});

// ***** REGISTER *****

app.post("/register", validationMiddleware, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ message: "all fields are required" });
    }

    // USER CHECK --------
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.send("user already exists");
    }

    // HASH PASSWORD ---------
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password : ", hashedPassword);
    let userData = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    await UserModel.create(userData);
    res.send("user created successfully");
  } catch (err) {
    // ERROR ------
    console.log("error", err);
  }
});

// LOGIN ------
app.post("/login", validationMiddleware(loginSchema), async (req, res) => {
  try {
    // USER EXIST OR NOT
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send("invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("invalid email or password");
    }

    // JWT TOKEN GENERATE
    const token = jwt.sign({ id: user._id }, "technoNJR", { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });

    // RETURN RESPONSE (JWT TOKEN , USER DATA)
    res.json({ token, user });
  } catch (err) {
    console.log("error", err);
  }
});

// CREATE PRODUCT API -------
app.post(
  "/createproduct",
  validationMiddleware(productSchema),
  async (req, res) => {
    try {
      const existingProduct = await ProductModel.findOne({
        sku: value.sku,
      });

      if (existingProduct) {
        return res.status(400).json({
          message: "Product already exists",
        });
      }
      const product = await ProductModel.create({
        ...value,
      });
      const token = jwt.sign({ id: product.id }, "technoNJR", {
        expiresIn: "1h",
      });
      res.cookie("token", token, {
        httpOnly: true,
      });

      return res.status(201).json({
        message: "Product created successfully",
        token: token,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
);

// app.post("/loginproduct", authMiddleware, async (req, res) => {});
// CREATE PRODUCT API -------
// post method
// try catch
// product check (exist or not)
// create product in db
// return response

// SIGNUP --------
// app.post("/signup", (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   console.log(req.body);

//   res.status(201).json({
//     message: "Account created successfully",
//   });
// });

// GET ALL PRODUCt
// get method
// try catch
// pagination (page , limit) , select fields (name , price , sku , category) , sort by price (asc , desc)
// return response

// *********************

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.log("database connection error");
  });
