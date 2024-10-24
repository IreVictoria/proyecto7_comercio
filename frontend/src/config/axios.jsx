//REALIZAR CONEXIÓN AL BACKEND CON AXIOS. 
import axios from "axios"; 

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http:localhost:3000/api",
}); 
if(!import.meta.env.VITE_BACKEND_URL){
    console.error("Error: VITE_BACKEND_URL no esta definido en el archivo .env");
} else {
    console.log("VITE_BACKEND_URL:", import.meta.env.VITE_BACKEND_URL);
}

export default axiosClient; 