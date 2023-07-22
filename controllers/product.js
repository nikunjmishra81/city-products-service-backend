const { default: axios } = require("axios");
const config = require("../config");
const models = require("../models");


exports.createProduct = async (req, res) => {
  try {
    const {  name, description, url, enabled = true } = req.body;
    const currentProduct = await models.Product.findOne(
      { where: { name: name } },
      (raw = true)
    );
    
    if (!currentProduct) {
      let ProductSaved = await models.Product.create({
        name, description, url, enabled
      });
      res.status(200).json({ product: ProductSaved.dataValues });
    } 
    else{
      res.status(500).json({ messgage: 'Product already exist' });
    }
  } catch (error) {
    console.error("Product Registration error", error.message);
    res.status(422).send({ message: error.message || error });
  }
};
exports.getProductList = async (req, res) => {
  try {
    const { offset, limit } = req.query;

    const ProductList = await models.Product.findAndCountAll({
      offset: offset,
      limit: limit,
      raw: true,
    });
    ProductList.currentRecords =
      ProductList.rows !== undefined ? ProductList.rows.length : 0;
    res.status(200).json({ Product: ProductList });
  } catch (error) {
    console.error("Product error", error.message);
    res.status(422).send({ message: error.message || error });
  }
};
exports.getProduct = async (req, res) => {
  try {
    const { name } = req.params;

    const currentProduct = await models.Product.findOne(
      { where: { name: name } },
      (raw = true)
    );

    res.status(200).json({ Product: currentProduct });
  } catch (error) {
    console.error("product error", error.message);
    res.status(422).send({ message: error.message || error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { name } = req.params;
    const currentProduct = await models.Product.findOne(
      { where: { name: name } },
      (raw = true)
    );
    if(currentProduct)
    {await models.Product.destroy({
      where: { name: name }
    })
    res.status(200).json({ "Product Deleted": currentProduct.name });
  }
  else{
    res.status(420).json({ ProductDeleted: `Product name ${name} Not found`  });
  }

    
  } catch (error) {
    console.error("Product error", error.message);
    res.status(422).send({ message: error.message || error });
  }
};