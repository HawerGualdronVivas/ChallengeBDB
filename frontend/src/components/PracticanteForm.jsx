import React, { useState } from 'react';
import API from '../api';

const PracticanteForm = () => {
  const [form, setForm] = useState({
    nombre: '',
    programa: '',
    fecha_ingreso: '',
    estado: 'activo',
    responsable: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMensaje('');
    try {
      await API.post('/practicantes', form);
      setMensaje('✅ Practicante registrado con éxito');
      setForm({
        nombre: '',
        programa: '',
        fecha_ingreso: '',
        estado: 'activo',
        responsable: ''
      });
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al registrar practicante');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#14327D" }}>
            Registro de Practicantes
          </h1>
          <p className="mt-2 text-sm text-gray-600">Completa el formulario para registrar un nuevo practicante</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold" style={{ color: "#14327D" }}>
              Datos del practicante
            </h2>

            {mensaje && <p className="mb-4 text-sm text-green-600">{mensaje}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="programa" className="block text-sm font-medium text-gray-700">
                  Programa académico
                </label>
                <input
                  type="text"
                  id="programa"
                  name="programa"
                  value={form.programa}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="fecha_ingreso" className="block text-sm font-medium text-gray-700">
                  Fecha de ingreso
                </label>
                <input
                  type="date"
                  id="fecha_ingreso"
                  name="fecha_ingreso"
                  value={form.fecha_ingreso}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                  Estado de la práctica
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={form.estado}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="activo">Activo</option>
                  <option value="finalizado">Finalizado</option>
                  <option value="en espera">En espera</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="responsable" className="block text-sm font-medium text-gray-700">
                  Responsable de seguimiento
                </label>
                <input
                  type="text"
                  id="responsable"
                  name="responsable"
                  value={form.responsable}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md py-2 text-sm font-medium text-white transition-colors hover:bg-opacity-90 focus:outline-none disabled:opacity-50"
                style={{ backgroundColor: "#14327D" }}
              >
                {isLoading ? "Registrando..." : "Registrar Practicante"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticanteForm;
