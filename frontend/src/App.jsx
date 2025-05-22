import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import PracticanteForm from './components/PracticanteForm';
import PracticanteList from './components/PracticanteList';
import AvanceForm from './components/AvanceForm';
import ReporteAvances from './components/ReporteAvances';
import Login from './pages/Login';
import DashboardPracticante from './pages/DashboardPracticante';
import DashboardResponsable from './pages/DashboardResponsable';

function AppContent() {
  const location = useLocation();
  const hideNavbarOn = ['/login']; // rutas sin menú

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && (
        <nav style={{ padding: '1rem', background: '#eee' }}>
          <Link to="/">Inicio</Link> |{" "}
          <Link to="/registro-practicante">Registrar Practicante</Link> |{" "}
          <Link to="/practicantes">Lista de Practicantes</Link> |{" "}
          <Link to="/reportes">Reportes</Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/practicante" element={<DashboardPracticante />} />
        <Route path="/dashboard/responsable" element={<DashboardResponsable />} />
        <Route path="/registro-practicante" element={<PracticanteForm />} />
        <Route path="/practicantes" element={<PracticanteList />} />
        <Route path="/avances/:id" element={<AvanceForm />} />
        <Route path="/reportes" element={<ReporteAvances />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
