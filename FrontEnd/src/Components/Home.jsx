import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Barra de navegación */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Presta Facil</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/">Inicio</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container text-center mt-5">
        <h1 className="display-4 text-primary">Bienvenido a Presta Facil, Su banco de confianza</h1>
        <p className="lead text-secondary">Seleccione una opción para continuar:</p>
        
        {/* Botones de navegación */}
        <div className="d-grid gap-2 col-6 mx-auto mt-4">
          <button 
            className="btn btn-info btn-lg" 
            onClick={() => navigate('/home/Client')}
          >
            Soy Cliente
          </button>

          <button 
            className="btn btn-warning btn-lg" 
            onClick={() => navigate('/home/Ejecutivo')}
          >
            Soy Ejecutivo
          </button>
        </div>
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
          .lead {
            font-size: 1.25rem;
            color: #6c757d;
          }
          .btn-info {
            background-color: #00bcd4;
            border: none;
          }
          .btn-warning {
            background-color: #f39c12;
            border: none;
          }
          .btn-lg {
            font-size: 1.2rem;
            padding: 15px;
          }
        `}
      </style>
    </div>
  );
}

export default Home;
