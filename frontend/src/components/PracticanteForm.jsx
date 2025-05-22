import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/RegistroPracticanteForm.css";
import { FaUser, FaGraduationCap, FaCalendarAlt, FaUserTie, FaSave, FaTimes } from "react-icons/fa";

const PracticanteForm = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    programaAcademico: "",
    fechaIngreso: "",
    estado: "activo",
    responsable: "",
    email: "",
    telefono: "",
    observaciones: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = {};

    if (!formData.nombreCompleto.trim()) newErrors.nombreCompleto = "El nombre es obligatorio";
    if (!formData.programaAcademico) newErrors.programaAcademico = "Selecciona un programa";
    if (!formData.fechaIngreso) newErrors.fechaIngreso = "La fecha de ingreso es obligatoria";
    if (!formData.responsable.trim()) newErrors.responsable = "El responsable es obligatorio";

    if (formData.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Correo inválido";
    }

    if (formData.telefono && !/^\d{7,}$/.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe tener al menos 7 dígitos numéricos";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        nombre: formData.nombreCompleto,
        programa: formData.programaAcademico,
        fecha_ingreso: formData.fechaIngreso,
        estado: formData.estado,
        responsable: formData.responsable,
        email: formData.email,
        telefono: formData.telefono,
        observaciones: formData.observaciones,
      };

      await API.post("/practicantes", payload);
      alert("Practicante registrado exitosamente");
      navigate("/practicantes");
    } catch (error) {
      console.error("Error al registrar practicante:", error);
      alert("Error al registrar practicante. Intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-header">
        <div className="registro-nav">
          <a href="/" className="nav-link">Inicio</a>
          <a href="/registro-practicante" className="nav-link active">Registrar Practicante</a>
          <a href="/practicantes" className="nav-link">Lista de Practicantes</a>
          <a href="/reportes" className="nav-link">Reportes</a>
        </div>
      </div>

      <div className="registro-content">
        <div className="registro-card">
          <div className="registro-card-header">
            <h1>Registro de Practicantes</h1>
            <p>Completa el formulario para registrar un nuevo practicante en el sistema</p>
          </div>

          <form onSubmit={handleSubmit} className="registro-form">
            {/* Campo: Nombre completo */}
            <div className="form-group">
              <label>Nombre completo *</label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.nombreCompleto && <p className="error-text">{errors.nombreCompleto}</p>}
            </div>

            {/* Campo: Programa académico */}
            <div className="form-group">
              <label>Programa académico *</label>
              <div className="input-with-icon">
                <FaGraduationCap className="input-icon" />
                <select
                  name="programaAcademico"
                  value={formData.programaAcademico}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un programa</option>
                  <option value="Ingeniería Financiera">Ingeniería Financiera</option>
                  <option value="Administración de Empresas">Administración de Empresas</option>
                  <option value="Economía">Economía</option>
                  <option value="Contaduría Pública">Contaduría Pública</option>
                  <option value="Finanzas">Finanzas</option>
                </select>
              </div>
              {errors.programaAcademico && <p className="error-text">{errors.programaAcademico}</p>}
            </div>

            {/* Campo: Fecha de ingreso */}
            <div className="form-group">
              <label>Fecha de ingreso *</label>
              <div className="input-with-icon">
                <FaCalendarAlt className="input-icon" />
                <input
                  type="date"
                  name="fechaIngreso"
                  value={formData.fechaIngreso}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.fechaIngreso && <p className="error-text">{errors.fechaIngreso}</p>}
            </div>

            {/* Campo: Estado */}
            <div className="form-group">
              <label>Estado de la práctica</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="activo">Activo</option>
                <option value="finalizado">Finalizado</option>
                <option value="suspendido">Suspendido</option>
                <option value="pendiente">Pendiente</option>
              </select>
            </div>

            {/* Campo: Responsable */}
            <div className="form-group">
              <label>Responsable *</label>
              <div className="input-with-icon">
                <FaUserTie className="input-icon" />
                <input
                  type="text"
                  name="responsable"
                  value={formData.responsable}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.responsable && <p className="error-text">{errors.responsable}</p>}
            </div>

            {/* Campo: Email */}
            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            {/* Campo: Teléfono */}
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
              {errors.telefono && <p className="error-text">{errors.telefono}</p>}
            </div>

            {/* Campo: Observaciones */}
            <div className="form-group">
              <label>Observaciones</label>
              <textarea
                name="observaciones"
                rows="4"
                value={formData.observaciones}
                onChange={handleChange}
              />
            </div>

            {/* Botones */}
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => navigate("/practicantes")}>
                <FaTimes /> Cancelar
              </button>
              <button type="submit" className="btn-primary" disabled={isLoading}>
                <FaSave /> {isLoading ? "Guardando..." : "Registrar Practicante"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PracticanteForm;
