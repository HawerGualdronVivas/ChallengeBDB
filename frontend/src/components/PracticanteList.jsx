import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

const PracticanteList = () => {
  const [practicantes, setPracticantes] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState('todos');

  // Cargar practicantes al iniciar
  useEffect(() => {
    fetchPracticantes();
  }, []);

  const fetchPracticantes = async () => {
    try {
      const res = await API.get('/practicantes');
      setPracticantes(res.data);
    } catch (err) {
      console.error('Error cargando practicantes:', err);
    }
  };

  const filtrar = (estado) => {
    setEstadoFiltro(estado);
  };

  // Filtrar lista según el estado
  const practicantesFiltrados = practicantes.filter((p) =>
    estadoFiltro === 'todos' ? true : p.estado === estadoFiltro
  );

  return (
    <div>
      <h2>Lista de Practicantes</h2>

      <div style={{ marginBottom: '1rem' }}>
        <strong>Filtrar por estado:</strong>
        {' '}
        <button onClick={() => filtrar('todos')}>Todos</button>
        <button onClick={() => filtrar('activo')}>Activos</button>
        <button onClick={() => filtrar('finalizado')}>Finalizados</button>
        <button onClick={() => filtrar('en espera')}>En espera</button>
      </div>

      <ul>
        {practicantesFiltrados.map((p) => (
          <li key={p.id}>
            <strong>{p.nombre}</strong> ({p.programa}) - {p.estado}
            {' '}| Responsable: {p.responsable}
            {' '}| <Link to={`/avances/${p.id}`}>Registrar Avance</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PracticanteList;
