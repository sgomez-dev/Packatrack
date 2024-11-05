import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export const RegistroUsuario = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Usuario registrado con éxito');
      navigate('/home'); // Redirige al home después de registrarse
    } catch (error) {
      setError("Este usuario ya existe");
    }
  };

  return (
    <div className="auth-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleRegister} className="auth-form">
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
        <button type="submit">Registrar</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>¿Ya tienes una cuenta?</p>
      <Link to="/inicio-sesion">
        <button className="link-button">Inicia Sesión</button>
      </Link>
    </div>
  );
};

