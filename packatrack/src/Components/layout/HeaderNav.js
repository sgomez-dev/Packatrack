import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

export const HeaderNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handelLinkClick = () => {
      setIsMenuOpen(false);
    }

    return (
        <nav className="header-nav">
            <div className="logo">Control de Paquetes</div>
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <li><Link to="/" className="nav-button" onClick={handelLinkClick}>Inicio</Link></li>
                <li><Link to="/registro-diario" className="nav-button" onClick={handelLinkClick}>Registrar Entregas</Link></li>
                <li><Link to="/historial-registros" className="nav-button" onClick={handelLinkClick}>Historial</Link></li>
                <li><Link to="/estadisticas" className="nav-button" onClick={handelLinkClick}>Estadísticas</Link></li>
                <li><Link to="/perfil" className="nav-button" onClick={handelLinkClick}>Perfil</Link></li>
            </ul>
        </nav>
    );
};

