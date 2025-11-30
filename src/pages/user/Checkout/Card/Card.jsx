import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumenLectura from '../../../../components/ResumenLectura/ResumenLectura';
import './Card.css';
import card1 from '../../../../assets/card1.png';

const PaymentCard = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    numero: '',
    vencimiento: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;

    // Validaciones específicas por campo
    switch(id) {
      case 'nombre':
        // Solo letras y espacios
        newValue = value.replace(/[^a-zA-Z\s]/g, '');
        break;
      case 'numero':
        // Solo números y espacios cada 4 dígitos
        newValue = value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
        break;
      case 'vencimiento':
        // Formato MM/AA
        newValue = value.replace(/\D/g, '');
        if (newValue.length >= 2) {
          newValue = newValue.slice(0, 2) + '/' + newValue.slice(2, 4);
        }
        break;
      case 'cvv':
        // Solo números, máximo 3 dígitos
        newValue = value.replace(/\D/g, '').slice(0, 3);
        break;
      default:
        break;
    }

    setFormData(prev => ({
      ...prev,
      [id]: newValue
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Este campo es obligatorio';
    }

    const numeroSinEspacios = formData.numero.replace(/\s/g, '');
    if (!numeroSinEspacios) {
      newErrors.numero = 'Este campo es obligatorio';
    } else if (numeroSinEspacios.length !== 16) {
      newErrors.numero = 'El número de tarjeta debe tener 16 dígitos';
    }

    if (!formData.vencimiento) {
      newErrors.vencimiento = 'Este campo es obligatorio';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.vencimiento)) {
      newErrors.vencimiento = 'Formato inválido (MM/AA)';
    }

    if (!formData.cvv) {
      newErrors.cvv = 'Este campo es obligatorio';
    } else if (formData.cvv.length !== 3) {
      newErrors.cvv = 'El CVV debe tener 3 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/checkout/pago');
    }
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
          <div className="tarjetaFormularioContainer">
            <img src={card1} alt="Tarjeta" className="imgTarjeta" />

            <form className="formTarjeta" onSubmit={handleSubmit} noValidate>
              <div className="campo">
                <label htmlFor="nombre">Nombre del titular</label>
                <input 
                  type="text" 
                  id="nombre" 
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre como aparece en la tarjeta"
                />
                {errors.nombre && <span className="error-text">{errors.nombre}</span>}
              </div>
              <div className="campo">
                <label htmlFor="numero">Número de tarjeta</label>
                <input 
                  type="text" 
                  id="numero" 
                  value={formData.numero}
                  onChange={handleChange}
                  maxLength="19"
                  placeholder="1234 5678 9012 3456"
                />
                {errors.numero && <span className="error-text">{errors.numero}</span>}
              </div>
              <div className="grupoCampos">
                <div className="campo">
                  <label htmlFor="vencimiento">Vencimiento</label>
                  <input 
                    type="text" 
                    id="vencimiento" 
                    value={formData.vencimiento}
                    onChange={handleChange}
                    placeholder="MM/AA" 
                    maxLength="5"
                  />
                  {errors.vencimiento && <span className="error-text">{errors.vencimiento}</span>}
                </div>
                <div className="campo">
                  <label htmlFor="cvv">CVV</label>
                  <input 
                    type="text" 
                    id="cvv" 
                    value={formData.cvv}
                    onChange={handleChange}
                    maxLength="3"
                    placeholder="123"
                  />
                  {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                </div>
              </div>
              <button type="submit" className="botonContinuar">Pagar</button>
            </form>
          </div>
        </div>

        <ResumenLectura />
      </section>
    </>
  );
};

export default PaymentCard;
