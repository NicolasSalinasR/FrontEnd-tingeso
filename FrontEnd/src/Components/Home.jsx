import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 


function Home() {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1>Bienvenido a Presta Facil, Su banco de confianza, HOLA POFESOR ALCIDEZ</h1>
      <p>Seleccione una opción:</p>
      <div className="d-grid gap-2 col-6 mx-auto mt-4">
        
        <button 
          className="btn btn-primary btn-lg" 
          onClick={() => navigate('/home/Client')}
        >
          Soy Cliente
        </button>

        
        <button 
          className="btn btn-secondary btn-lg" 
          onClick={() => navigate('/home/Ejecutivo')}
        >
          Soy Ejecutivo
        </button>

      </div>
    </div>
  );
}

export default Home;
