import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import ResumenLectura from '../../../components/ResumenLectura/ResumenLectura';

const Checkout = () => {
  const navegacion = useNavigate();
  
  // Estados para el formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [telefono, setTelefono] = useState('');

  // Estados para errores
  const [errores, setErrores] = useState({
    nombre: '',
    apellido: '',
    ciudad: '',
    departamento: '',
    direccion: '',
    codigoPostal: '',
    telefono: ''
  });

  const [totales, setTotales] = useState({
    subtotal: "0.00",
    descuento: 0,
    total: "0.00",
    cantidadTotal: 0
  });
  
  // Cargar totales del carrito
  useEffect(() => {
    const cartTotals = JSON.parse(localStorage.getItem('cartTotals') || '{}');
    if (cartTotals) {
      setTotales({
        subtotal: cartTotals.subtotal || "0.00",
        descuento: parseFloat(cartTotals.descuento) || 0,
        total: cartTotals.total || "0.00",
        cantidadTotal: parseInt(cartTotals.cantidadTotal) || 0
      });
    }
  }, []);

  // Función para validar que solo se ingresen letras
  const soloLetras = (e) => {
    const regex = /^[A-Za-z\s]*$/;
    if (!regex.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
    }
  };

  // Función para validar que solo se ingresen números
  const soloNumeros = (e) => {
    const regex = /^[0-9]*$/;
    if (!regex.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }
  };

  // Función para validar el formulario
  const validarFormulario = (e) => {
    if (e) e.preventDefault();
    let formValido = true;
    const nuevosErrores = {};

    // Validar nombre
    if (nombre.trim() === '') {
      nuevosErrores.nombre = 'El nombre es obligatorio';
      formValido = false;
    }

    // Validar apellido
    if (apellido.trim() === '') {
      nuevosErrores.apellido = 'El apellido es obligatorio';
      formValido = false;
    }

    // Validar ciudad
    if (ciudad.trim() === '') {
      nuevosErrores.ciudad = 'La ciudad es obligatoria';
      formValido = false;
    }

    // Validar departamento
    if (departamento.trim() === '') {
      nuevosErrores.departamento = 'El departamento es obligatorio';
      formValido = false;
    }

    // Validar dirección
    if (direccion.trim() === '') {
      nuevosErrores.direccion = 'La dirección es obligatoria';
      formValido = false;
    }

    // Validar código postal
    if (codigoPostal.trim() === '') {
      nuevosErrores.codigoPostal = 'El código postal es obligatorio';
      formValido = false;
    }

    // Validar teléfono
    if (telefono.trim() === '') {
      nuevosErrores.telefono = 'El teléfono es obligatorio';
      formValido = false;
    } else if (telefono.length !== 9) {
      nuevosErrores.telefono = 'El teléfono debe tener 9 dígitos';
      formValido = false;
    }

    setErrores(nuevosErrores);

    if (formValido) {
      // Guardar información del formulario
      const shippingInfo = {
        nombre,
        apellido,
        ciudad,
        departamento,
        direccion,
        codigoPostal,
        telefono
      };

      // Guardar en localStorage
      localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));

      // Ir a la siguiente página de checkout
      navegacion('/checkout/payment');
    }
  };

  return (
    <>
      <div className="espaciador-header" />
      <section className="contenedorCheckout">
        <div className="formularioCheckout">
          <div className="tituloPrincipal">
            <h1>Dirección de envío</h1>
          </div>
          <div className="formularioScroll">
            <section className="bloquePaso">
              <form className="formEnvio" id="checkoutForm" onSubmit={validarFormulario}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => {
                        soloLetras(e);
                        setNombre(e.target.value);
                      }}
                      placeholder="Ej. Juan"
                    />
                    {errores.nombre && <small className="error-text">{errores.nombre}</small>}
                  </div>

                  <div className="form-group">
                    <label>Apellido</label>
                    <input
                      type="text"
                      value={apellido}
                      onChange={(e) => {
                        soloLetras(e);
                        setApellido(e.target.value);
                      }}
                      placeholder="Ej. Pérez"
                    />
                    {errores.apellido && <small className="error-text">{errores.apellido}</small>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Ciudad</label>
                    <input
                      type="text"
                      value={ciudad}
                      onChange={(e) => {
                        soloLetras(e);
                        setCiudad(e.target.value);
                      }}
                      placeholder="Ej. Lima"
                    />
                    {errores.ciudad && <small className="error-text">{errores.ciudad}</small>}
                  </div>

                  <div className="form-group">
                    <label>Departamento</label>
                    <input
                      type="text"
                      value={departamento}
                      onChange={(e) => {
                        soloLetras(e);
                        setDepartamento(e.target.value);
                      }}
                      placeholder="Ej. Lima"
                    />
                    {errores.departamento && <small className="error-text">{errores.departamento}</small>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Dirección</label>
                  <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Av. Siempre Viva 123"
                  />
                  {errores.direccion && <small className="error-text">{errores.direccion}</small>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Código Postal</label>
                    <input
                      type="text"
                      value={codigoPostal}
                      onChange={(e) => {
                        soloNumeros(e);
                        setCodigoPostal(e.target.value);
                      }}
                      placeholder="Ej. 15001"
                    />
                    {errores.codigoPostal && <small className="error-text">{errores.codigoPostal}</small>}
                  </div>

                  <div className="form-group">
                    <label>Teléfono de contacto</label>
                    <input
                      type="tel"
                      value={telefono}
                      onChange={(e) => {
                        soloNumeros(e);
                        setTelefono(e.target.value);
                      }}
                      placeholder="Ej. 987654321"
                      maxLength="9"
                    />
                    {errores.telefono && <small className="error-text">{errores.telefono}</small>}
                  </div>
                </div>

                <button type="submit" className="btnContinuar">
                  Seleccionar metodo de pago
                </button>
              </form>
            </section>
          </div>
        </div>

        <ResumenLectura />
      </section>
    </>
  );
};

export default Checkout;