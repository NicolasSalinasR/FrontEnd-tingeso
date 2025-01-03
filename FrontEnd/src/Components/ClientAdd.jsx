import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import clientService from "../Service/Client.service"; // Asegúrate de tener este servicio
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";

const AddEditClient = () => {
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [jobTenure, setJobTenure] = useState("");
  const [dicom, setDicom] = useState(false);
  const { id } = useParams();
  const [titleForm, setTitleForm] = useState("");
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  const handleCloseNotification = () => setNotification({ open: false, message: "", severity: "success" });

  const validateFields = () => {
    if (!rut || !email || !password || !firstName || !lastname) {
      return "Por favor, completa todos los campos obligatorios.";
    }
    if (age <= 0) return "La edad debe ser mayor a cero.";
    if (salary <= 0) return "El salario debe ser mayor a cero.";
    if (jobTenure <= 0) return "La antigüedad laboral debe ser mayor a cero.";
    if (rut <= 0) return "El rut debe ser un valor mayor a cero.";
    return null; // Todo está correcto
  };

  const saveClient = (e) => {
    e.preventDefault();
    const error = validateFields();

    if (error) {
      setNotification({ open: true, message: error, severity: "error" });
      return;
    }

    const client = {
      rut,
      email,
      password,
      firstName,
      lastname,
      age: Number(age),
      salary: Number(salary),
      jobTenure: Number(jobTenure),
      dicom,
    };

    clientService
      .create(client)
      .then(() => {
        setNotification({ open: true, message: "Cuenta creada exitosamente.", severity: "success" });
        setTimeout(() => navigate("/home/Client"), 2000); // Redirigir después de 2 segundos
      })
      .catch((error) => {
        setNotification({ open: true, message: "Error al crear la cuenta.", severity: "error" });
        console.error("Error al crear cliente", error);
      });
  };

  useEffect(() => {
    if (id) {
      setTitleForm("Editar Cliente");
      clientService
        .get(id)
        .then((response) => {
          const client = response.data;
          setRut(client.rut);
          setEmail(client.email);
          setPassword(client.password);
          setFirstName(client.firstName);
          setLastName(client.lastname);
          setAge(client.age);
          setSalary(client.salary);
          setJobTenure(client.jobTenure);
          setDicom(client.dicom);
        })
        .catch((error) => console.log("Error al obtener datos del cliente", error));
    } else {
      setTitleForm("Nuevo Cliente");
    }
  }, [id]);

  return (
    <>
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
        </Container>
      </Navbar>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        component="form"
        onSubmit={saveClient}
        mt={8}
      >
        <h3>{titleForm}</h3>
        <hr />
        <FormControl fullWidth>
          <TextField label="Rut" type="number" value={rut} variant="standard" onChange={(e) => setRut(e.target.value)} helperText="Ej. 12587698" />
        </FormControl>

        <FormControl fullWidth>
          <TextField label="Email" value={email} variant="standard" onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl fullWidth>
          <TextField label="Contraseña" type="password" value={password} variant="standard" onChange={(e) => setPassword(e.target.value)} />
        </FormControl>

        <FormControl fullWidth>
          <TextField label="Nombre" value={firstName} variant="standard" onChange={(e) => setFirstName(e.target.value)} />
        </FormControl>

        <FormControl fullWidth>
          <TextField label="Apellido" value={lastname} variant="standard" onChange={(e) => setLastName(e.target.value)} />
        </FormControl>

        <FormControl fullWidth>
          <TextField label="Edad" type="number" value={age} variant="standard" onChange={(e) => setAge(e.target.value)} />
        </FormControl>

        <FormControl fullWidth>
          <TextField label="Salario" type="number" value={salary} variant="standard" onChange={(e) => setSalary(e.target.value)} helperText="Salario mensual en pesos" />
        </FormControl>

        <FormControl fullWidth>
          <TextField label="Antigüedad laboral" type="number" value={jobTenure} variant="standard" onChange={(e) => setJobTenure(e.target.value)} />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="¿Está en Dicom?"
            select
            variant="standard"
            value={dicom ? "Sí" : "No"}
            onChange={(e) => setDicom(e.target.value === "Sí")}
          >
            <MenuItem value={"Sí"}>Sí</MenuItem>
            <MenuItem value={"No"}>No</MenuItem>
          </TextField>
        </FormControl>

        <FormControl>
          <Button type="submit" variant="contained" color="info" startIcon={<SaveIcon />}>
            Grabar
          </Button>
        </FormControl>
        <hr />
        <Link to="/home/Client">Volver a la lista</Link>

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: "100%" }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default AddEditClient;
