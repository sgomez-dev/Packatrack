import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy, where } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { FaFilter } from 'react-icons/fa';

export const HistorialRegistros = () => {
  const [registros, setRegistros] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState('');
  const [orden, setOrden] = useState('desc');
  const [filtroSeleccionado, setFiltroSeleccionado] = useState('orden');
  const { user } = useAuth();
  const [editando, setEditando] = useState(null);
  const [formularioEdicion, setFormularioEdicion] = useState({
    diaEntrega: '',
    cantidadPaquetes: '',
    incidencias: '',
    paquetesEntregados: '',
    dineroRecaudado: '',
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
      let q

      if (filtroSeleccionado === 'fecha' && filtroFecha) {
        q = query(registrosCollection,where('diaEntrega', '==', filtroFecha), orderBy('diaEntrega', orden))
      } else {
        q = query(registrosCollection, orderBy('diaEntrega', orden));
      }

      const registrosSnapshot = await getDocs(q);
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
  }, [user, filtroFecha, orden]);

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
      [name]: name === 'paquetesEntregados' ? parseInt(value): value,
      dineroRecaudado: name === 'paquetesEntregados' ? (parseInt(value)) * 0.50 : prevState.dineroRecaudado,
    }));
  };

  // Función para guardar los cambios en la edición
  const guardarEdicion = async (id) => {
    // validar que los campos estén llenos
    const { diaEntrega, cantidadPaquetes, incidencias, paquetesEntregados } = formularioEdicion
    
    const paquetesEntregadosInt = parseInt(paquetesEntregados)
    const incidenciasInt = parseInt(incidencias)
    const cantidadPaquetesInt = parseInt(cantidadPaquetes)
    if (paquetesEntregadosInt + incidenciasInt > cantidadPaquetesInt) {
      alert("El total entregado de paquetes e incidencias no puede exceder el total de paquetes.");
      return
    }
    
    if (!diaEntrega || !cantidadPaquetes  || !incidencias || !paquetesEntregados ) {
      alert('Todos los campos deben estar llenos.');
      return;
    }
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
      
      {/* Filtro de fecha y opciones de ordenamiento */}
      <div className="filter-section">
        <div className="filter-options">
          <label>
            <input
              type="radio"
              value="fecha"
              checked={filtroSeleccionado === 'fecha'}
              onChange={() => setFiltroSeleccionado('fecha')}
            />
            Filtrar por Fecha
          </label>
          <label>
            <input
              type="radio"
              value="orden"
              checked={filtroSeleccionado === 'orden'}
              onChange={() => setFiltroSeleccionado('orden')}
            />
            Ordenar por Fecha
          </label>
        </div>

        {filtroSeleccionado === 'fecha' && (
          <div className="filter-date">
            <label>Fecha:</label>
            <input
              type="date"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
            />
          </div>
        )}

        {filtroSeleccionado === 'orden' && (
          <div className="filter-order">
            <label>Orden:</label>
            <select onChange={(e) => setOrden(e.target.value)} value={orden}>
              <option value="desc">Más reciente a más antiguo</option>
              <option value="asc">Más antiguo a más reciente</option>
            </select>
          </div>
        )}
      </div>

      <div className="registros-list">
        {registros.length > 0 ? (
          registros.map((registro) => (
            <div key={registro.id} className="card">
              {editando === registro.id ? (
                <div className="edit-form">
                  <div>
                    <label>Día de entrega:</label>
                    <input
                      type="date"
                      name="diaEntrega"
                      value={formularioEdicion.diaEntrega}
                      onChange={manejarCambioEdicion}
                      required
                    />
                  </div>
                  <div>
                    <label>Cantidad de Paquetes:</label>
                    <input
                    type="number"
                    name="cantidadPaquetes"
                    value={formularioEdicion.cantidadPaquetes}
                    onChange={manejarCambioEdicion}
                    required
                  />
                  </div>
                  <div>
                    <label>Cantidad de Incidencias:</label>
                    <input
                    type="number"
                    name="incidencias"
                    value={formularioEdicion.incidencias}
                    onChange={manejarCambioEdicion}
                    required
                  />
                  </div>
                  <div>
                    <label>Paquetes Entregados:</label>
                    <input
                    type="number"
                    name="paquetesEntregados"
                    value={formularioEdicion.paquetesEntregados}
                    onChange={manejarCambioEdicion}
                    required
                  />
                  </div>
                  <p>Dinero Recaudado: €{formularioEdicion.dineroRecaudado.toFixed(2)}</p>
                  <button onClick={() => guardarEdicion(registro.id)}>Guardar</button>
                  <button onClick={() => setEditando(null)}>Cancelar</button>
                </div>
              ) : (
                <>
                  <p><strong>Día de Entrega:</strong> {registro.diaEntrega}</p>
                  <p><strong>Cantidad de Paquetes:</strong> {registro.cantidadPaquetes}</p>
                  <p><strong>Cantidad de Incidencias:</strong> {registro.incidencias}</p>
                  <p><strong>Paquetes Entregados:</strong> {registro.paquetesEntregados}</p>
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

