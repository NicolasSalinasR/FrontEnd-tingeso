import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clientService from '../Service/Client.service';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';

const TotalCostSimulator = () => {
    const [amount, setAmount] = useState('');
    const [termYears, setTermYears] = useState('');
    const [annualInterest, setAnnualInterest] = useState('');
    const [seguroDegrabacion, setSeguroDegrabacion] = useState('');
    const [seguroIncendio, setSeguroIncendio] = useState('');
    const [comision, setComision] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateInputs = () => {
        if (Number(amount) <= 0 || !Number.isInteger(Number(amount))) {
            return "Monto debe ser un entero mayor a cero.";
        }
        if (Number(termYears) <= 0 || !Number.isInteger(Number(termYears))) {
            return "Años del préstamo debe ser un entero mayor a cero.";
        }
        if (Number(annualInterest) <= 0) {
            return "Tasa de interés anual debe ser un número decimal mayor a cero.";
        }
        if (Number(seguroDegrabacion) <= 0 || !Number.isInteger(Number(seguroDegrabacion))) {
            return "Seguro de Grabación debe ser un entero mayor a cero.";
        }
        if (Number(seguroIncendio) <= 0 || !Number.isInteger(Number(seguroIncendio))) {
            return "Seguro Incendio debe ser un entero mayor a cero.";
        }
        if (Number(comision) <= 0 || !Number.isInteger(Number(comision))) {
            return "Comisión debe ser un entero mayor a cero.";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResult(null);

        const validationError = validateInputs();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await clientService.totalCost({
                amount: Number(amount),
                termYears: Number(termYears),
                annualInterest: Number(annualInterest),
                seguroDegrabacion: Number(seguroDegrabacion),
                seguroIncendio: Number(seguroIncendio),
                comision: Number(comision),
            });

            setResult(response.data);
        } catch (err) {
            setError('Error al calcular el costo total. Verifica los datos ingresados.');
        }
    };

    const handleNavigate = () => {
        navigate('/home/Client');
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
                <h2>Calculadora de costos de tu préstamo</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Monto:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Años del préstamo:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={termYears}
                            onChange={(e) => setTermYears(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Tasa de interés anual (%):</label>
                        <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            value={annualInterest}
                            onChange={(e) => setAnnualInterest(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Seguro de Grabación:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={seguroDegrabacion}
                            onChange={(e) => setSeguroDegrabacion(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Seguro Incendio:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={seguroIncendio}
                            onChange={(e) => setSeguroIncendio(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Comisión:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={comision}
                            onChange={(e) => setComision(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Calcular Costo Total</button>
                </form>

                {result !== null && (
                    <div className="alert alert-success mt-3">
                        Resultado: {result}
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger mt-3">
                        {error}
                    </div>
                )}

                <button className="btn btn-secondary mt-3" onClick={handleNavigate}>
                    Volver a Inicio
                </button>
            </div>
        </div>
    );
};

export default TotalCostSimulator;
