import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clientService from '../Service/Client.service';

const LoanSimulator = () => {
    const [amount, setAmount] = useState('');
    const [termYears, setTermYears] = useState('');
    const [annualInterest, setAnnualInterest] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateInputs = () => {
        if (!Number.isInteger(Number(amount)) || Number(amount) <= 0)
            return "El monto debe ser un número entero positivo.";
        if (!Number.isInteger(Number(termYears)) || Number(termYears) <= 0)
            return "Los años del préstamo deben ser un número entero positivo.";
        if (Number(annualInterest) <= 0 || Number(annualInterest) > 100)
            return "La tasa de interés anual debe estar entre 0 y 100.";
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
            const response = await clientService.simulateLoanAmount({
                amount: Number(amount),
                termYears: Number(termYears),
                annualInterest: Number(annualInterest),
            });

            setResult(response.data.toFixed(2));
        } catch (err) {
            setError('Error al simular el préstamo. Por favor, intente nuevamente.');
        }
    };

    const handleNavigate = () => {
        navigate('/home/Client');
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Simulador de Préstamo</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="amount">Monto:</label>
                    <input
                        id="amount"
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Ingrese el monto"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="termYears">Años del préstamo:</label>
                    <input
                        id="termYears"
                        type="number"
                        className="form-control"
                        value={termYears}
                        onChange={(e) => setTermYears(e.target.value)}
                        placeholder="Ingrese la duración del préstamo en años"
                        required
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="annualInterest">Tasa de interés anual (%):</label>
                    <input
                        id="annualInterest"
                        type="number"
                        step="0.01"
                        className="form-control"
                        value={annualInterest}
                        onChange={(e) => setAnnualInterest(e.target.value)}
                        placeholder="Ingrese la tasa de interés"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">Simular Crédito</button>
            </form>

            {result !== null && (
                <div className="alert alert-success mt-3">
                    <strong>¡Éxito!</strong> Cuota mensual de su préstamo: <strong>${result}</strong>
                </div>
            )}

            {error && (
                <div className="alert alert-danger mt-3">
                    <strong>Error:</strong> {error}
                </div>
            )}

            <button className="btn btn-secondary w-100" onClick={handleNavigate}>
                Volver al menú de cliente
            </button>
        </div>
    );
};

export default LoanSimulator;
