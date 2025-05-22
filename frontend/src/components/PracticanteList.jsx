import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import "../styles/PracticanteList.css";

const PracticanteList = () => {
  const [filtroActual, setFiltroActual] = useState("Todos");
  const [practicantes, setPracticantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/practicantes");
        setPracticantes(res.data);
      } catch (error) {
        console.error("Error al obtener practicantes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const practicantesFiltrados =
    filtroActual === "Todos"
      ? practicantes
      : practicantes.filter((p) => {
          if (filtroActual === "Activos") return p.estado === "activo";
          if (filtroActual === "Finalizados") return p.estado === "finalizado";
          if (filtroActual === "En espera") return p.estado === "en espera";
          return true;
        });

  return (
    <div className="registro-container">
      <div className="registro-header">
        <div className="registro-nav">
          <a href="/" className="nav-link">Inicio</a>
          <a href="/registro-practicante" className="nav-link">Registrar Practicante</a>
          <a href="/practicantes" className="nav-link active">Lista de Practicantes</a>
          <a href="/reportes" className="nav-link">Reportes</a>
        </div>
      </div>

      <div className="container">
        <h1 className="titulo">Lista de Practicantes</h1>

        <div className="filtros">
          <span className="filtro-label">Filtrar por estado:</span>
          {["Todos", "Activos", "Finalizados", "En espera"].map((filtro) => (
            <button
              key={filtro}
              className={`filtro-btn ${filtroActual === filtro ? "activo" : ""}`}
              onClick={() => setFiltroActual(filtro)}
            >
              {filtro}
            </button>
          ))}
        </div>

        {loading ? (
          <p>Cargando practicantes...</p>
        ) : practicantesFiltrados.length === 0 ? (
          <p>No hay practicantes para mostrar.</p>
        ) : (
          <table className="tabla-practicantes">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Programa</th>
                <th>Estado</th>
                <th>Responsable</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {practicantesFiltrados.map((practicante) => (
                <tr key={practicante.id}>
                  <td>{practicante.nombre}</td>
                  <td>{practicante.programa}</td>
                  <td>
                    <span className={`estado ${practicante.estado.replace(" ", "-")}`}>
                      {practicante.estado}
                    </span>
                  </td>
                  <td>{practicante.responsable}</td>
                  <td>
                    <Link to={`/avances/${practicante.id}`} className="registrar-avance">
                      Registrar Avance
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PracticanteList;
