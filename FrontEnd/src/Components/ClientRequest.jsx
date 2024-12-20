import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import requestService from "../Service/Request.service";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ClientRequest = () => {
    const [formData, setFormData] = useState({
        typeOfRequest: "",
        stage: "",
        Amount: "",
        termYears: "",
        clientId: "",
        pdfFile: null,
    });
    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            pdfFile: file,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!Number.isInteger(Number(formData.stage)) || Number(formData.stage) <= 0) {
            newErrors.stage = "La etapa debe ser un número entero mayor a cero.";
        }
        if (!Number.isInteger(Number(formData.Amount)) || Number(formData.Amount) <= 0) {
            newErrors.Amount = "El monto debe ser un número entero mayor a cero.";
        }
        if (!Number.isInteger(Number(formData.termYears)) || Number(formData.termYears) <= 0) {
            newErrors.termYears = "Los años del plazo deben ser un número entero mayor a cero.";
        }
        if (!Number.isInteger(Number(formData.clientId)) || Number(formData.clientId) <= 0) {
            newErrors.clientId = "El ID del cliente debe ser un número entero mayor a cero.";
        }
        if (!formData.pdfFile || formData.pdfFile.type !== "application/pdf") {
            newErrors.pdfFile = "Debes subir un archivo en formato PDF.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const data = new FormData();
        data.append("typeOfRequest", formData.typeOfRequest);
        data.append("stage", formData.stage);
        data.append("Amount", formData.Amount);
        data.append("termYears", formData.termYears);
        data.append("clientId", formData.clientId);
        data.append("pdfFile", formData.pdfFile);

        requestService.createRequest(data)
            .then((response) => {
                setSnackbar({ open: true, message: "Solicitud enviada exitosamente.", severity: "success" });
                setTimeout(() => navigate("/home/Client"), 2000);
            })
            .catch((error) => {
                setSnackbar({ open: true, message: "Ocurrió un error al enviar la solicitud.", severity: "error" });
                console.error("Error al crear la solicitud: ", error);
            });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={3}
            m={2}
            component="form"
            onSubmit={handleSubmit}
        >
            <Typography variant="h4" gutterBottom>
                Crear Nueva Solicitud
            </Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel id="typeOfRequest-label">Tipo de Solicitud</InputLabel>
                <Select
                    labelId="typeOfRequest-label"
                    id="typeOfRequest"
                    name="typeOfRequest"
                    value={formData.typeOfRequest}
                    onChange={handleInputChange}
                    required
                >
                    <MenuItem value="">Seleccione un tipo de solicitud</MenuItem>
                    <MenuItem value="Primera Vivienda">Primera Vivienda</MenuItem>
                    <MenuItem value="Segunda Vivienda">Segunda Vivienda</MenuItem>
                    <MenuItem value="Propiedades Comerciales">Propiedades Comerciales</MenuItem>
                    <MenuItem value="Remodelación">Remodelación</MenuItem>
                </Select>
            </FormControl>

            {['stage', 'Amount', 'termYears', 'clientId'].map((field) => (
                <FormControl fullWidth margin="normal" key={field}>
                    <TextField
                        label={
                            field === 'stage' ? 'Etapa' :
                                field === 'Amount' ? 'Monto' :
                                    field === 'termYears' ? 'Años del Plazo' : 'ID del Cliente'
                        }
                        type="number"
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        required
                        error={!!errors[field]}
                        helperText={errors[field]}
                    />
                </FormControl>
            ))}

            <FormControl fullWidth margin="normal">
                <TextField
                    label="Subir PDF"
                    type="file"
                    id="pdfFile"
                    name="pdfFile"
                    onChange={handleFileChange}
                    required
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.pdfFile}
                    helperText={errors.pdfFile}
                />
            </FormControl>

            <Box mt={3} display="flex" justifyContent="space-between" width="100%">
                <Button type="submit" variant="contained" color="primary">
                    Enviar Solicitud
                </Button>
                <Button
                    type="button"
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate('/home/Client')}
                >
                    Volver a Inicio
                </Button>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ClientRequest;
