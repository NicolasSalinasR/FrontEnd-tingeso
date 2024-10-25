import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import clientService from "../Service/Client.service"; // Asegúrate de tener este servicio
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from '@mui/material/MenuItem';

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
  const navigate = useNavigate();

  const saveClient = (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!rut || !email || !password || !firstName || !lastname) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Convertir a número o establecer un valor predeterminado si está vacío
    const client = { 
      rut, 
      email, 
      password, 
      firstName, 
      lastname, 
      age: age ? Number(age) : 0, // Asignar 0 si está vacío
      salary: salary ? Number(salary) : 0, // Asignar 0 si está vacío
      jobTenure: jobTenure ? Number(jobTenure) : 0, // Asignar 0 si está vacío
      dicom 
    };

    // Crear nuevo cliente
    clientService.create(client)
      .then((response) => {
        console.log("Cliente creado", response.data);
        navigate("/home/Client");
      })
      .catch((error) => console.log("Error al crear cliente", error));
  };

  useEffect(() => {
    if (id) {
      setTitleForm("Editar Cliente");
      clientService.get(id)
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
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" component="form" onSubmit={saveClient}>
      <h3>{titleForm}</h3>
      <hr />
      <FormControl fullWidth>
        <TextField label="Rut" value={rut} variant="standard" onChange={(e) => setRut(e.target.value)} helperText="Ej. 12.587.698-8" />
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
    </Box>
  );
};

export default AddEditClient;
