// src/Router/MyRoutes.js
import React from 'react';
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { Home } from "../Components/Home";
import { HeaderNav } from "../Components/layout/HeaderNav";
import { Footer } from "../Components/layout/Footer";
import { RegistroDiario } from '../Components/RegistroDiario';
import { HistorialRegistros } from '../Components/HistorialRegistros';
import { Estadisticas } from '../Components/Estadisticas';
import { Profile } from '../Components/Profile';
import { RegistroUsuario } from '../Components/RegistroUsuario';
import { InicioSesion } from '../Components/InicioSesion';
import { RutaProtegida } from './RutaProtegida';

export const MyRoutes = () => {
  return (
    <HashRouter>
      <HeaderNav />
      <section className="content">
        <Routes>
          {/* Rutas de autenticación (públicas) */}
          <Route path="/registro" element={<RegistroUsuario />} />
          <Route path="/inicio-sesion" element={<InicioSesion />} />

          {/* Rutas protegidas */}
          <Route
            path="/"
            element={<RutaProtegida><Home /></RutaProtegida>}
          />
          <Route
            path="/home"
            element={<RutaProtegida><Home /></RutaProtegida>}
          />
          <Route
            path="/registro-diario"
            element={<RutaProtegida><RegistroDiario /></RutaProtegida>}
          />
          <Route
            path="/historial-registros"
            element={<RutaProtegida><HistorialRegistros /></RutaProtegida>}
          />
          <Route
            path="/estadisticas"
            element={<RutaProtegida><Estadisticas /></RutaProtegida>}
          />
          <Route
            path="/perfil"
            element={<RutaProtegida><Profile /></RutaProtegida>}
          />

          {/* Redirige la raíz a /home y protegerla */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Ruta para manejar errores 404 */}
          <Route
            path="*"
            element={
              <div className="page">
                <h1 className="heading">Error 404</h1>
                <p className="paragraph">La página que estás buscando no existe</p>
              </div>
            }
          />
        </Routes>
      </section>
      <Footer />
    </HashRouter>
  );
};