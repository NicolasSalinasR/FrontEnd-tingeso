import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import clientService from "../Service/Client.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

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
  const [notification, setNotification] = useState({ open: false, message: "" });
  const navigate = useNavigate();

  const handleCloseNotification = () => setNotification({ open: false, message: "" });

  const validateFields = () => {
    if (!rut || !email || !password || !firstName || !lastname) {
      return "Por favor, completa todos los campos obligatorios.";
    }
    if (age <= 0) return "La edad debe ser mayor a cero.";
    if (salary <= 0) return "El salario debe ser mayor a cero.";
    if (jobTenure <= 0) return "La antigüedad laboral debe ser mayor a cero.";
    return null; // Todo está correcto
  };

  const saveClient = (e) => {
    e.preventDefault();
    const error = validateFields();

    if (error) {
      setNotification({ open: true, message: error });
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
      .then((response) => {
        console.log("Cliente creado", response.data);
        navigate("/home/Client");
      })
      .catch((error) => console.log("Error al crear cliente", error));
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
    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
      <Paper elevation={3} sx={{ width: 600, padding: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          {titleForm}
        </Typography>
        <form onSubmit={saveClient}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField label="Rut" value={rut} variant="outlined" onChange={(e) => setRut(e.target.value)} helperText="Ej. 12.587.698-8" />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField label="Email" value={email} variant="outlined" onChange={(e) => setEmail(e.target.value)} />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField label="Contraseña" type="password" value={password} variant="outlined" onChange={(e) => setPassword(e.target.value)} />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField label="Nombre" value={firstName} variant="outlined" onChange={(e) => setFirstName(e.target.value)} />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField label="Apellido" value={lastname} variant="outlined" onChange={(e) => setLastName(e.target.value)} />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Edad"
              type="number"
              value={age}
              variant="outlined"
              onChange={(e) => setAge(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Salario"
              type="number"
              value={salary}
              variant="outlined"
              onChange={(e) => setSalary(e.target.value)}
              helperText="Salario mensual en pesos"
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Antigüedad laboral"
              type="number"
              value={jobTenure}
              variant="outlined"
              onChange={(e) => setJobTenure(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              label="¿Está en Dicom?"
              select
              variant="outlined"
              value={dicom ? "Sí" : "No"}
              onChange={(e) => setDicom(e.target.value === "Sí")}
            >
              <MenuItem value={"Sí"}>Sí</MenuItem>
              <MenuItem value={"No"}>No</MenuItem>
            </TextField>
          </FormControl>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />}>
              Grabar
            </Button>
            <Link to="/home/Client" style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="secondary">
                Volver a la lista
              </Button>
            </Link>
          </Box>
        </form>

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleCloseNotification} severity="error" sx={{ width: "100%" }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default AddEditClient;
