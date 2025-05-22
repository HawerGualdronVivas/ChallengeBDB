import { Link } from "react-router-dom"
import { FaUserGraduate, FaClipboardList, FaChartBar, FaUserPlus } from "react-icons/fa"
import "../styles/Home.css"

const Home = () => {

  const stats = [
    { id: 1, title: "Practicantes Activos", count: 24, icon: <FaUserGraduate /> },
    { id: 2, title: "Avances Pendientes", count: 8, icon: <FaClipboardList /> },
    { id: 3, title: "Reportes Generados", count: 15, icon: <FaChartBar /> },
  ]


  const quickActions = [
    {
      id: 1,
      title: "Registrar Practicante",
      description: "Añade un nuevo practicante al sistema",
      icon: <FaUserPlus />,
      link: "/registrar-practicante",
      primary: true,
    },
    {
      id: 2,
      title: "Ver Practicantes",
      description: "Consulta la lista de practicantes",
      icon: <FaUserGraduate />,
      link: "/lista-practicantes",
      primary: false,
    },
    {
      id: 3,
      title: "Generar Reportes",
      description: "Crea informes y estadísticas",
      icon: <FaChartBar />,
      link: "/reportes",
      primary: false,
    },
  ]

  return (
    <div className="home-container">
      {/* Header con navegación */}
      <header className="header">
        <div className="logo">
          <h1>Gestión de Prácticas</h1>
        </div>
        <nav className="navigation">
          <Link to="/" className="nav-link active">
            Inicio
          </Link>
          <Link to="/registro-practicante" className="nav-link">
            Registrar Practicante
          </Link>
          <Link to="/lista-practicantes" className="nav-link">
            Lista de Practicantes
          </Link>
          <Link to="/reportes" className="nav-link">
            Reportes
          </Link>
        </nav>
      </header>

      {/* Hero section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bienvenido a la Gestión de Prácticas</h1>
          <p>Sistema integral para la administración y seguimiento de practicantes</p>
          <div className="hero-buttons">
            <Link to="/registrar-practicante" className="btn btn-primary">
              Registrar Practicante
            </Link>
            <Link to="/lista-practicantes" className="btn btn-secondary">
              Ver Practicantes
            </Link>
          </div>
        </div>
        <div className="hero-image">
          {}
          <div className="placeholder-image">
            <FaUserGraduate size={120} color="#14327D" opacity={0.8} />
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.id}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3 className="stat-count">{stat.count}</h3>
                <p className="stat-title">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick actions section */}
      <section className="quick-actions-section">
        <h2 className="section-title">Acciones Rápidas</h2>
        <div className="quick-actions-container">
          {quickActions.map((action) => (
            <Link to={action.link} key={action.id} className={`quick-action-card ${action.primary ? "primary" : ""}`}>
              <div className="quick-action-icon">{action.icon}</div>
              <div className="quick-action-content">
                <h3 className="quick-action-title">{action.title}</h3>
                <p className="quick-action-description">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Sistema de Gestión de Prácticas. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default Home

