const cityController = require('../controllers/city');

module.exports = router => {
  router.post('/v1/city', cityController.createCity);
  router.get('/v1/city/:name', cityController.getCity);
  router.get('/v1/cities/', cityController.getCityList);
  router.delete('/v1/city/:name', cityController.deleteCity);
};