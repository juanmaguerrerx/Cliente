import axios from "axios"

const api = axios.create({
    baseURL: "https://daw2.ieslamarisma.net/proyectos/2024/juanmaguerrero/agencia/agencia-seguros-back/public/api/",
    // baseURL: "http://localhost:8000/api/",
})

export default api;