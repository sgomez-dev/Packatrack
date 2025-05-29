import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const user = auth.currentUser;
  const [nuevoPassword, setNuevoPassword] = useState('');
  const [passwordActual, setPasswordActual] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleReauthenticateAndChangePassword = async () => {
    if (nuevoPassword.length < 6) {
      setMensaje('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      // Reautenticar al usuario con el correo y contraseña actual
      const credential = EmailAuthProvider.credential(user.email, passwordActual);
      await reauthenticateWithCredential(user, credential);

      // Una vez reautenticado, actualizar la contraseña
      await updatePassword(user, nuevoPassword);
      setMensaje('Contraseña actualizada exitosamente.');
      setNuevoPassword('');
      setPasswordActual('');
    } catch (error) {
      setMensaje(`Error: ${error.message}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/inicio-sesion'); // Redirige al usuario a la página de inicio de sesión
    } catch (error) {
      setMensaje(`Error al cerrar sesión: ${error.message}`);
    }
  };

  return (
    <div className="profile-container">
      <h2>Perfil de Usuario</h2>
      <div className="profile-info">
        <p><strong>Correo Electrónico:</strong> {user.email}</p>
      </div>

      <div className="password-change">
        <h3>Cambiar Contraseña</h3>
        <input
          type="password"
          placeholder="Contraseña Actual"
          value={passwordActual}
          onChange={(e) => setPasswordActual(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nueva Contraseña"
          value={nuevoPassword}
          onChange={(e) => setNuevoPassword(e.target.value)}
        />
        <button onClick={handleReauthenticateAndChangePassword}>Actualizar Contraseña</button>
        {mensaje && <p className="message">{mensaje}</p>}
      </div>

      <div className="logout-section">
        <button onClick={handleSignOut} className="logout-button">Cerrar Sesión</button>
      </div>
    </div>
  );
};
