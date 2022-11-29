import axios from "axios";

//Base da API: https://api.hgbrasil.com/
//URL da API: weather?key=9a6df803&city_name=Campinas,SP

const api = axios.create({
    baseURL: 'https://api.hgbrasil.com/'
});

export default api;