import React from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

export const HeaderNav = () => {
    return (
        <nav className="header-nav">
            <div className="logo">Control de Paquetes</div>
            <ul className="nav-links">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/registro-diario">Registrar Entregas</Link></li>
                <li><Link to="/historial-registros">Historial de Registros</Link></li>
                <li><Link to="/estadisticas">Estadísticas</Link></li>
                <li><Link to="/perfil">Perfil de Usuario</Link></li> {/* Opcional */}
            </ul>
        </nav>
    );
};