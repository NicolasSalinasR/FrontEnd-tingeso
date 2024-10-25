import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import requestService from '../Service/Request.service';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClientRequest = () => {
    const [formData, setFormData] = useState({
        typeOfRequest: '',
        stage: '',
        Amount: '',
        termYears: '',
        clientId: '',
        pdfFile: null
    });
    
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            pdfFile: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("typeOfRequest", formData.typeOfRequest);
        data.append("stage", formData.stage);
        data.append("Amount", formData.Amount);
        data.append("termYears", formData.termYears);
        data.append("clientId", formData.clientId);
        data.append("pdfFile", formData.pdfFile);

        requestService.createRequest(data)
            .then(response => {
                console.log("Solicitud creada: ", response.data);
                alert("Solicitud enviada exitosamente");
            })
            .catch(error => {
                console.error("Error al crear la solicitud: ", error);
                alert("Ocurrió un error al enviar la solicitud");
            });
    };

    return (
        <div className="container mt-5">
            <h2>Crear Nueva Solicitud</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                {/* Cambiamos el input de texto por un select */}
                <div className="mb-3">
                    <label htmlFor="typeOfRequest" className="form-label">Tipo de Solicitud</label>
                    <select
                        className="form-select"
                        id="typeOfRequest"
                        name="typeOfRequest"
                        value={formData.typeOfRequest}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Seleccione un tipo de solicitud</option>
                        <option value="Primera Vivienda "> Primera Vivienda</option>
                        <option value="Segunda Vivienda">Segunda Vivienda</option>
                        <option value="Propiedades Comerciales ">Propiedades Comerciales</option>
                        <option value="Remodelación">Remodelación</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="stage" className="form-label">Etapa</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="stage" 
                        name="stage" 
                        value={formData.stage}
                        onChange={handleInputChange}
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="Amount" className="form-label">Monto</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="Amount" 
                        name="Amount" 
                        value={formData.Amount}
                        onChange={handleInputChange}
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="termYears" className="form-label">Años del Plazo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="termYears" 
                        name="termYears" 
                        value={formData.termYears}
                        onChange={handleInputChange}
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="clientId" className="form-label">ID del Cliente</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="clientId" 
                        name="clientId" 
                        value={formData.clientId}
                        onChange={handleInputChange}
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="pdfFile" className="form-label">Subir PDF</label>
                    <input 
                        type="file" 
                        className="form-control" 
                        id="pdfFile" 
                        name="pdfFile"
                        onChange={handleFileChange}
                        required 
                    />
                </div>

                <button type="submit" className="btn btn-primary">Enviar Solicitud</button>

                {/* Botón de Navegación */}
                <button 
                    type="button" 
                    className="btn btn-secondary ms-3" 
                    onClick={() => navigate('/home/Client')}
                >
                    Volver a Inicio
                </button>
            </form>
        </div>
    );
};

export default ClientRequest;
