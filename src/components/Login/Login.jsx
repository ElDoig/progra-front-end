import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { useSession } from "../../auth"; 
import "./Login.css";


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, isLogged, user } = useSession(); 
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged) {
            const userRole = user?.rol;
            const redirectPath = userRole === "admin" ? "/admin" : "/user/profile";
            navigate(redirectPath, { replace: true });
        }
    }, [isLogged, navigate, user]); 


   const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const result = await login(email, password); 

        if (result.success) {
           
            const currentUser = user || useSession().user; 
            const userRole = currentUser?.rol;
            const redirectPath = userRole === "admin" ? "/admin" : "/user/profile";
            
            navigate(redirectPath, { replace: true });

        } else {
            setError(result.message);
        }
        } catch (err) {
      
            console.error("Error en el login:", err);
            setError("Error desconocido durante el inicio de sesión.");
        }
    };


    if (isLogged) {
        return null;
    }
  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
        
          <label htmlFor="email">Correo Electrónico</label> 
          <input
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="tucorreo@ejemplo.com" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn-login">
          Entrar
        </button>
        
       
        <div className="login-links">
            <Link to="/registro">¿No tienes cuenta? Regístrate aquí</Link>
        <q><Link to="/recuperar-password" className="forgot-password-link">¿Olvidaste tu contraseña?</Link></q>
        </div>
        
      </form>
    </div>
  );
}