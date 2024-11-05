import React, { useState } from 'react';
import { db, auth } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export const RegistroDiario = () => {
  const [cantidadPaquetes, setCantidadPaquetes] = useState(0);
  const [incidencias, setIncidencias] = useState(0);
  const [paquetesEntregados, setPaquetesEntregados] = useState(0);
  const [diaEntrega, setDiaEntrega] = useState('');
  const [error, setError] = useState('');

  // Calculo del dinero recaudado
  const dineroRecaudado = paquetesEntregados * 0.50;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Verificar que el usuario esté autenticado
    if (!auth.currentUser) {
      setError("Debes iniciar sesión para guardar un registro.");
      return;
    }

    // Crear el nuevo registro
    const nuevoRegistro = {
      diaEntrega,
      cantidadPaquetes,
      incidencias,
      paquetesEntregados,
      dineroRecaudado,
    };

    try {
      // Guardar el registro en la subcolección del usuario
      await addDoc(collection(db, `usuarios/${auth.currentUser.uid}/registros`), nuevoRegistro);
      alert('Registro guardado con éxito!');

      // Reiniciar los campos del formulario
      setCantidadPaquetes(0);
      setIncidencias(0);
      setPaquetesEntregados(0);
      setDiaEntrega('');
    } catch (error) {
      setError(`Error al guardar el registro: ${error.message}`);
    }
  };

  return (
    <div className="daily-register">
      <h2>Registro de Entregas</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <label>Día de Entrega:</label>
          <input
            type="date"
            value={diaEntrega}
            onChange={(e) => setDiaEntrega(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Cantidad de Paquetes:</label>
          <input
            type="number"
            value={cantidadPaquetes}
            onChange={(e) => setCantidadPaquetes(parseInt(e.target.value) || 0)}
            required
          />
        </div>

        <div>
          <label>Cantidad de Incidencias:</label>
          <input
            type="number"
            value={incidencias}
            onChange={(e) => setIncidencias(parseInt(e.target.value) || 0)}
            required
          />
        </div>

        <div>
          <label>Cantidad de Paquetes Entregados Totales:</label>
          <input
            type="number"
            value={paquetesEntregados}
            onChange={(e) => setPaquetesEntregados(parseInt(e.target.value) || 0)}
            required
          />
        </div>

        <div className="form-input">
          <label>Dinero Recaudado (0.50€ por paquete):</label>
          <input type="text" value={`€${dineroRecaudado.toFixed(2)}`} readOnly />
        </div>

        <button type="submit" className="form-button">Guardar Registro</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};