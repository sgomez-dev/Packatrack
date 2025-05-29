import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export const InicioSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Sesión iniciada con éxito');
      navigate('/home'); // Redirige al home después de iniciar sesión
    } catch (error) {
      setError("Usuario no registrado o credenciales incorrectas");
    }
  };

  return (
    <div className="auth-container">
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>¿No tienes una cuenta?</p>
      <Link to="/registro">
        <button className="link-button">Regístrate</button>
      </Link>
    </div>
  );
};
