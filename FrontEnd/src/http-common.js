import axios from "axios";

// Obtener las variables de entorno
const BackendServer = import.meta.env.VITE_BACKEND_SERVER;
const BackendPort = import.meta.env.VITE_BACKEND_PORT;

// Verifica que las variables estén definidas
if (!BackendServer || !BackendPort) {
    console.error("Faltan las variables de entorno: VITE_BACKEND_SERVER y VITE_BACKEND_PORT");
}

console.log(BackendServer);
console.log(BackendPort);

// Crear instancia de axios
const apiClient = axios.create({
    baseURL: `http://${BackendServer}:${BackendPort}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
