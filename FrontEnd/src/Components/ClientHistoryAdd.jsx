import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HistoryService from "../Service/History.Service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";

const HistoryAddClient = () => {
  const [clientid, setClientid] = useState("");
  const [change, setChange] = useState("");
  const navigate = useNavigate();

  const saveHistoryCount = (e) => {
    e.preventDefault();

    if (!clientid || !change ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const data = {
      clientid: Number(clientid), // Asegúrate de que sea un número
      change: Number(change), // Asegúrate de que sea un número
    };

    HistoryService.addHistoryCount(data)
      .then((response) => {
        console.log("History count entry added", response.data);
        alert("Entrada de historial agregada con éxito");
        navigate("/home/Client");
      })
      .catch((error) => console.log("Error al agregar entrada de historial", error));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" component="form" onSubmit={saveHistoryCount}>
      <h3>Nueva entrada de historial</h3>
      <FormControl fullWidth>
        <TextField 
          label="Client ID" 
          value={clientid} 
          variant="standard" 
          onChange={(e) => setClientid(e.target.value)} 
          required 
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField 
          label="Change" 
          type="number" 
          value={change} 
          variant="standard" 
          onChange={(e) => setChange(e.target.value)} 
          required 
        />
      </FormControl>
      <br />
      <br />

      <FormControl>
        <Button type="submit" variant="contained" color="info" startIcon={<SaveIcon />}>
          Grabar
        </Button>
      </FormControl>
      <br />
      <br />

      <Link to="/home/Client">Volver a la lista</Link>
    </Box>
  );
};

export default HistoryAddClient;
