import axios from "axios";

const api = axios.create({
    baseURL: 'https://api-deploy-top-gym.cyclic.app',
});

export default api;