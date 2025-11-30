import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ResumenLectura.css';

const ResumenLectura = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isCartPage = location.pathname === '/carrito';
    
    const [totals, setTotals] = useState({
        subtotal: "0.00",
        descuento: "0.00",
        total: "0.00",
        cantidadTotal: 0
    });

    const calculateTotals = () => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            console.log('ResumenLectura - Cart from localStorage:', cart);
            
            const selectedItems = cart.filter(item => item.selected);
            console.log('ResumenLectura - Selected items:', selectedItems);
            
            const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const discount = subtotal * 0.1;
            const total = subtotal - discount;
            const cantidadTotal = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

            const newTotals = {
                subtotal: subtotal.toFixed(2),
                descuento: discount.toFixed(2),
                total: total.toFixed(2),
                cantidadTotal
            };

            console.log('ResumenLectura - New totals:', newTotals);
            setTotals(newTotals);
            localStorage.setItem('cartTotals', JSON.stringify(newTotals));
        } catch (error) {
            console.error('ResumenLectura - Error calculating totals:', error);
        }
    };

    // Calcular totales al montar el componente
    useEffect(() => {
        console.log('ResumenLectura - Component mounted');
        calculateTotals();
    }, []);

    // Escuchar cambios en el carrito
    useEffect(() => {
        console.log('ResumenLectura - Setting up listeners');
        
        const handleStorageChange = (e) => {
            console.log('ResumenLectura - Storage event:', e.key);
            if (e.key === 'cart') {
                calculateTotals();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        
        // Verificar cambios cada 100ms
        const interval = setInterval(() => {
            const currentCart = localStorage.getItem('cart');
            if (currentCart !== lastCartRef.current) {
                console.log('ResumenLectura - Cart changed in interval');
                lastCartRef.current = currentCart;
                calculateTotals();
            }
        }, 100);

        return () => {
            console.log('ResumenLectura - Cleaning up listeners');
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="resumenCompra">
            <h3>Resumen de compra</h3>
            <p>Productos ({totals.cantidadTotal}) <span>S/ {totals.subtotal}</span></p>
            <p>Delivery <span className="gratis">GRATIS</span></p>
            <p>Descuentos <span className="descuento">-S/ {totals.descuento}</span></p>
            <hr />
            <p className="total">Total <span>S/ {totals.total}</span></p>
            {isCartPage && (
                <div>
                    <button 
                        className="btnContinuar" 
                        onClick={() => navigate('/checkout')}
                    >
                        Continuar compra
                    </button>
                    <button
                        className="btnCancelar"
                        onClick={() => navigate('/')}
                    >
                        Cancelar compra
                    </button>
                    <button
                        className="btnGuardar"
                        onClick={() => alert('Compra guardada para despues')}
                    >
                        Guardar para después
                    </button>
                </div>
                
            )}
        </div>
    );
};

// Referencia para comparar cambios en el carrito
const lastCartRef = { current: null };

export default ResumenLectura;
