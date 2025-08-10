const axios = require("axios");
const { API_GATEWAY_ENDPOINT } = require("../config/allEnv");

const endpoints = {
  authService: `${API_GATEWAY_ENDPOINT}/auth`,
  publicPostService: `${API_GATEWAY_ENDPOINT}/publicPostRoutes`,
  s3CloneService: `${API_GATEWAY_ENDPOINT}/s3_clone`,
  instaScrapService: `${API_GATEWAY_ENDPOINT}/insta_scrap`,
  chatService: `${API_GATEWAY_ENDPOINT}/chat`,
};

const createService = (baseURL) => {
  return axios.create({
    baseURL,
  });
};

const createAllServices = () => {
  const services = {};
  for (const [key, baseURL] of Object.entries(endpoints)) {
    services[key] = createService(baseURL);
  }
  return services;
};

const allServices = createAllServices();

module.exports = allServices;
