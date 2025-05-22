import React, { useEffect, useState } from 'react';
import API from '../api';

const ReporteAvances = () => {
  const [practicantes, setPracticantes] = useState([]);
  const [avancesPorPracticante, setAvancesPorPracticante] = useState({});

  useEffect(() => {
    cargarReporte();
  }, []);

  const cargarReporte = async () => {
    try {
      const resPract = await API.get('/practicantes');
      setPracticantes(resPract.data);

      // Cargar avances por practicante
      const avancesAgrupados = {};
      for (const p of resPract.data) {
        const resAvances = await API.get(`/avances/${p.id}`);
        avancesAgrupados[p.id] = resAvances.data;
      }

      setAvancesPorPracticante(avancesAgrupados);
    } catch (error) {
      console.error('Error al cargar el reporte:', error);
    }
  };

  return (
    <div>
      <h2>Reporte de Avances por Practicantes</h2>
      {practicantes.map((p) => (
        <div key={p.id} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
          <h3>{p.nombre} ({p.programa})</h3>
          <p><strong>Estado:</strong> {p.estado} | <strong>Responsable:</strong> {p.responsable}</p>
          <h4>Avances:</h4>
          <ul>
            {(avancesPorPracticante[p.id] || []).map((a) => (
              <li key={a.id}>
                <strong>{a.fecha}</strong>: {a.descripcion}
                <br />
                <em>Retroalimentación:</em> {a.retroalimentacion || 'No asignada'}
              </li>
            ))}
            {(!avancesPorPracticante[p.id] || avancesPorPracticante[p.id].length === 0) && (
              <p style={{ fontStyle: 'italic' }}>Sin avances registrados</p>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ReporteAvances;
