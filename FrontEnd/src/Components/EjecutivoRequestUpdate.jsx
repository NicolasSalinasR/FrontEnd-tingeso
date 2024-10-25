import React, { useState, useEffect } from "react";
import RequestService from "../Service/Request.service";
import { useLocation } from "react-router-dom"; // Importa useLocation para acceder al estado

const UpdateStageForm = () => {
    const location = useLocation(); // Obtener el estado pasado
    const { id, clientId, stage: initialStage } = location.state; // Extraer el id, clientId y el stage inicial del estado
    const [stage, setStage] = useState(initialStage || ''); // Inicializar el estado del stage con el valor recibido
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const body = {
                Id: id.toString(), // Asegúrate de incluir el id en el cuerpo
                Stage: stage.toString(),
            };

            const response = await RequestService.updateStage(body);
            setMessage(response.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMessage('Request not found!');
            } else {
                setMessage('Error updating stage');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Actualizar Etapa de la Solicitud</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>ID del Cliente: (Auto)</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={clientId} 
                        readOnly // Hacer el campo de ID de cliente solo lectura
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>ID de la Solicitud: (Auto)</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={id} 
                        readOnly // Hacer el campo de ID de solicitud solo lectura
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Nuevo Stage:</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={stage} 
                        onChange={(e) => setStage(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Actualizar</button>
            </form>

            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
    );
};

export default UpdateStageForm;
