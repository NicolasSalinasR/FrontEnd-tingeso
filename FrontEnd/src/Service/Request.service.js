import httpClient from "../http-common"; // Asegúrate de que este archivo configure Axios correctamente.

// Crear una nueva solicitud
const createRequest = (formData) => {
    return httpClient.post("/Request/create", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// Actualizar el Stage de una solicitud
const updateStage = data => {
    return httpClient.put("/Request/updateStage", data);
};

// Obtener una solicitud por su ID
const getRequestById = id => {
    return httpClient.get(`/Request/get/${id}`);
};

const getAllRequestByClientId = data => {
    return httpClient.post("/Request/getAll/ClientId", data);
};

const getAllRequests = () => {
    return httpClient.get("/Request/getAll");
}



export default { createRequest, updateStage, getRequestById, getAllRequestByClientId, getAllRequests };
