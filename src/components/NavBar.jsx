import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../auth';
import { useSearch } from '../context/SearchContext'; // 🚀 NECESARIO para la búsqueda
import hotsale from '../data/hotsale'; // 🚀 NECESARIO para las sugerencias

export default function NavBar() {
  // --- Lógica de Autenticación y Navegación ---
  const { user, isAdmin, isLogged, logout } = useSession();
  const navigate = useNavigate();

  // --- Lógica de Búsqueda y Sugerencias (Del Primer NavBar) ---
  const { setBusqueda } = useSearch(); 
  const [sugerencias, setSugerencias] = useState([]);
  const [textoLocal, setTextoLocal] = useState(""); 

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  const handleCuentaClick = () => {
    if (!isLogged) navigate('/login');
    else navigate('/user/profile');
  };
  
  const handleCarritoClick = () => {
    navigate('/carrito'); 
  };
  
  const handleBuscar = () => {
    setBusqueda(textoLocal); 
    setSugerencias([]);
    navigate("/"); 
  };

  const alSeleccionarProducto = (titulo) => {
    setTextoLocal(titulo);
    setBusqueda(titulo); 
    setSugerencias([]);
    navigate("/");
  };
  
  const handleInputChange = (e) => {
    const texto = e.target.value;
    setTextoLocal(texto);

    if (texto.length > 0) {
      const coincidencias = hotsale.filter(producto => {
        const titulo = producto.titulo ? producto.titulo.toLowerCase() : "";
        const categoria = producto.categoria ? producto.categoria.toLowerCase() : "";
        const busqueda = texto.toLowerCase();
        return titulo.includes(busqueda) || categoria.includes(busqueda);
      });
      setSugerencias(coincidencias.slice(0, 5));
    } else {
      setSugerencias([]);
    }
  };

  return (
    <>
      {/* ---------------------------------------------------- */}
      {/* 🚀 TOPBAR: LOGO, BÚSQUEDA Y AUTENTICACIÓN/CARRITO */}
      {/* ---------------------------------------------------- */}
      <div className="topbar">
        <Link to="/" className="brand">GamePlay <span className="dot"></span></Link>

        {/* 🚀 INTEGRACIÓN DE LA BÚSQUEDA CON SUGERENCIAS */}
        <div className="search-container" style={{ position: 'relative', width: '400px' }}>
            <div className="search">
                <input 
                    placeholder="Buscar un producto..." 
                    value={textoLocal}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
                />
                <span onClick={handleBuscar} style={{cursor: 'pointer'}}>🔍</span>
            </div>
            {/* Contenedor de Sugerencias */}
            {sugerencias.length > 0 && (
                <div className="sugerencias-dropdown">
                    {sugerencias.map((item) => (
                        <div 
                            key={item.id}
                            onClick={() => alSeleccionarProducto(item.titulo)}
                            className="sugerencia-item"
                        >
                            <img src={item.img} alt="img" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
                            {item.titulo}
                        </div>
                    ))}
                </div>
            )}
        </div>
        
        {/* Usé un valor estático para el total del carrito, deberías cambiarlo por una variable de estado */}
        <button className="pill" onClick={handleCarritoClick}>🛒 Carrito S/ 100.00</button> 

        {isLogged ? (
          <button className="iconbtn" onClick={handleLogout}>
            👤 {user?.usuario} <span className="muted">(Cerrar sesión)</span>
          </button>
        ) : (
          <button className="iconbtn" onClick={handleCuentaClick}>
            👤 Ingresar <span className="muted">cuenta</span>
          </button>
        )}
      </div>
      
      {/* ---------------------------------------------------- */}
      {/* SUBNAV: ENLACES SECUNDARIOS Y ADMINISTRACIÓN */}
      {/* ---------------------------------------------------- */}
      <div className="subnav">
        <span>☰</span>
        <Link to="/">Home</Link>
        {isAdmin && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/mantenimiento/productos">Productos</Link>
            <Link to="/admin/categories">Listado categorías</Link>
            <Link to="/admin/categories/new">Agregar categoría</Link>
          </>
        )}
        {isLogged && (
          <>
            <Link to="/user/profile" style={{ marginLeft: 'auto' }}>Mi perfil</Link>
            <Link to="/user/change-password">Cambiar contraseña</Link>
            {/* Corregir esta ruta, debe ir al listado de órdenes, no a una orden específica */}
            <Link to="/user/orders">Mis órdenes</Link> 
          </>
        )}
      </div>
    </>
  );
}