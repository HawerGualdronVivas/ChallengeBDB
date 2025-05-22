import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import PracticanteForm from './components/PracticanteForm';
import PracticanteList from './components/PracticanteList';
import AvanceForm from './components/AvanceForm';
import ReporteAvances from './components/ReporteAvances';
import Login from './pages/Login';
import DashboardPracticante from './pages/DashboardPracticante';
import DashboardResponsable from './pages/DashboardResponsable';

function AppContent() {
  return (
    <Routes>
      {/* Redirige / al login */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard/practicante" element={<DashboardPracticante />} />
      <Route path="/dashboard/responsable" element={<DashboardResponsable />} />
      <Route path="/registro-practicante" element={<PracticanteForm />} />
      <Route path="/practicantes" element={<PracticanteList />} />
      <Route path="/avances/:id" element={<AvanceForm />} />
      <Route path="/reportes" element={<ReporteAvances />} />
    </Routes>
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
