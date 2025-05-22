import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

const AvanceForm = () => {
  const { id } = useParams(); // ID del practicante
  const [form, setForm] = useState({
    descripcion: '',
    fecha: '',
    retroalimentacion: ''
  });

  const [avances, setAvances] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    cargarAvances();
  }, []);

  const cargarAvances = async () => {
    try {
      const res = await API.get(`/avances/${id}`);
      setAvances(res.data);
    } catch (error) {
      console.error('Error al cargar avances:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/avances', {
        ...form,
        practicante_id: id
      });
      setMensaje('Avance registrado con éxito');
      setForm({ descripcion: '', fecha: '', retroalimentacion: '' });
      cargarAvances();
    } catch (error) {
      console.error(error);
      setMensaje('Error al registrar el avance');
    }
  };

  return (
    <div>
      <h2>Registrar Avance</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          name="descripcion"
          placeholder="Descripción del avance"
          value={form.descripcion}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          required
        />
        <textarea
          name="retroalimentacion"
          placeholder="Retroalimentación del responsable"
          value={form.retroalimentacion}
          onChange={handleChange}
        />
        <button type="submit">Registrar Avance</button>
      </form>

      <hr />
      <h3>Historial de Avances</h3>
      <ul>
        {avances.map((a) => (
          <li key={a.id}>
            <strong>{a.fecha}</strong>: {a.descripcion}
            <br />
            <em>Retroalimentación:</em> {a.retroalimentacion || 'Sin retroalimentación'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvanceForm;
