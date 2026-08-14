const ProductModel = require("../model/productModel");

const loadProductData = async (req, res, next) => {
  console.log("ID:", req.params.id);

  const productData = await ProductModel.findById(req.params.id);
  
  console.log("PRODUCT:", productData);

  if (!productData) {
    return res.status(404).send("product not found");
  }

  req.product = productData;
  next();
};

module.exports = {
  loadProductData,
};
