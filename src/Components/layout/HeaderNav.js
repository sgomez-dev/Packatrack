import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
        <header className="header">
            <div className="logo">Control de Paquetes</div>
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>
            <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li><NavLink to="/" className="nav-button" onClick={handelLinkClick}>Inicio</NavLink></li>
                    <li><NavLink to="/registro-diario" className="nav-button" onClick={handelLinkClick}>Registrar Entregas</NavLink></li>
                    <li><NavLink to="/historial-registros" className="nav-button" onClick={handelLinkClick}>Historial</NavLink></li>
                    <li><NavLink to="/estadisticas" className="nav-button" onClick={handelLinkClick}>Estadísticas</NavLink></li>
                    <li><NavLink to="/perfil" className="nav-button" onClick={handelLinkClick}>Perfil</NavLink></li>
                </ul>
            </nav>
        </header>
    );
};

