const express = require("express");
const router = express.Router();

const { loadProductData } = require("../middleware/AbacMiddleware");

router.get("/products/:id", loadProductData, (req, res) => {
  console.log("REQ PRODUCT:", req.product);
  res.status(200).json(req.product);
});

module.exports = router;
