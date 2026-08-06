// OS module
// express intro , routing all concepts , use get put post delete , route handlers , middlewares

const express = require("express");
const authorization = require("./middleware.js");
const app = express();
app.use(express.json());
let students = [
  {
    id: 1,
    name: "lakshit",
  },
  {
    id: 2,
    name: "lakshit_2",
  },
  {
    id: 3,
    name: "lakshit_3",
  },
];

app.use("/admin", authorization);
// ****** USER API STARTS *******

app.get("/admin/create", (req, res, next) => {
  res.send("user is created");
});

app.use("/admin", (req, res) => {
  res.send("user details here");
});

// ******* USER API ENDS ********

// app.get("/student", (req, res) => {
//   res.send("data from get students");
// });

// app.use("/student", (req, res, next) => {
//   console.log("request handle 1");
//   res.send("student details from route handler 1");
//   next();
// });

// app.use("/user", (req, res, next) => {
//   let token = 123;
//   let isAuthorized = token === 123;
//   if (!isAuthorized) {
//     res.status(401).send({ message: "you are not authorized" });
//   }
//   next();
// });

// app.get("/user", (req, res) => {
//   res.send("hello user!");
// });

app.post("/user", (req, res) => {
  let token = 123;
  if (token === 123) {
    res.send({ name: "Harry", age: 20 });
  } else {
    res.statusCode(400).send("user not found");
  }
});

// SHOW DATA

app.get("/student", (req, res) => {
  res.json(students);
});

// TO ADD DATA

app.post("/student", (req, res) => {
  students.push(req.body);
  res.send("student added");
});

// TO UPDATE DATA
app.put("/student/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((s) => s.id === id);
  student.name = req.body.name;
  res.json(student);
});

// DELETE DATA
app.delete("/student/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((student) => student.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "student not found" });
  }
  students.splice(index, 1);

  res.status(200).json({ message: "student deleted successfully", students });
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
