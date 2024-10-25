import React, { useState } from 'react';
import requestService from '../Service/Request.service';
import 'bootstrap/dist/css/bootstrap.min.css';

const RequestTable = () => {
    const [clientId, setClientId] = useState('');
    const [requests, setRequests] = useState([]);

    const handleSearch = async () => {
        try {
            // Realiza la solicitud al backend para obtener las solicitudes por ClientId
            const response = await requestService.getAllRequestByClientId({ ClientId: clientId });
            setRequests(response.data);
        } catch (error) {
            console.error('Error al obtener las solicitudes', error);
            setRequests([]);
        }
    };

    // Función para obtener la descripción basada en el Stage
    const getDescriptionForStage = (stage) => {
        switch(stage) {
            case 1:
                return 'E1. En Revisión Inicial.';
            case 2:
                return 'E2. Pendiente de Documentación';
            case 3:
                return 'E3. En Evaluación';
            case 4:
                return 'E4. Pre-Aprobada.';
            case 5:
                return 'E5. En Aprobación Final.';    
            case 6:
                return 'E6. Aprobada. ';   
            case 7:
                return 'E7. Rechazada. ';  
            case 8:
                return 'E8. Cancelada por el Cliente. ';    

            case 9:
                return 'E9. En Desembolso. '; 
            default:
                return 'Si aparece este mensaje contacte con un ejecutivo del banco';
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="w-75">
                <h2 className="text-center mb-4">Buscar Solicitudes por ClientId</h2>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        placeholder="Ingrese el ClientId del cliente"
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary" onClick={handleSearch}>
                            Buscar
                        </button>
                    </div>
                </div>

                {requests.length > 0 ? (
                    <table className="table table-bordered table-hover table-striped text-center">
                        <thead className="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>ClientId</th>
                                <th>Stage</th>
                                <th>Descripción</th> {/* Nueva columna para la descripción */}
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request.id}>
                                    <td>{request.id}</td>
                                    <td>{request.clientId}</td>
                                    <td>{request.stage}</td>
                                    <td>{getDescriptionForStage(request.stage)}</td> {/* Mostrar la descripción */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">No se encontraron solicitudes para este cliente.</p>
                )}
            </div>
        </div>
    );
};

export default RequestTable;
