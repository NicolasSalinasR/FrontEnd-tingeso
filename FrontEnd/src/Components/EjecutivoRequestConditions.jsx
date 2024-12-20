import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import clientService from '../Service/Client.service';

const EjecutivoRequestConditions = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Obtener los valores desde el state pasado en la navegación
  const { clientId, amount, yearTerm } = location.state || {};

  // Estado para los otros parámetros
  const [formData, setFormData] = useState({
    type: '',
    loan: '',
    debt: '',
    older: '',
    termYears: '',
    annualInterest: ''
  });

  // Estado para almacenar el resultado de la solicitud
  const [result, setResult] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los valores sean numéricos y mayores a cero
    if (!Number.isInteger(Number(formData.loan)) || Number(formData.loan) <= 0) {
      setMessage('El monto del préstamo debe ser un número entero mayor a 0.');
      return;
    }

    if (!Number.isInteger(Number(formData.debt)) || Number(formData.debt) <= 0) {
      setMessage('La deuda total debe ser un número entero mayor a 0.');
      return;
    }

    if (!Number.isInteger(Number(formData.older)) || Number(formData.older) <= 0) {
      setMessage('Los años de antigüedad deben ser un número entero mayor a 0.');
      return;
    }

    if (!Number.isInteger(Number(formData.termYears)) || Number(formData.termYears) <= 0) {
      setMessage('La duración del préstamo debe ser un número entero mayor a 0.');
      return;
    }

    if (isNaN(Number(formData.annualInterest)) || Number(formData.annualInterest) <= 0) {
      setMessage('El interés anual debe ser un número decimal mayor a 0.');
      return;
    }

    const body = {
      clientId: clientId.toString(),
      amount: amount.toString(),
      termYears: formData.termYears.toString(),
      annualInterest: formData.annualInterest.toString(),
      ...formData
    };

    try {
      // Llamamos al servicio que realiza el POST a la ruta "/P4"
      const response = await clientService.P4(body);
      console.log('Resultado de la solicitud:', response.data);

      // Guardar el resultado en el estado
      setResult(response.data);

    } catch (error) {
      console.error('Error al comprobar las condiciones:', error);
      setMessage('Hubo un error al comprobar las condiciones. Intente nuevamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Comprobar Condiciones para la Solicitud (ClientId: {clientId})</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Tipo de préstamo</label>
              <select 
                name="type" 
                className="form-control" 
                value={formData.type} 
                onChange={handleChange} 
                required
              >
                <option value="">Seleccione un tipo</option>
                <option value="1">Primera Vivienda</option>
                <option value="2">Segunda Vivienda</option>
                <option value="3">Propiedades Comerciales</option>
                <option value="4">Remodelación</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Costo de la vivienda (o monto del préstamo)</label>
              <input 
                type="number" 
                name="loan" 
                className="form-control" 
                value={formData.loan} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Deuda total del cliente</label>
              <input 
                type="number" 
                name="debt" 
                className="form-control" 
                value={formData.debt} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Años de antigüedad del cliente en el banco</label>
              <input 
                type="number" 
                name="older" 
                className="form-control" 
                value={formData.older} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Duración del préstamo (en años)</label>
              <input 
                type="number" 
                name="termYears" 
                className="form-control" 
                value={formData.termYears} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Interés anual del préstamo (%)</label>
              <input 
                type="number" 
                step="0.01" 
                name="annualInterest" 
                className="form-control" 
                value={formData.annualInterest} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Cantidad del préstamo (Auto)</label>
          <input 
            type="number" 
            name="amount" 
            className="form-control" 
            value={amount} 
            readOnly 
          />
        </div>

        <div className="form-group">
          <label>Número de años del préstamo (Auto)</label>
          <input 
            type="number" 
            name="yearTerm" 
            className="form-control" 
            value={yearTerm} 
            readOnly 
          />
        </div>

        <button type="submit" className="btn btn-success btn-block mt-4">Comprobar Condiciones</button>
      </form>

      {/* Mostrar mensaje de error si hay alguno */}
      {message && <div className="alert alert-danger mt-3">{message}</div>}

      {/* Mostrar tabla solo si hay un resultado */}
      {result.length > 0 && (
        <div className="mt-5">
          <h3 className="text-center mb-4">Resultados de la Comprobación</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>R1</th>
                <th>R2</th>
                <th>R3</th>
                <th>R4</th>
                <th>R5</th>
                <th>R6</th>
                <th>R7</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {result.map((item, index) => (
                  <td key={index}>{item.toString()}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EjecutivoRequestConditions;
