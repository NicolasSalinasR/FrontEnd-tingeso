import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import clientService from '../Service/Client.service'; // Importa el servicio

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

            {result !== null && (
                <div className="alert alert-success mt-3">
                    Cuota mensual de su préstamo: {result}
                </div>
            )}

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
    );
};

export default LoanSimulator;
