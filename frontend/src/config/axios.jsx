//REALIZAR CONEXIÓN AL BACKEND CON AXIOS. 
import axios from "axios"; 

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http:localhost:3000/api",
}); 

export default axiosClient; 