import axios from "axios";
export const durationToTimeout = 10000;

const httpClient = axios.create();
httpClient.defaults.timeout = durationToTimeout;

export default httpClient;