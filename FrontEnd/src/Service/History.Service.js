import httpClient from "../http-common"; // Asegúrate de que `http-common.js` esté configurado correctamente para Axios.

// Crear una nueva entrada en HistoryCount
const addHistoryCount = data => {
    return httpClient.post("/HistoryCount/add", data);
};

// Obtener una entrada de HistoryCount por su ID
const getHistoryCountById = id => {
    return httpClient.get(`/HistoryCount/${id}`);
};

export default { addHistoryCount, getHistoryCountById };