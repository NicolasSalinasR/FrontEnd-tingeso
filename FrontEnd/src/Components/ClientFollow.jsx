import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para navegación
import requestService from '../Service/Request.service';
import 'bootstrap/dist/css/bootstrap.min.css';

const RequestTable = () => {
    const [clientId, setClientId] = useState('');
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate(); // Inicializa el hook para navegación

    const handleSearch = async () => {
        try {
            // Realiza la solicitud al backend para obtener las solicitudes por ClientId
            const response = await requestService.getAllRequestByClientId({ rut: clientId });
            setRequests(response.data);
        } catch (error) {
            console.error('Error al obtener las solicitudes', error);
            setRequests([]);
        }
    };

    // Función para obtener la descripción basada en el Stage
    const getDescriptionForStage = (stage) => {
        switch (stage) {
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

    const handleBackToMenu = () => {
        navigate('/home/Client'); // Navega a la ruta del menú anterior
    };

    return (
        <div className="container mt-5 d-flex flex-column align-items-center">
            <div className="w-75">
                <h2 className="text-center mb-4">Revisar el estado de su préstamo</h2>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        placeholder="Ingrese su rut sin puntos ni guion"
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
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request.id}>
                                    <td>{request.id}</td>
                                    <td>{request.clientId}</td>
                                    <td>{request.stage}</td>
                                    <td>{getDescriptionForStage(request.stage)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">No se encontraron solicitudes para este cliente.</p>
                )}

                <div className="mt-3 text-center">
                    <button className="btn btn-secondary" onClick={handleBackToMenu}>
                        Volver al Menú Anterior
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequestTable;
