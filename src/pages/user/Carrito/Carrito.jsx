import "./Carrito.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResumenLectura from "../../../components/ResumenLectura/ResumenLectura";
import { useSession } from "../../../auth"; // 🔹 AJUSTA ESTE PATH SI ES DISTINTO

const API_BASE_URL = "https://progra-back-end.vercel.app"; 

const Carrito = () => {
  const navigate = useNavigate();
  const { user } = useSession(); // 🔹 usuario logueado (viene del login)
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🧠 Si no hay user, podrías forzar login
  useEffect(() => {
    if (!user) {
      // Si quieres redirigir:
      // navigate("/login");
      console.warn("No hay usuario en sesión, carrito no se puede cargar.");
    }
  }, [user]);

  const cargarCarrito = async () => {
    if (!user || !user.id) return;

try {
    setLoading(true);
    setError("");

    const response = await fetch(
      // 🚀 CORRECCIÓN: Usa backticks (`) en lugar de comillas
      `${API_BASE_URL}/carrito/${user.id}` // 🔹 GET /carrito/:idUsuario
    );

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "Error al obtener el carrito");
    }

    const data = await response.json();

      // 🔹 Se asume que el backend responde algo así:
      // [
      //   {
      //     id: 10,
      //     cantidad: 2,
      //     producto: {
      //       titulo: "...",
      //       descripcion: "...",
      //       precio: 199,
      //       img: "https://..."
      //     }
      //   }
      // ]
      const mapeados = (data || []).map((item) => {
        const p = item.producto || item; // por si tu API viene plano

        return {
          id: item.id, // id del item de carrito
          name: p.titulo || p.name || "Producto",
          description: p.descripcion || p.description || "",
          price: p.precio ?? p.price ?? 0,
          quantity: item.cantidad ?? item.quantity ?? 1,
          image: p.img || p.image || "",
          selected: true,
        };
      });

      setProductos(mapeados);
    } catch (err) {
      console.error("Error al cargar carrito:", err);
      setError(err.message || "Error al cargar carrito");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      cargarCarrito();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const cambiarSeleccion = (id) => {
    setProductos((prev) =>
      prev.map((producto) =>
        producto.id === id
          ? { ...producto, selected: !producto.selected }
          : producto
      )
    );
  };

const cambiarCantidad = async (id, incrementar) => {
  const producto = productos.find((p) => p.id === id);
  if (!producto) return;

  const nuevaCantidad = incrementar
    ? producto.quantity + 1
    : Math.max(1, producto.quantity - 1);

try {
    const response = await fetch(
      
      `${API_BASE_URL}/Carrito/item/${id}`, 
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cantidad: nuevaCantidad }),
      }
    );

    if (!response.ok) {
      let data = {};
      try {
        data = await response.json();
      } catch {
        data = { error: "Error inesperado del servidor" };
      }
      throw new Error(data.error || "Error al actualizar cantidad");
    }

    await cargarCarrito();
  } catch (err) {
    console.error("Error al cambiar cantidad:", err);
    setError(err.message || "Error al cambiar cantidad");
  }
};


const eliminarProducto = async (id) => {
    try {
      const response = await fetch(
       
        `${API_BASE_URL}/carrito/item/${id}`, 
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Error al eliminar producto");
      }

      await cargarCarrito();
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      setError(err.message || "Error al eliminar producto");
    }
  };
  const totalProductosSeleccionados = productos
    .filter((p) => p.selected)
    .reduce((sum, p) => sum + p.quantity, 0);

  const irACheckout = () => {
    navigate("/checkout");
  };

  if (!user) {
    return (
      <div className="main-content">
        <main className="carritoContainer">
          <div className="productosSection">
            <h2>Debes iniciar sesión para ver tu carrito.</h2>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <div className="main-content">
        <main className="carritoContainer">
          <div className="productosSection">
            <h2>
              <strong>Carro</strong> ({totalProductosSeleccionados} productos)
            </h2>

            {error && <p className="error">{error}</p>}
            {loading ? (
              <p>Cargando carrito...</p>
            ) : (
              <div className="cajaScroll">
                {productos.map((producto) => (
                  <div className="productoItem" key={producto.id}>
                    <input
                      type="checkbox"
                      checked={producto.selected}
                      onChange={() => cambiarSeleccion(producto.id)}
                    />
                    {producto.image && (
                      <img src={producto.image} alt={producto.name} />
                    )}
                    <div className="infoItem">
                      <h3>{producto.name}</h3>
                      <p>{producto.description}</p>
                      <p className="envio">Llega mañana</p>
                    </div>

                    <div className="columnaDerecha">
                      <div className="precio">
                        S/{(producto.price * producto.quantity).toFixed(2)}
                      </div>
                      <div className="cantidadControl">
                        <label>Cantidad:</label>
                        <button
                          onClick={() => cambiarCantidad(producto.id, false)}
                        >
                          -
                        </button>
                          <span>{producto.quantity}</span>
                        <button
                          onClick={() => cambiarCantidad(producto.id, true)}
                        >
                          +
                        </button>
                        <button
                          className="eliminar"
                          onClick={() => eliminarProducto(producto.id)}
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {!productos.length && <p>Tu carrito está vacío.</p>}
              </div>
            )}

            {productos.length > 0 && (
              <div style={{ marginTop: "1rem" }}>
                <button className="btnCheckout" onClick={irACheckout}>
                  Ir a Checkout
                </button>
              </div>
            )}
          </div>
          <ResumenLectura />
        </main>
      </div>
    </>
  );
};

export default Carrito;