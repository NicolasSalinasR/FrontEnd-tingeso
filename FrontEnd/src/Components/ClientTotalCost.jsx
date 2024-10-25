import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clientService from '../Service/Client.service';

const TotalCostSimulator = () => {
    const [amount, setAmount] = useState('');
    const [termYears, setTermYears] = useState('');
    const [annualInterest, setAnnualInterest] = useState('');
    const [seguroDegrabacion, setSeguroDegrabacion] = useState('');
    const [seguroIncendio, setSeguroIncendio] = useState('');
    const [comision, setComision] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResult(null);

        try {
            const response = await clientService.totalCost({
                amount,
                termYears,
                annualInterest,
                seguroDegrabacion,
                seguroIncendio,
                comision,
            });

            setResult(response.data);
        } catch (err) {
            setError('Error al calcular el costo total. Verifica los datos ingresados.');
        }
    };

    const handleNavigate = () => {
        navigate('/home/Client'); // Cambia '/ruta-deseada' a la ruta a la que quieres navegar
    };

    return (
        <div className="container mt-5">
            <h2>Calculadora de costos de tu prestamo</h2>
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
                        step="0.01"
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
                        step="0.01"
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
                        step="0.01"
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

            {/* Botón para navegar a otra ruta */}
            <button className="btn btn-secondary mt-3" onClick={handleNavigate}>
                Ir a otra ruta
            </button>
        </div>
    );
};

export default TotalCostSimulator;
