const cityProductController = require('../controllers/cityProduct');

module.exports = router => {
  router.get('/v1/cityProduct/:city/:product', cityProductController.getCityAndProductData);
};