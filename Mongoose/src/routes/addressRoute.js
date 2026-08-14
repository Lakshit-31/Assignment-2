const express = require("express");
const addressRouter = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const AddressModel = require("../model/addressModel");

// Create Address
addressRouter.post("/createaddress", authMiddleware, async (req, res) => {
  try {
    const { type, street, city, state, country, pincode, latitude, longitude } =
      req.body;

    const addressData = {
      user: req.user._id,
      type,
      street,
      city,
      state,
      country,
      pincode,
      location: {
        type: "Point",
        coordinates: [Number(longitude), Number(latitude)],
      },
    };

    const address = await AddressModel.create(addressData);

    res.status(201).json({
      success: true,
      message: "Address created successfully",
      data: address,
    });
  } catch (err) {
    console.error("Create address error:", err);

    res.status(500).json({
      message: "Error creating address",
    });
  }
});

// Search Address
addressRouter.get("/search", authMiddleware, async (req, res) => {
  try {
    const { street } = req.query;
    const addresses = await AddressModel.find({
      user: req.user._id,
      street: {
        $regex: street.trim(),
        $options: "i",
      },
    }).limit(20);

    res.status(200).json({
      data: addresses,
    });
  } catch (err) {
    console.error("Search address error:", err);

    res.status(500).json({
      success: false,
      message: "Error searching address",
    });
  }
});

module.exports = addressRouter;
