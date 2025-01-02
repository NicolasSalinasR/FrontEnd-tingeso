import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HistoryService from "../Service/History.Service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import { Navbar, Container, Dropdown } from "react-bootstrap"; // Importar los componentes de React Bootstrap

const HistoryAddClient = () => {
  const [clientid, setClientid] = useState("");
  const [change, setChange] = useState("");
  const navigate = useNavigate();

  const saveHistoryCount = (e) => {
    e.preventDefault();

    // Validar que los campos estén completos
    if (!clientid || !change) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Validar que change sea un número entero
    if (!Number.isInteger(Number(change))) {
      alert("Change debe ser un número entero.");
      return;
    }

    const data = {
      clientid: clientid, // Asegurarse de enviar el clientid también
      change: Number(change), // Convertir a número
    };

    HistoryService.addHistoryCount(data)
      .then((response) => {
        console.log("History count entry added", response.data);
        alert("Entrada de historial agregada con éxito");
        navigate("/home/Client");
      })
      .catch((error) => {
        console.log("Error al agregar entrada de historial", error);
        alert("Hubo un error al agregar la entrada de historial.");
      });
  };

  return (
    <div>
      {/* Barra de navegación */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic" className="burger-menu">
              <span className="navbar-toggler-icon"></span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate('/client/add')}>Crear Cuenta</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate('/client/Histori/add')}>Depositar/Retirar</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate('/client/TotalCost')}>Costo Total Préstamo</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate('/client/simulate')}>Simular Crédito</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate('/client/Request')}>Solicitar Préstamo</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate('/client/Follow')}>Seguimiento Solicitud</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate('/home/Ejecutivo')}>¿Eres un ejecutivo? Presiona aquí</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Navbar.Brand href="#home">Cliente - PrestaFacil</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>

      {/* Estilos adicionales */}
      <style>
        {`
          .navbar {
            border-bottom: 3px solid #00bcd4;
          }
          .burger-menu {
            margin-right: 15px;
          }
          .display-4 {
            font-family: 'Roboto', sans-serif;
            font-weight: bold;
          }
          .navbar .nav-link {
            font-size: 1.1rem;
            font-weight: 600;
            transition: background-color 0.3s ease;
          }
          .navbar .nav-link:hover {
            background-color: rgba(0, 123, 255, 0.1);
            border-radius: 5px;
          }
          .content {
            margin-top: 80px; /* Ajuste para que no se superponga con la barra fija */
          }
        `}
      </style>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        component="form"
        onSubmit={saveHistoryCount}
      >
        <h3>Nueva entrada de historial</h3>
        <FormControl fullWidth>
          <TextField
            label="Rut"
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
    </div>
  );
};

export default HistoryAddClient;
