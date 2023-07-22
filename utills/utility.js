const { default: axios } = require("axios");
const { brochureServiceBaseUrl, brochureServiceApiURL } = require("../config");
const models = require("../models");

exports.getProductDataFromName = async (name, responseObject) =>{
    try {
    const currentProduct = await models.Product.findOne(
      { where: { name: name } },
      (raw = true)
    );
    responseObject['Product'] = currentProduct
    } catch (error) {
    responseObject['Product'] = null
    }
    finally{
    return responseObject
    }
}

exports.getCityDataFromName = async (name, responseObject) =>{
    try {
    const currentCity = await models.City.findOne(
      { where: { name: name } },
      (raw = true)
    );
    responseObject['City'] = currentCity
    } catch (error) {
    responseObject['City'] = null
    }
    finally{
    return responseObject
    }
}

exports.getBrochureData = async (brochureQuery={}, responseObject) =>{
    try {
    if(brochureQuery.hasOwnProperty('lat') && brochureQuery.hasOwnProperty('lng') )
    {
        const qs = new URLSearchParams(brochureQuery);
        console.log("brochureServiceBaseUrl + brochureServiceApiURL + '?' + qs", brochureServiceBaseUrl + brochureServiceApiURL + '?' + qs)
        const brochureDataRes = await axios.get(brochureServiceBaseUrl + brochureServiceApiURL + '?' + qs)
        if(brochureDataRes.status = 200)
        {
            responseObject['brochureData'] = brochureDataRes.data
        }
        return responseObject
    }
    responseObject['brochureData'] = null
    } catch (error) {
    responseObject['brochureData'] = null
    }
    finally{
    return responseObject
    }
}