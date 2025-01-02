import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Dropdown } from 'react-bootstrap';
import requestService from '../Service/Request.service';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClientRequest = () => {
    const [formData, setFormData] = useState({
        typeOfRequest: '',
        stage: '',
        Amount: '',
        termYears: '',
        clientId: '',
        pdfFile: null,
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            pdfFile: file,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.typeOfRequest) {
            newErrors.typeOfRequest = "El tipo de solicitud es obligatorio.";
        }

        if (!Number.isInteger(Number(formData.stage)) || Number(formData.stage) <= 0) {
            newErrors.stage = "La etapa debe ser un número entero mayor a cero.";
        }
        if (!Number.isInteger(Number(formData.Amount)) || Number(formData.Amount) <= 0) {
            newErrors.Amount = "El monto debe ser un número entero mayor a cero.";
        }
        if (!Number.isInteger(Number(formData.termYears)) || Number(formData.termYears) <= 0) {
            newErrors.termYears = "Los años del plazo deben ser un número entero mayor a cero.";
        }
        if (!Number.isInteger(Number(formData.clientId)) || Number(formData.clientId) <= 0) {
            newErrors.clientId = "El Run del cliente debe ser solo numérico (no incluya puntos ni guion).";
        }
        if (!formData.pdfFile || formData.pdfFile.type !== 'application/pdf') {
            newErrors.pdfFile = "Debes subir un archivo en formato PDF.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

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
                navigate("/home/Client");
            })
            .catch(error => {
                console.error("Error al crear la solicitud: ", error);
                alert("Ocurrió un error al enviar la solicitud");
            });
    };

    return (
        <div>
            {/* Barra de navegación */}
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Container>
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic" className="burger-menu">
                            <span className="navbar-toggler-icon"></span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => navigate('/client/add')}>Crear Cuenta</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/client/Histori/add')}>Depositar/Retirar</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/client/TotalCost')}>Costo Total Préstamo</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/client/simulate')}>Simular Crédito</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/client/Request')}>Solicitar Préstamo</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/client/Follow')}>Seguimiento Solicitud</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/home/Ejecutivo')}>¿Eres un ejecutivo? Presiona aquí</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Navbar.Brand href="#home">Cliente - PrestaFacil</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Container>
            </Navbar>

            {/* Estilos adicionales */}
            <style>
                {`
                    .navbar {
                        border-bottom: 3px solid #00bcd4;
                    }
                    .burger-menu {
                        margin-right: 15px;
                    }
                    .display-4 {
                        font-family: 'Roboto', sans-serif;
                        font-weight: bold;
                    }
                    .navbar .nav-link {
                        font-size: 1.1rem;
                        font-weight: 600;
                        transition: background-color 0.3s ease;
                    }
                    .navbar .nav-link:hover {
                        background-color: rgba(0, 123, 255, 0.1);
                        border-radius: 5px;
                    }
                    .content {
                        margin-top: 80px; /* Ajuste para que no se superponga con la barra fija */
                    }
                `}
            </style>

            <div className="container mt-5">
                <h2>Crear Nueva Solicitud</h2>
                <form onSubmit={handleSubmit} className="mt-4">
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
                            <option value="Primera Vivienda">Primera Vivienda</option>
                            <option value="Segunda Vivienda">Segunda Vivienda</option>
                            <option value="Propiedades Comerciales">Propiedades Comerciales</option>
                            <option value="Remodelación">Remodelación</option>
                        </select>
                        {errors.typeOfRequest && <small className="text-danger">{errors.typeOfRequest}</small>}
                    </div>

                    {['stage', 'Amount', 'termYears', 'clientId'].map((field) => (
                        <div className="mb-3" key={field}>
                            <label htmlFor={field} className="form-label">
                                {field === 'stage' ? 'Etapa' : 
                                 field === 'Amount' ? 'Monto' : 
                                 field === 'termYears' ? 'Años del Plazo' : 'Run del Cliente'}
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id={field}
                                name={field}
                                value={formData[field]}
                                onChange={handleInputChange}
                                step="1"
                                required
                            />
                            {errors[field] && <small className="text-danger">{errors[field]}</small>}
                        </div>
                    ))}

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
                        {errors.pdfFile && <small className="text-danger">{errors.pdfFile}</small>}
                    </div>

                    <button type="submit" className="btn btn-primary">Enviar Solicitud</button>
                    <button 
                        type="button" 
                        className="btn btn-secondary ms-3" 
                        onClick={() => navigate('/home/Client')}
                    >
                        Volver a Inicio
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ClientRequest;
