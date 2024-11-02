import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

export const HeaderNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="header-nav">
            <div className="logo">Control de Paquetes</div>
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <li><Link to="/" className="nav-button">Inicio</Link></li>
                <li><Link to="/registro-diario" className="nav-button">Registrar Entregas</Link></li>
                <li><Link to="/historial-registros" className="nav-button">Historial</Link></li>
                <li><Link to="/estadisticas" className="nav-button">Estadísticas</Link></li>
                <li><Link to="/perfil" className="nav-button">Perfil</Link></li>
            </ul>
        </nav>
    );
};

