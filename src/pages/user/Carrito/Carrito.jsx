import './Carrito.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imgJuego from '../../../assets/juego.webp';// new
import imgVaporeon from '../../../assets/Vaporeon.jpg';// new  
import imgcajaPokemon from '../../../assets/cajaPokemon.jpg'; // new
import imgAudifonos from '../../../assets/Audifonos.jpg'; // new
import ResumenLectura from '../../../components/ResumenLectura/ResumenLectura';

const initialProducts = [
    {
        id: 1,
        name: "Battlefield 6 Phantom Edition - PlayStation 5",
        description: "Videojuego para PlayStation 5",
        price: 199.00,
        quantity: 2,
        image: imgJuego,
        selected: true
    },
    {
        id: 2,
        name: "Jazware Pokemon Vaporeon 18-in Sleeping Plush",
        description: "Coleccioanable",
        price: 150.00,
        quantity: 1,
        image: imgVaporeon,
        selected: true
    },
    {
        id: 3,
        name: "Pokemon Trading Card Game: Scarlet and Violet Night Wander",
        description: "Coleccionable",
        price: 300.00,
        quantity: 2,
        image: imgcajaPokemon,
        selected: true
    },
    {
        id: 4,
        name: "Sony PULSE 3D Wireless Headset for PlayStation 5",
        description: "Periferico",
        price: 200.00,
        quantity: 2,
        image: imgAudifonos,
        selected: true
    }
];

const Carrito = () => {
    const navigate = useNavigate();
    const [productos, setProductos] = useState(initialProducts);

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                if (Array.isArray(parsedCart) && parsedCart.length > 0) {
                    setProductos(parsedCart);
                } else {
                    setProductos(initialProducts);
                    localStorage.setItem('cart', JSON.stringify(initialProducts));
                }
            } else {
                setProductos(initialProducts);
                localStorage.setItem('cart', JSON.stringify(initialProducts));
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            setProductos(initialProducts);
            localStorage.setItem('cart', JSON.stringify(initialProducts));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(productos));
    }, [productos]);

    const cambiarSeleccion = (id) => {
        setProductos(productos.map(producto => 
            producto.id === id 
                ? {...producto, selected: !producto.selected}
                : producto
        ));
    };

    const cambiarCantidad = (id, incrementar) => {
        setProductos(productos.map(producto => {
            if (producto.id === id) {
                const nuevaCantidad = incrementar 
                    ? producto.quantity + 1 
                    : Math.max(1, producto.quantity - 1);
                return {...producto, quantity: nuevaCantidad};
            }
            return producto;
        }));
    };

    const eliminarProducto = (id) => {
        setProductos(productos.filter(producto => producto.id !== id));
    };

    return (
        <>
            <div className="main-content">
                <main className="carritoContainer">
                    <div className="productosSection">
                        <h2><strong>Carro</strong> ({productos.filter(p => p.selected).reduce((sum, p) => sum + p.quantity, 0)} productos)</h2>
                        <div className="cajaScroll">
                            {productos.map((producto) => (
                                <div className="productoItem" key={producto.id}>
                                    <input 
                                        type="checkbox" 
                                        checked={producto.selected} 
                                        onChange={() => cambiarSeleccion(producto.id)}
                                    />
                                    <img src={producto.image} alt={producto.name}/>
                                    <div className="infoItem">
                                        <h3>{producto.name}</h3>
                                        <p>{producto.description}</p>
                                        <p className="envio">Llega mañana</p>
                                    </div>

                                    <div className="columnaDerecha">
                                        <div className="precio">S/{(producto.price * producto.quantity).toFixed(2)}</div>
                                        <div className="cantidadControl">
                                            <label>Cantidad:</label>
                                            <button onClick={() => cambiarCantidad(producto.id, false)}>-</button>
                                            <span>{producto.quantity}</span>
                                            <button onClick={() => cambiarCantidad(producto.id, true)}>+</button>
                                            <button className="eliminar" onClick={() => eliminarProducto(producto.id)}>🗑</button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                    <ResumenLectura />
                </main>
            </div>
        </>
    );
};

export default Carrito;