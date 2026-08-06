const express = require("express");
const http = require("http");
const validation = require("./middleware");
const vaildation = require("./middleware.js");
const app = express();
app.use(express.json());
app.use("/user", validation);

let students = [
  { id: 1, name: "Lakshit" },
  { id: 2, name: "John" },
  { id: 3, name: "Brian" },
  { id: 4, name: "kevin" },
];

// VIEW DATA
app.get("/student", (req, res) => {
  res.json(students);
});

// CREATE NEW DATA
app.post("/student", (req, res) => {
  students.push(req.body);

  res.status(201).json({ message: "student detail added " });
});

// UPDATE DATA
app.put("/student/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((student) => student.id === id);
  student.name = req.body.name;
  res.json(student);
});

// DELETE DATA

app.delete("/student/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((student) => student.id === id);

  if (index === -1) {
    res.send("student data is not available");
  }
  students.splice(index, 1);

  res.status(200).json({ message: "student data deleted successfully" });
});

// *************** SERVER ******************
app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
