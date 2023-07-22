const { default: axios } = require("axios");
const config = require("../config");
const models = require("../models");


exports.createCity = async (req, res) => {
  try {
    const {  name, description, url, enabled = true } = req.body;
    const currentCity = await models.City.findOne(
      { where: { name: name } },
      (raw = true)
    );
    
    if (!currentCity) {
      let CitySaved = await models.City.create({
        name, description, url, enabled
      });
      res.status(200).json({ city: CitySaved.dataValues });
    } 
    else{
      res.status(500).json({ messgage: 'City already exist' });
    }
  } catch (error) {
    console.error("City Registration error", error.message);
    res.status(422).send({ message: error.message || error });
  }
};
exports.getCityList = async (req, res) => {
  try {
    const { offset, limit } = req.query;

    const CityList = await models.City.findAndCountAll({
      offset: offset,
      limit: limit,
      raw: true,
    });
    CityList.currentRecords =
      CityList.rows !== undefined ? CityList.rows.length : 0;
    res.status(200).json({ City: CityList });
  } catch (error) {
    console.error("City error", error.message);
    res.status(422).send({ message: error.message || error });
  }
};
exports.getCity = async (req, res) => {
  try {
    const { name } = req.params;

    const currentCity = await models.City.findOne(
      { where: { name: name } },
      (raw = true)
    );

    res.status(200).json({ City: currentCity });
  } catch (error) {
    console.error("city error", error.message);
    res.status(422).send({ message: error.message || error });
  }
};

exports.deleteCity = async (req, res) => {
  try {
    const { name } = req.params;
    const currentCity = await models.City.findOne(
      { where: { name: name } },
      (raw = true)
    );
    if(currentCity)
    {await models.City.destroy({
      where: { name: name }
    })
    res.status(200).json({ "City Deleted": currentCity.name });
  }
  else{
    res.status(420).json({ CityDeleted: `City name ${name} Not found`  });
  }

    
  } catch (error) {
    console.error("City error", error.message);
    res.status(422).send({ message: error.message || error });
  }
};