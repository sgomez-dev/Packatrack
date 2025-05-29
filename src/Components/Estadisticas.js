import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../AuthContext';

export const Estadisticas = () => {
  const { user } = useAuth();
  const [totalPaquetes, setTotalPaquetes] = useState(0);
  const [totalDineroRecaudado, setTotalDineroRecaudado] = useState(0);
  const [totalIncidencias, setTotalIncidencias] = useState(0);
  const [promedioIncidencias, setPromedioIncidencias] = useState(0);
  const [error, setError] = useState('');

  // Función para calcular las estadísticas a partir de los registros del usuario
  const calcularEstadisticas = async () => {
    if (!user) {
      setError('Debes iniciar sesión para ver las estadísticas.');
      return;
    }

    try {
      const registrosCollection = collection(db, `usuarios/${user.uid}/registros`);
      const registrosSnapshot = await getDocs(registrosCollection);

      let totalPaquetesEntregados = 0;
      let totalDinero = 0;
      let incidenciasTotales = 0;
      let numRegistros = 0;

      registrosSnapshot.forEach((doc) => {
        const data = doc.data();
        totalPaquetesEntregados += data.paquetesEntregados;
        totalDinero += data.dineroRecaudado;
        incidenciasTotales += data.incidencias;
        numRegistros += 1;
      });

      setTotalPaquetes(totalPaquetesEntregados);
      setTotalDineroRecaudado(totalDinero);
      setTotalIncidencias(incidenciasTotales);
      setPromedioIncidencias(numRegistros ? incidenciasTotales / numRegistros : 0);
    } catch (error) {
      setError('Error al calcular las estadísticas: ' + error.message);
    }
  };

  useEffect(() => {
    calcularEstadisticas();
  }, [user]);

  return (
    <div className="estadisticas-container">
      <h2>Estadísticas Generales</h2>
      {error && <p className="error-message">{error}</p>}
      <p><strong>Total de Paquetes Entregados:</strong> {totalPaquetes}</p>
      <p><strong>Dinero Recaudado Total:</strong> €{totalDineroRecaudado.toFixed(2)}</p>
      <p><strong>Total de Incidencias:</strong> {totalIncidencias}</p>
      <p><strong>Promedio de Incidencias por Entrega:</strong> {promedioIncidencias.toFixed(2)}</p>
    </div>
  );
};
