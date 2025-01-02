import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import clientService from '../Service/Client.service'; // Importa el servicio
import { Navbar, Container, Dropdown } from 'react-bootstrap'; // Asegúrate de importar estos componentes

const LoanSimulator = () => {
    const [amount, setAmount] = useState('');
    const [termYears, setTermYears] = useState('');
    const [annualInterest, setAnnualInterest] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate

    const validateInputs = () => {
        if (!Number.isInteger(Number(amount)) || Number(amount) <= 0) 
            return "El monto debe ser un número entero mayor a cero.";
        if (!Number.isInteger(Number(termYears)) || Number(termYears) <= 0) 
            return "Los años del préstamo deben ser un número entero mayor a cero.";
        if (Number(annualInterest) <= 0) 
            return "La tasa de interés anual debe ser mayor a cero.";
        return null; // No hay errores
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
            const response = await clientService.simulateLoanAmount({
                amount: Number(amount),
                termYears: Number(termYears),
                annualInterest: Number(annualInterest),
            });

            setResult(response.data);
        } catch (err) {
            setError('Error al simular el préstamo. Verifica los datos ingresados.');
        }
    };

    const handleNavigate = () => {
        navigate('/home/Client'); // Cambia '/home/Client' a la ruta deseada
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

            {/* Formulario para Simulador de Préstamo */}
            <div className="container mt-5">
                <h2>Simulador de Préstamo</h2>
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
                    <button type="submit" className="btn btn-primary">Simular Crédito</button>
                </form>

                {/* Mostrar resultado */}
                {result !== null && (
                    <div className="alert alert-success mt-3">
                        Cuota mensual de su préstamo: {result}
                    </div>
                )}

                {/* Mostrar error */}
                {error && (
                    <div className="alert alert-danger mt-3">
                        {error}
                    </div>
                )}

                {/* Botón para navegar a otra ruta */}
                <button className="btn btn-secondary mt-3" onClick={handleNavigate}>
                    Volver al menú de cliente
                </button>
            </div>
        </div>
    );
};

export default LoanSimulator;
