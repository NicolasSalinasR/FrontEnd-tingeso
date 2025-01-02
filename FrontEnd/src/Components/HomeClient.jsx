import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';

function HomeClient() {
  const navigate = useNavigate();

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
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate('/client/add')} className="text-primary">
                Crear Cuenta
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/client/Histori/add')} className="text-primary">
                Depositar/Retirar
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/client/TotalCost')} className="text-primary">
                Costo Total Préstamo
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/client/simulate')} className="text-primary">
                Simular Crédito
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/client/Request')} className="text-primary">
                Solicitar Préstamo
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/client/Follow')} className="text-primary">
                Seguimiento Solicitud
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/home/Ejecutivo')} className="text-primary">
                ¿Eres un ejecutivo? Presiona aquí
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenido principal */}
      <div className="container text-center mt-5 content">
        <h1 className="display-4 text-primary">Bienvenido a la sección de Cliente</h1>
        <p className="lead text-secondary">Aquí tiene un menú para elegir las opciones que disponemos.</p>
      </div>

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
    </div>
  );
}

export default HomeClient;
