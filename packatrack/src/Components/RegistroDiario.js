import React, { useState } from 'react'

export const RegistroDiario = () => {
  const [cantidadPaquetes, setCantidadPaquetes] = useState(0)
  const [incidencias, setIncidencias] = useState(0)
  const [paquetesEntregados, setPaquetesEntregados] = useState(0)
  const [diaEntrega, setDiaEntrega] = useState('')

  // Calculo del dinero recaudado
  const dineroRecaudado = paquetesEntregados * 0.50

  const handleSubmit = (e) => {
    e.preventDefault()

    const nuevoRegistro = {
      diaEntrega,
      cantidadPaquetes,
      incidencias,
      paquetesEntregados,
      dineroRecaudado,
    }

    alert('Registro guardado con éxito!')

    setCantidadPaquetes(0)
    setIncidencias(0)
    setPaquetesEntregados(0)
    setDiaEntrega('')
  }

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
            onChange={(e) => setCantidadPaquetes(parseInt(e.target.value))}
            required
          />
        </div>

        <div>
          <label>Cantidad de Incidencias:</label>
          <input
            type="number"
            value={incidencias}
            onChange={(e) => setIncidencias(parseInt(e.target.value))}
            required
          />
        </div>

        <div>
          <label>Cantidad de Paquetes Entregados Totales:</label>
          <input
            type="number"
            value={paquetesEntregados}
            onChange={(e) => setPaquetesEntregados(parseInt(e.target.value))}
            required
          />
        </div>

        <div className="form-input">
          <label>Dinero Recaudado (0.50€ por paquete):</label>
          <input type="text" value={`€${dineroRecaudado.toFixed(2)}`} readOnly />
        </div>

        <button type="submit" className="form-button">Guardar Registro</button>
      </form>
    </div>
  );
}
