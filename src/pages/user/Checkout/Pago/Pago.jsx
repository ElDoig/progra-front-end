import './Pago.css';
import { useState, useEffect } from 'react';
import ResumenLectura from '../../../../components/ResumenLectura/ResumenLectura';
import delivery from '../../../../assets/delivery.png';
import check from '../../../../assets/check.png';

const PagoFinal = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          setProductos(parsedCart.filter(item => item.selected));
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, []);

  return (
    <>
      <div className="espaciador-header" />
      <main className="layoutPagoFinal">
        <section className="columnaProductos">
          <div className="tituloExito">
            <h1>Orden completada :)</h1>
            <br/>
            <p>Gracias por tu compra!</p>
          </div>
          <h3 className="subtituloResumen">Resumen de la compra</h3>
          <div className="productosResumen">
            <div className="listaProductos">
              {productos.map((producto) => (
                <div className="productoFinal" key={producto.id}>
                  <div className="productoImagen">
                    <img src={producto.image} alt={producto.name} />
                  </div>
                  <div className="infoProducto">
                    <h4>{producto.name}</h4>
                    <p>{producto.description}</p>
                    <span className="envio">Llega mañana</span>
                    <p className="cantidad">Cantidad <strong>{producto.quantity}</strong></p>
                  </div>
                  <div className="precioProducto">
                    <strong>S/ {(producto.price * producto.quantity).toFixed(2)}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        

        <aside className="columnaResumen">
          <div className="iconoCheckGrande">
            <img src={check} alt="Check" />
          </div>

          <ResumenLectura />

          <div className="direccionEnvio">
            <h4>Dirección de envío</h4>
            <p>Av la molina 12334<br />Lima - Lima<br />Celular de contacto: 990892131</p>
            <p><strong>Fecha de entrega aproximada: 04/05/2025</strong></p>
            <img src={delivery} alt="Delivery" className="iconoDelivery" />
          </div>

          <button className="botonOfertas">Ver más ofertas</button>
        </aside>
      </main>
    </>
  );
};

export default PagoFinal;

