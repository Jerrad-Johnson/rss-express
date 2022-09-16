import axios from "axios";
import {durationToTimeout} from "./variables";

const httpClient = axios.create();
httpClient.defaults.timeout = durationToTimeout;

export default httpClient;