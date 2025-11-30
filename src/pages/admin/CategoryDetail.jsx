import { useParams } from 'react-router-dom'
import { getCategoryById } from '../../mockApi'

export default function CategoryDetail(){
  const { id } = useParams()
  const cat = getCategoryById(id)
  if(!cat) return <div className="container"><div className="card">No existe la categoría.</div></div>

  return (
    <div className="container">
      <div className="card">
        <h2 className="h2">Detalle de categoría #{cat.id}</h2>
        <div className="grid-2">
          <div>
            <p><b>Nombre:</b> {cat.name}</p>
            <p className="muted">{cat.description}</p>
            <h4>Productos en la categoría</h4>
            <ul>
              {(cat.productIds||[]).map(pid => <li key={pid}>Producto #{pid}</li>)}
            </ul>
          </div>
          <div className="center">
            {cat.imageUrl
              ? <img src={cat.imageUrl} alt={cat.name} style={{maxWidth:240,borderRadius:12,border:'1px solid var(--border)'}}/>
              : <div className="avatar"></div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
