const policies = require("../config/policies");
const { ProductModel } = require("../model/indexModel");

const loadProductData = async (req, res, next) => {
  const productData = await ProductModel.findById(req.params.id);

  if (!productData) {
    return res.send("product not found");
  }

  req.product = productData;
  refres;
  next();
};

module.exports = {
  loadProductData,
};
