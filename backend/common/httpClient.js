const axios = require("axios");
const httpClient = axios.create();
const durationToTimeout = 10000;

httpClient.defaults.timeout = durationToTimeout;

module.exports.durationToTimeout = durationToTimeout;
module.exports.httpClient = httpClient;


