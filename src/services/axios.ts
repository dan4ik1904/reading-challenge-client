import axios from "axios";

const api = axios.create({
    baseURL: 'https://reading-challenge.daniyaldobro.ru/api/v1'
})

export default api