import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap
import { Navbar, Nav, Container } from 'react-bootstrap'; // Importa los componentes de Bootstrap

function HomeClient() {
  const navigate = useNavigate(); // Define navigate aquí

  return (
    <div>
      <div className="container text-center mt-5">
        <h1>Bienvenido, a la seccion de cliente del banco PrestaFacil</h1>
        <p>aqui tiene un menu para elegir las opciones que disponemos</p>
      </div>

      {/* Barra de navegación */}
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Cliente</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate('/client/add')}>Crear Cuenta</Nav.Link>
              <Nav.Link onClick={() => navigate('/client/Histori/add')}>Depositar/Retirar</Nav.Link>
              <Nav.Link onClick={() => navigate('/client/TotalCost')}>Costo Total Préstamo</Nav.Link>
              <Nav.Link onClick={() => navigate('/client/simulate')}>Simular Crédito</Nav.Link>
              <Nav.Link onClick={() => navigate('/client/Request')}>Solicitar Préstamo</Nav.Link>
              <Nav.Link onClick={() => navigate('/client/Follow')}>Seguimiento Solicitud</Nav.Link>
              <Nav.Link onClick={() => navigate('/home/Ejecutivo')}>¿Eres un ejecutivo?, presiona aqui</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default HomeClient;
