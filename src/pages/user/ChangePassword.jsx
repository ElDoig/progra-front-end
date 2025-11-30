import React, { useState } from 'react';
import api from '../../components/services/api';
import { useSession } from '../../components/Login/Session';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const { user } = useSession();
  const navigate = useNavigate();
  
  const [passwordActual, setPasswordActual] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      // Enviamos ID, clave vieja y clave nueva
      await api.put('/auth/cambiar-password', {
        id: user.id,
        passwordActual,
        nuevaPassword
      });

      setMensaje("¡Contraseña actualizada con éxito!");
      setTimeout(() => navigate('/user/profile'), 2000);

    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Error al cambiar la contraseña");
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: '20px' }}>
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2 className="h2">Cambiar Contraseña</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
          <div>
            <label>Contraseña Actual</label>
            <input 
              type="password" 
              className="input"
              value={passwordActual}
              onChange={e => setPasswordActual(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Nueva Contraseña</label>
            <input 
              type="password" 
              className="input"
              value={nuevaPassword}
              onChange={e => setNuevaPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}
          {mensaje && <p className="success" style={{ color: 'green' }}>{mensaje}</p>}

          <button className="btn">Actualizar</button>
        </form>
      </div>
    </div>
  );
}