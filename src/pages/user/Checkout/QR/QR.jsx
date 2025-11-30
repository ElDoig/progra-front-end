import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResumenLectura from '../../../../components/ResumenLectura/ResumenLectura';
import './QR.css';

const PaymentQR = () => {
  const navigate = useNavigate();

  const handleContinuar = () => {
    navigate('/checkout/pago');
  };

  return (
    <>
      <div className="espaciador-header" />
      <section className="contenedorCheckout">
        <div className="formularioCheckout">
          <div className="tituloPrincipal">
            <h1>Checkout</h1>
          </div>
          <div className='MetodoPago'><p>Metodo de pago</p></div>
          <div className="qrContainer">
            <div className='EscanearQR'><p>Escanear QR</p></div>
            <img src="/src/assets/qr.png" alt="Código QR" className="qrImagen" />
            <p className="qrIndicaciones">Valido por 05:00 minutos</p>
            <button className="btnContinuar" onClick={handleContinuar}>Ya realice el pago</button>
          </div>
        </div>

        <ResumenLectura />
      </section>
    </>
  );
};

export default PaymentQR;
