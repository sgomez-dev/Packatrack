import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const Estadisticas = () => {
  const [totalPaquetes, setTotalPaquetes] = useState(0);
  const [totalDineroRecaudado, setTotalDineroRecaudado] = useState(0);
  const [promedioIncidencias, setPromedioIncidencias] = useState(0);
  const [totalIncidencias, setTotalIncidencias] = useState(0);

  // Función para calcular las estadísticas a partir de los registros
  const calcularEstadisticas = async () => {
    const registrosCollection = collection(db, 'registros');
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

    // Actualizar los estados con las estadísticas calculadas
    setTotalPaquetes(totalPaquetesEntregados);
    setTotalDineroRecaudado(totalDinero);
    setTotalIncidencias(incidenciasTotales);
    setPromedioIncidencias(numRegistros ? incidenciasTotales / numRegistros : 0);
  };

  useEffect(() => {
    calcularEstadisticas();
  }, []);

  return (
    <div className="estadisticas-container">
      <h2>Estadísticas Generales</h2>
      <p><strong>Total de Paquetes Entregados:</strong> {totalPaquetes}</p>
      <p><strong>Dinero Recaudado Total:</strong> €{totalDineroRecaudado.toFixed(2)}</p>
      <p><strong>Total de Incidencias:</strong> {totalIncidencias}</p>
      <p><strong>Promedio de Incidencias por Entrega:</strong> {promedioIncidencias.toFixed(2)}</p>
    </div>
  );
};
