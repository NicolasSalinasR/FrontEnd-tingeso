import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import HomeClient from './Components/HomeClient';
import HomeEjecutivo from './Components/HomeEjecutivo';
import AddEditClient from './Components/ClientAdd';
import SimulateClient from './Components/ClientSimulate';
import HistoryAddClient from './Components/ClientHistoryAdd';
import ClientTotalCost from './Components/ClientTotalCost';
import ClientRequest from './Components/ClientRequest';
import ClientFollow from './Components/ClientFollow';
import EjecutivoRequestConditions from './Components/EjecutivoRequestConditions';
import EjecutivoRequestUpdate from './Components/EjecutivoRequestUpdate';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <div className="container">
      <Routes>
      <Route path="/" element={<Navigate to="/home" />} />  {/* Redirige a /home */}
        <Route path="/home" element={<Home/>} />
        <Route path="/home/Client" element={<HomeClient />} />
        <Route path="/home/Ejecutivo" element={<HomeEjecutivo />} />
        <Route path="/client/add" element={<AddEditClient />} />
        <Route path="/client/simulate" element={<SimulateClient />} />
        <Route path="/client/Histori/add" element={<HistoryAddClient />} />
        <Route path="/client/TotalCost" element={<ClientTotalCost />} />
        <Route path="/client/Request" element={<ClientRequest />} />
        <Route path="/client/Follow" element={<ClientFollow />} />
        <Route path="/Ejecutivo/Request/Conditions" element={< EjecutivoRequestConditions/>} />
        <Route path="/Ejecutivo/Request/Update" element={< EjecutivoRequestUpdate/>} />



    {/* 
    <Route path="/request/list" element={<RequestList />} />
   
   
    <Route path="/request/add" element={<AddEditRequest />} />
    <Route path="/employee/edit/:id" element={<AddEditEmployee />} />
    <Route path="*" element={<NotFound />} /> 
    */}
      </Routes> 
    </div>
</Router>
);
}
 
export default App
