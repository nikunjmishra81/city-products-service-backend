require("dotenv").config({
  path: "./.env",
});
module.exports = {
  env: process.env.NODE_ENV || "development",
  server: {
    baseUrl: process.env.SERVER_BASE_URL || "http://127.0.0.1:3036/",
    port: process.env.PORT || "3036",
    apiVersion:"api/v1/"
  },

  brochureServiceBaseUrl : process.env[`${process.env.use_env_variable}_BROCHURE_SERVICE_URL`] || 'http://127.0.0.1:8001',
  brochureServiceApiURL : '/api/v1/brochures/search'
 
};
