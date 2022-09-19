import axios from "axios";
export const durationToTimeout = 10000;
const cc = console.log;

const httpClient = axios.create();
httpClient.defaults.timeout = durationToTimeout;
httpClient.defaults.withCredentials = true;

export default httpClient;