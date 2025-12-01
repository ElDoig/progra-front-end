import { useParams, useNavigate } from 'react-router-dom';
// Asegúrate de que esta ruta sea correcta: ejemplo para dos niveles atrás (../../)
import { getOrderById, cancelOrder } from './OrderService'; 

export default function OrderDetail(){
  const { orderId } = useParams()
  const nav = useNavigate()
  
  // 🚨 Nota: Si getOrderById es asíncrona, deberías usar useState/useEffect/tanstack-query, 
  // pero para este ejemplo, seguimos el patrón síncrono que usaste.
  const order = getOrderById(orderId) 

  if(!order) return <div className="container"><div className="card">No se encontró la orden.</div></div>

  function doCancel(){
      if(confirm('¿Cancelar la orden?')){ 
          // Llama a la API de cancelación
          cancelOrder(order.id); 
          alert('Orden cancelada'); 
          
          // Redirige al listado de órdenes
          nav('/user/orders', { replace: true }); 
      }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="orderHead">
          <h2 className="h2">Orden <span style={{color:'var(--green)'}}>#{order.id}</span></h2>
          <div className="spacer"></div>
          <div className="right">
            <div>Estado: <span className="badge">{order.status}</span></div>
            <div className="muted" style={{marginTop:6}}>
  Monto total: 
  <b>
    {/* 1. ✅ Encadenamiento opcional para totals y total */}
    S/ {order.totals?.total?.toFixed(2) || '0.00'}
  </b>
</div>
          </div>
        </div>

        <h3 style={{marginTop:10}}>Productos ordenados</h3>
        <table className="table">
          <thead>
            <tr><th>Nombre</th><th>Categoría</th><th>Cantidad</th><th>Total</th></tr>
          </thead>
          <tbody>
            {/* 2. ✅ Valor por defecto de array vacío para items */}
            {(order.items || []).map((it, i) => (
              <tr key={i}>
                <td>{it.name}</td>
                <td className="muted">—</td>
                <td>{it.qty}</td>
                <td>S/ {(it.qty * it.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <div className="page">‹</div><div className="page active">1</div><div className="page">2</div><div className="page">…</div><div className="page">10</div><div className="page">›</div>
        </div>

        <div style={{display:'flex', gap:22, marginTop:14}}>
          {/* 🚨 3. ✅ ELIMINAMOS EL DIV DUPLICADO Y CORREGIMOS EL ACCESO A DATOS 🚨 */}
          <div className="card" style={{flex:1}}>
            <h4>Envío</h4>
            
            {/* 3a. Usamos ?. en todas las propiedades de shippingAddress */}
            <p>{order.shippingAddress?.name || 'Nombre no disponible'}</p> 
            
            <p className="muted">
              {order.shippingAddress?.address || 'Dirección no disponible'} – {order.shippingAddress?.city || 'Ciudad no disponible'}
            </p>
          </div>
          
          <div className="card" style={{flex:1}}>
            <h4>Pago</h4>
            {/* 4. ✅ Encadenamiento opcional para paymentMethod */}
            <p>Método: {order.paymentMethod || 'No especificado'}</p>
          </div>
        </div>

        <div className="actions" style={{marginTop:14}}>
          <button className="btn outline" onClick={doCancel}>Cancelar orden</button>
        </div>
      </div>
    </div>
  )
}