const productController = require('../controllers/product');

module.exports = router => {
  router.post('/v1/product', productController.createProduct);
  router.get('/v1/product/:name', productController.getProduct);
  router.get('/v1/products/', productController.getProductList);
  router.delete('/v1/product/:name', productController.deleteProduct);
};