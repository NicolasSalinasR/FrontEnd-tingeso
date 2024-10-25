import httpClient from "../http-common";

const create = data => {
    return httpClient.post("/Client/add", data);
}

const get = id => {
    return httpClient.get(`/Client/${id}`);
}

const simulateLoanAmount = data => {
    return httpClient.post('/Client/simulateLoanAmount', data);
}

const P4 = data => {
    return httpClient.post(`/Client/P4`, data);
}

const totalCost = data => {
    return httpClient.post(`/Client/totalCost`, data);
}


export default { totalCost, create, get, simulateLoanAmount, P4 };
