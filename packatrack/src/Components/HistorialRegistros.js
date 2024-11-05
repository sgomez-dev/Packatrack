import React, { useEffect, useState } from 'react';
import { db } from './firebase.config';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export const HistorialRegistros = () => {

  const [registros, setRegistros] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formularioEdicion, setFormularioEdicion] = useState({
    diaEntrega: '',
    cantidadPaquetes: 0,
    incidencias: 0,
    paquetesEntregados: 0,
    dineroRecaudado: 0,
  })

  const obtenerRegistros = async () => {
    const registrosCollection = collection(db,  'registros')
    const registrosSnapshot = await getDocs(registrosCollection)
    const registrosList = registrosSnapshot.docs.map((documento) => ({
      id: documento.id,
      ...documento.data(),
    }))
    setRegistros(registrosList)
  }

  useEffect(() => {
    obtenerRegistros()
  }, [])

  const eliminarRegistro = async (id) => {
    try {
      await deleteDoc(doc(db, 'registros', id))
      setRegistros(registros.filter((registro) => registro.id !== id))
      alert('Registro eliminado con éxito!')
    } catch (error) {
      alert('Error al eliminar el registro: ', error.message)
    }
  }

  const abrirEdicion = (registro) => {
    setEditando(registro.id)
    setFormularioEdicion({
      diaEntrega: registro.diaEntrega,
      cantidadPaquetes: registro.cantidadPaquetes,
      incidencias: registro.incidencias,
      paquetesEntregados: registro.paquetesEntregados,
      dineroRecaudado: registro.paquetesEntregados * 0.50,
    })
  }

  const manejarCambioEdicion = (e) => {
    const { name, value } = e.target;

    // Si se cambia la cantidad de paquetes entregados, recalcula el dinero recaudado
    if (name === 'paquetesEntregados') {
      const nuevosPaquetesEntregados = parseInt(value) || 0;
      setFormularioEdicion((prevState) => ({
        ...prevState,
        [name]: nuevosPaquetesEntregados,
        dineroRecaudado: nuevosPaquetesEntregados * 0.50, // Cálculo en tiempo real
      }));
    } else {
      setFormularioEdicion((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const guardarEdicion = async (id) => {
    try {
      const registroRef = doc(db, 'registros', id)
      await updateDoc(registroRef, formularioEdicion)
      setRegistros((prevRegistros) =>
        prevRegistros.map((registro) =>
          registro.id === id ? {id, ...formularioEdicion } : registro
        )
      )
      setEditando(null)
      alert('Registro actualizado con exito!')
    } catch (error) {
      alert('Error al actualizar el registro: ', error.message)
    }
  }
  return (
    <div className="register-history">
      <h2>Historial de Registros</h2>
      <div className="history-container">
        {registros.map((registro) => (
          <div key={registro.id} className="card">
            {editando === registro.id ? (
              // formulario de edicion
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
              // vista de la tarjeta
              <>
                <p><strong>Día de Entrega:</strong> {registro.diaEntrega}</p>
                <p><strong>Cantidad de Paquetes:</strong> {registro.cantidadPaquetes}</p>
                <p><strong>Cantidad de Incidencias:</strong> {registro.incidencias}</p>
                <p><strong>Cantidad de Paquetes Entregados:</strong> {registro.paquetesEntregados}</p>
                <p><strong>Dinero Recaudado:</strong> €{registro.dineroRecaudado.toFixed(2)}</p>
                <button onClick={() => eliminarRegistro(registro.id)}>Eliminar</button>
                <button onClick={() => abrirEdicion(registro)}>Modificar</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
