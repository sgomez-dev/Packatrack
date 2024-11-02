import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../packatrack.png';
import '../index.css'; 

export const Home = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="home-container">
            <img src={logo} alt="Logo" className="home-logo" />
            <h1>Bienvenido al Control de Paquetes</h1>
            <p>Selecciona lo que deseas hacer:</p>
            <div className="home-buttons">
                <button onClick={() => handleNavigation('/registro-diario')} className="home-button">Registrar Entregas</button>
                <button onClick={() => handleNavigation('/historial-registros')} className="home-button">Ver Historial de Registros</button>
                <button onClick={() => handleNavigation('/estadisticas')} className="home-button">Ver Estadísticas</button>
            </div>
        </div>
    );
};

