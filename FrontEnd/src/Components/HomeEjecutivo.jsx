import React, { useState, useEffect } from 'react';
import requestService from '../Service/Request.service';
import { useNavigate } from 'react-router-dom';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const HomeEjecutivo = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  // Función para obtener todas las solicitudes desde el backend
  const fetchAllRequests = async () => {
    try {
      const response = await requestService.getAllRequests();
      setRequests(response.data);
    } catch (error) {
      console.error('Error al obtener las solicitudes', error);
      setRequests([]);
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const handleUpdateRequest = (request) => {
    navigate('/Ejecutivo/Request/Update', { 
      state: { 
        id: request.id, 
        clientId: request.clientId, 
        stage: request.stage 
      } 
    });
  };
  
  const handleCheckConditions = (request) => {
    navigate('/Ejecutivo/Request/Conditions', { 
      state: { 
        clientId: request.clientId, 
        amount: request.amount, 
        yearTerm: request.yearTerm 
      } 
    });
  };

  const handleBackToMenu = () => {
    navigate('/home'); // Cambia '/home' por la ruta del menú anterior
  };

  return (
    <div className="container mt-5">
      <TableContainer component={Paper} className="d-flex justify-content-center">
        <h2 className="text-center mb-4">Todas las Solicitudes</h2>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Id</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Rut</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Stage</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Year Term</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Operaciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow
                key={request.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{request.id}</TableCell>
                <TableCell align="left">{request.rut}</TableCell>
                <TableCell align="right">{request.stage}</TableCell>
                <TableCell align="right">{request.amount}</TableCell>
                <TableCell align="right">{request.yearTerm}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={() => handleUpdateRequest(request)}
                    style={{ marginLeft: "0.5rem" }}
                    startIcon={<EditIcon />}
                  >
                    Actualizar
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleCheckConditions(request)}
                    style={{ marginLeft: "0.5rem" }}
                    startIcon={<CheckIcon />}
                  >
                    Comprobar Condiciones
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Botón debajo de la tabla */}
      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackToMenu}
          startIcon={<ArrowBackIcon />}
        >
          Volver al Menú
        </Button>
      </div>
    </div>
  );
};

export default HomeEjecutivo;
