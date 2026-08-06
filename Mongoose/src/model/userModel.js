const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      minlength: 2,
      maxlength: 246,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
  },
  {
    _id: false,
  },
);

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 128,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      enum: ["MERN", "JAVA"],
      required: true,
      default: "MERN",
      trim: true,
    },
    stream: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 64,
    },
    roll: Number,

    email: {
      type: String,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
      validate: {
        validator: function (value) {
          return ["Male", "Female", "Other"].includes(value);
        },
        message: "gender must be Male , Female or Other.",
      },
    },
    address: addressSchema,
  },
  { timestamps: true },
);

const StudentModel = mongoose.model("students", studentSchema);
module.exports = StudentModel;
