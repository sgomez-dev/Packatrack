// src/Router/RutaProtegida.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export const RutaProtegida = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Si no hay usuario, redirigir al inicio de sesión
    return <Navigate to="/inicio-sesion" />;
  }

  // Si hay usuario autenticado, mostrar el contenido de la ruta
  return children;
};

