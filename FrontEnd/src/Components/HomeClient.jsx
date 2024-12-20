import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Navbar, Nav, Container } from 'react-bootstrap'; 

function HomeClient() {
  const navigate = useNavigate(); 

  return (
    <div>
      {/* Barra de navegación */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Cliente - PrestaFacil</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link 
                onClick={() => navigate('/client/add')} 
                className="text-primary">
                Crear Cuenta
              </Nav.Link>
              <Nav.Link 
                onClick={() => navigate('/client/Histori/add')} 
                className="text-primary">
                Depositar/Retirar
              </Nav.Link>
              <Nav.Link 
                onClick={() => navigate('/client/TotalCost')} 
                className="text-primary">
                Costo Total Préstamo
              </Nav.Link>
              <Nav.Link 
                onClick={() => navigate('/client/simulate')} 
                className="text-primary">
                Simular Crédito
              </Nav.Link>
              <Nav.Link 
                onClick={() => navigate('/client/Request')} 
                className="text-primary">
                Solicitar Préstamo
              </Nav.Link>
              <Nav.Link 
                onClick={() => navigate('/client/Follow')} 
                className="text-primary">
                Seguimiento Solicitud
              </Nav.Link>
              <Nav.Link 
                onClick={() => navigate('/home/Ejecutivo')} 
                className="text-primary">
                ¿Eres un ejecutivo? Presiona aquí
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenido principal */}
      <div className="container text-center mt-5">
        <h1 className="display-4 text-primary">Bienvenido a la sección de Cliente</h1>
        <p className="lead text-secondary">Aquí tiene un menú para elegir las opciones que disponemos.</p>
      </div>

      {/* Estilos adicionales */}
      <style>
        {`
          .navbar {
            border-bottom: 3px solid #00bcd4;
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
        `}
      </style>
    </div>
  );
}

export default HomeClient;
