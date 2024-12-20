import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HistoryService from "../Service/History.Service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const HistoryAddClient = () => {
  const [clientid, setClientid] = useState("");
  const [change, setChange] = useState("");
  const [notification, setNotification] = useState({ open: false, message: "", severity: "info" });
  const navigate = useNavigate();

  const saveHistoryCount = (e) => {
    e.preventDefault();

    // Validar que los campos estén completos
    if (!clientid || !change) {
      setNotification({ open: true, message: "Por favor, completa todos los campos obligatorios.", severity: "warning" });
      return;
    }

    // Validar que clientid sea un número entero mayor a 0
    if (!Number.isInteger(Number(clientid)) || Number(clientid) <= 0) {
      setNotification({ open: true, message: "Client ID debe ser un número entero mayor a 0.", severity: "error" });
      return;
    }

    // Validar que change sea un número entero
    if (!Number.isInteger(Number(change))) {
      setNotification({ open: true, message: "Change debe ser un número entero.", severity: "error" });
      return;
    }

    const data = {
      clientid: Number(clientid), // Convertir a número
      change: Number(change), // Convertir a número
    };

    HistoryService.addHistoryCount(data)
      .then((response) => {
        console.log("History count entry added", response.data);
        setNotification({ open: true, message: "Entrada de historial agregada con éxito.", severity: "success" });
        setTimeout(() => navigate("/home/Client"), 2000); // Navegar después de 2 segundos
      })
      .catch((error) => {
        console.error("Error al agregar entrada de historial", error);
        setNotification({ open: true, message: "Error al agregar entrada de historial. Intente nuevamente.", severity: "error" });
      });
  };

  const handleCloseNotification = () => setNotification({ open: false, message: "", severity: "info" });

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={4}
    >
      <Paper elevation={3} style={{ padding: "24px", width: "400px" }}>
        <Typography variant="h5" component="h3" align="center" gutterBottom>
          Nueva entrada de historial
        </Typography>
        <Box
          component="form"
          onSubmit={saveHistoryCount}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Client ID"
            value={clientid}
            variant="outlined"
            onChange={(e) => setClientid(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Change"
            type="number"
            value={change}
            variant="outlined"
            onChange={(e) => setChange(e.target.value)}
            required
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            fullWidth
          >
            Grabar
          </Button>
        </Box>
        <Box mt={2} textAlign="center">
          <Link to="/home/Client" style={{ textDecoration: "none", color: "#1976d2" }}>
            Volver a la lista
          </Link>
        </Box>
      </Paper>

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

export default HistoryAddClient;
