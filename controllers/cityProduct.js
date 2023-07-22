const { default: axios } = require("axios");
const config = require("../config");
const { getProductDataFromName, getCityDataFromName, getBrochureData } = require("../utills/utility");

exports.getCityAndProductData = async (req, res) => {
  try {
    const {  city, product } = req.params;
    const brochureQuery = {...req.query}
    let responseObj = {}

    // Fetching Product data below
    responseObj = {...await getProductDataFromName(product, responseObj)}
    responseObj = {...await getCityDataFromName(city, responseObj)}
    responseObj = {...await getBrochureData(brochureQuery, responseObj)}
    
    res.status(200).json(responseObj);
    
  } catch (error) {
    console.error("Failed to fetch data", error.message);
    res.status(422).send({ message: error.message || error });
  }
};