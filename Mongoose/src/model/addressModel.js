const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  street: {
    type: String,
    maxlength: 264,
    required: true,
  },

  city: {
    type: String,
    maxlength: 264,
    required: true,
  },

  state: {
    type: String,
    maxlength: 32,
    required: true,
  },

  country: {
    type: String,
    maxlength: 32,
    required: true,
  },

  pincode: {
    type: Number,
    required: true,
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },

    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

const AddressModel = mongoose.model("Address", AddressSchema);

module.exports = AddressModel;;
