import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../AuthContext';

export const HistorialRegistros = () => {
  const [registros, setRegistros] = useState([]);
  const { user } = useAuth();
  const [editando, setEditando] = useState(null);
  const [formularioEdicion, setFormularioEdicion] = useState({
    diaEntrega: '',
    cantidadPaquetes: 0,
    incidencias: 0,
    paquetesEntregados: 0,
    dineroRecaudado: 0,
  });
  const [error, setError] = useState('');

  // Función para obtener los registros específicos del usuario
  const obtenerRegistros = async () => {
    if (!user) {
      setError('Debes iniciar sesión para ver el historial de registros.');
      return;
    }

    try {
      const registrosCollection = collection(db, `usuarios/${user.uid}/registros`);
      const registrosSnapshot = await getDocs(registrosCollection);
      const registrosList = registrosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRegistros(registrosList);
    } catch (error) {
      setError('Error al obtener los registros: ' + error.message);
    }
  };

  useEffect(() => {
    obtenerRegistros();
  }, [user]);

  // Función para eliminar un registro
  const eliminarRegistro = async (id) => {
    try {
      await deleteDoc(doc(db, `usuarios/${user.uid}/registros`, id));
      setRegistros(registros.filter((registro) => registro.id !== id));
      alert('Registro eliminado con éxito');
    } catch (error) {
      setError('Error al eliminar el registro: ' + error.message);
    }
  };

  // Función para abrir el formulario de edición
  const abrirEdicion = (registro) => {
    setEditando(registro.id);
    setFormularioEdicion({
      diaEntrega: registro.diaEntrega,
      cantidadPaquetes: registro.cantidadPaquetes,
      incidencias: registro.incidencias,
      paquetesEntregados: registro.paquetesEntregados,
      dineroRecaudado: registro.paquetesEntregados * 0.50,
    });
  };

  // Función para manejar el cambio en los campos del formulario de edición
  const manejarCambioEdicion = (e) => {
    const { name, value } = e.target;
    setFormularioEdicion((prevState) => ({
      ...prevState,
      [name]: name === 'paquetesEntregados' ? parseInt(value) || 0 : value,
      dineroRecaudado: name === 'paquetesEntregados' ? (parseInt(value) || 0) * 0.50 : prevState.dineroRecaudado,
    }));
  };

  // Función para guardar los cambios en la edición
  const guardarEdicion = async (id) => {
    try {
      const registroRef = doc(db, `usuarios/${user.uid}/registros`, id);
      await updateDoc(registroRef, formularioEdicion);
      setRegistros((prevRegistros) =>
        prevRegistros.map((registro) =>
          registro.id === id ? { id, ...formularioEdicion } : registro
        )
      );
      setEditando(null);
      alert('Registro actualizado');
    } catch (error) {
      setError('Error al actualizar el registro: ' + error.message);
    }
  };

  return (
    <div className="register-history">
      <h2>Historial de Registros</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="registros-list">
        {registros.length > 0 ? (
          registros.map((registro) => (
            <div key={registro.id} className="card">
              {editando === registro.id ? (
                <div className="edit-form">
                  <input
                    type="date"
                    name="diaEntrega"
                    value={formularioEdicion.diaEntrega}
                    onChange={manejarCambioEdicion}
                  />
                  <input
                    type="number"
                    name="cantidadPaquetes"
                    value={formularioEdicion.cantidadPaquetes}
                    onChange={manejarCambioEdicion}
                  />
                  <input
                    type="number"
                    name="incidencias"
                    value={formularioEdicion.incidencias}
                    onChange={manejarCambioEdicion}
                  />
                  <input
                    type="number"
                    name="paquetesEntregados"
                    value={formularioEdicion.paquetesEntregados}
                    onChange={manejarCambioEdicion}
                  />
                  <p>Dinero Recaudado: €{formularioEdicion.dineroRecaudado.toFixed(2)}</p>
                  <button onClick={() => guardarEdicion(registro.id)}>Guardar</button>
                  <button onClick={() => setEditando(null)}>Cancelar</button>
                </div>
              ) : (
                <>
                  <p><strong>Día de Entrega:</strong> {registro.diaEntrega}</p>
                  <p><strong>Cantidad de Paquetes:</strong> {registro.cantidadPaquetes}</p>
                  <p><strong>Cantidad de Incidencias:</strong> {registro.incidencias}</p>
                  <p><strong>Cantidad de Paquetes Entregados:</strong> {registro.paquetesEntregados}</p>
                  <p><strong>Dinero Recaudado:</strong> €{registro.dineroRecaudado.toFixed(2)}</p>
                  <button onClick={() => abrirEdicion(registro)} className="edit-button">Editar</button>
                  <button onClick={() => eliminarRegistro(registro.id)} className="delete-button">Eliminar</button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No tienes registros guardados.</p>
        )}
      </div>
    </div>
  );
};

