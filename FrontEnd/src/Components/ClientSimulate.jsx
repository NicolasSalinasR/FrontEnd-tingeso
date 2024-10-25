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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResult(null);

        try {
            const response = await clientService.simulateLoanAmount({
                amount,
                termYears,
                annualInterest,
            });

            setResult(response.data);
        } catch (err) {
            setError('Error al simular el préstamo. Verifica los datos ingresados.');
        }
    };

    const handleNavigate = () => {
        navigate('/home/Client'); // Cambia '/ruta-deseada' a la ruta a la que quieres navegar
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
                <button type="submit" className="btn btn-primary">Simular</button>
            </form>

            {result !== null && (
                <div className="alert alert-success mt-3">
                    Cuota mensual de su prestamo: {result}
                </div>
            )}

            {error && (
                <div className="alert alert-danger mt-3">
                    {error}
                </div>
            )}

            {/* Botón para navegar a otra ruta */}
            <button className="btn btn-secondary mt-3" onClick={handleNavigate}>
                Volver al menu de cliente
            </button>
        </div>
    );
};

export default LoanSimulator;
