import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; 
import "../styles/LoginForm.css";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await API.post("/login", { email, password });

      const { rol } = res.data.user;

      // Guardar en localStorage
      localStorage.setItem("userRole", rol);
      localStorage.setItem("userEmail", res.data.user.email);

      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.status === 401) {
        setError("Credenciales inválidas");
      } else {
        setError("Error al conectar con el servidor");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-card">
          <div className="login-card-left">
            <div className="login-brand">
              <div className="brand-icon">
                <FaSignInAlt />
              </div>
              <h1>Gestión de Prácticas</h1>
            </div>
            <div className="login-info">
              <h2>Bienvenido de nuevo</h2>
              <p>Inicia sesión para acceder al sistema de gestión y seguimiento de prácticas profesionales.</p>
              <div className="login-features">
                <div className="feature">
                  <div className="feature-icon">✓</div>
                  <span>Seguimiento de practicantes</span>
                </div>
                <div className="feature">
                  <div className="feature-icon">✓</div>
                  <span>Gestión de avances</span>
                </div>
                <div className="feature">
                  <div className="feature-icon">✓</div>
                  <span>Reportes y estadísticas</span>
                </div>
              </div>
            </div>
          </div>

          <div className="login-card-right">
            <div className="login-form-container">
              <h2>Iniciar Sesión</h2>
              <p>Ingresa tus credenciales para acceder al sistema</p>

              {error && <div className="login-error">{error}</div>}

              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <div className="input-with-icon">
                    <FaUser className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <div className="input-with-icon">
                    <FaLock className="input-icon" />
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div className="form-options">
                  <div className="remember-me">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="rememberMe">Recordarme</label>
                  </div>
                  <a href="/recuperar-contrasena" className="forgot-password">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <button type="submit" className="login-button" disabled={isLoading}>
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </button>
              </form>

              <div className="login-footer">
                <p>
                  ¿No tienes una cuenta?{" "}
                  <a href="/contacto" className="signup-link">
                    Contacta al administrador
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
