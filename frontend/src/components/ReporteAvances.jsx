import { useEffect, useState } from "react";
import API from "../api";
import "../styles/ReporteAvances.css";

const ReporteAvances = () => {
  const [practicantes, setPracticantes] = useState([]);
  const [avances, setAvances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resPracticantes, resAvances] = await Promise.all([
          API.get("/practicantes"),
          API.get("/avances"),
        ]);

        setPracticantes(resPracticantes.data);
        setAvances(resAvances.data);
      } catch (error) {
        console.error("Error al cargar reportes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Agrupar avances por practicante_id
  const contarAvances = (practicanteId) =>
    avances.filter((a) => a.practicante_id === practicanteId).length;

  const activos = practicantes.filter((p) => p.estado === "activo");
  const finalizados = practicantes.filter((p) => p.estado === "finalizado");

  return (
    <div className="registro-container">
      <div className="registro-header">
        <div className="registro-nav">
          <a href="/" className="nav-link">Inicio</a>
          <a href="/registro-practicante" className="nav-link">Registrar Practicante</a>
          <a href="/practicantes" className="nav-link">Lista de Practicantes</a>
          <a href="/reportes" className="nav-link active">Reportes</a>
        </div>
      </div>

      <div className="container">
        <h1>Reporte General de Prácticas</h1>

        {loading ? (
          <p>Cargando datos...</p>
        ) : (
          <>
            <section className="reporte-section">
              <h2>Avances por Practicante</h2>
              <table className="reporte-tabla">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Programa</th>
                    <th>Estado</th>
                    <th>Total Avances</th>
                  </tr>
                </thead>
                <tbody>
                  {practicantes.map((p) => (
                    <tr key={p.id}>
                      <td>{p.nombre}</td>
                      <td>{p.programa}</td>
                      <td>{p.estado}</td>
                      <td>{contarAvances(p.id)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="reporte-section">
              <h2>Prácticas Activas</h2>
              <ul>
                {activos.map((p) => (
                  <li key={p.id}>{p.nombre} – {p.programa}</li>
                ))}
              </ul>
            </section>

            <section className="reporte-section">
              <h2>Prácticas Finalizadas</h2>
              <ul>
                {finalizados.map((p) => (
                  <li key={p.id}>{p.nombre} – {p.programa}</li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default ReporteAvances;
