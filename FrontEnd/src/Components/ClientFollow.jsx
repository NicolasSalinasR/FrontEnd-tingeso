import React, { useState } from "react";
import requestService from "../Service/Request.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const RequestTable = () => {
  const [clientId, setClientId] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "info" });

  const handleSearch = async () => {
    if (!clientId.trim()) {
      setNotification({ open: true, message: "Por favor, ingresa un ClientId válido.", severity: "warning" });
      return;
    }

    setLoading(true);
    try {
      const response = await requestService.getAllRequestByClientId({ ClientId: clientId });
      setRequests(response.data);
      if (response.data.length === 0) {
        setNotification({ open: true, message: "No se encontraron solicitudes para este cliente.", severity: "info" });
      }
    } catch (error) {
      console.error("Error al obtener las solicitudes", error);
      setRequests([]);
      setNotification({ open: true, message: "Error al obtener solicitudes. Intente nuevamente.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = () => setNotification({ open: false, message: "", severity: "info" });

  const getDescriptionForStage = (stage) => {
    switch (stage) {
      case 1: return "E1. En Revisión Inicial.";
      case 2: return "E2. Pendiente de Documentación";
      case 3: return "E3. En Evaluación";
      case 4: return "E4. Pre-Aprobada.";
      case 5: return "E5. En Aprobación Final.";
      case 6: return "E6. Aprobada.";
      case 7: return "E7. Rechazada.";
      case 8: return "E8. Cancelada por el Cliente.";
      case 9: return "E9. En Desembolso.";
      default: return "Estado desconocido.";
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Box mb={3} width="80%" style={{ backgroundColor: "#f9f9f9", padding: "16px", borderRadius: "8px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <TextField
          fullWidth
          label="ClientId"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          placeholder="Ingrese el ClientId del cliente"
          variant="outlined"
          autoFocus
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{ marginTop: "16px", width: "100%", height: "48px" }}
        >
          {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Buscar"}
        </Button>
      </Box>

      {requests.length > 0 && (
        <TableContainer component={Paper} style={{ width: "80%", marginTop: "24px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
          <Table>
            <TableHead style={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Id</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>ClientId</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Stage</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Descripción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id} style={{ backgroundColor: request.id % 2 === 0 ? "#f5f5f5" : "#ffffff" }}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.clientId}</TableCell>
                  <TableCell>{request.stage}</TableCell>
                  <TableCell>{getDescriptionForStage(request.stage)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RequestTable;
