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
import CircularProgress from "@mui/material/CircularProgress"; // Spinner
import Alert from '@mui/material/Alert'; // Para mostrar alertas

const HomeEjecutivo = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [error, setError] = useState(null); // Para manejar errores

  // Función para obtener todas las solicitudes desde el backend
  const fetchAllRequests = async () => {
    try {
      const response = await requestService.getAllRequests();
      setRequests(response.data);
    } catch (error) {
      console.error('Error al obtener las solicitudes', error);
      setError('Hubo un problema al cargar las solicitudes. Intenta nuevamente más tarde.');
    } finally {
      setLoading(false); // Termina la carga
    }
  };

  useEffect(() => {
    fetchAllRequests(); // Obtener todas las solicitudes cuando el componente se monta
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

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Todas las Solicitudes</h2>

      {/* Mostrar un cargador mientras se obtienen las solicitudes */}
      {loading && (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      )}

      {/* Mostrar un mensaje de error si hay un problema en la carga */}
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Mostrar la tabla solo si los datos se han cargado correctamente */}
      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Id</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>ClientId</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>Stage</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>Amount</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>Year Term</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Operaciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="left">{request.id}</TableCell>
                  <TableCell align="left">{request.clientId}</TableCell>
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
      )}
    </div>
  );
};

export default HomeEjecutivo;
