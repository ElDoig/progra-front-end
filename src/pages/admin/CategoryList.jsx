import { useEffect, useState } from 'react'
import api from '../../components/services/api' // Usamos la conexión real

export default function CategoryList(){
  const [q, setQ] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarCategorias()
  }, [])

  const cargarCategorias = async () => {
    try {
      const response = await api.get('/categorias')
      setData(response.data)
    } catch (error) {
      console.error("Error cargando categorías:", error)
    } finally {
      setLoading(false)
    }
  }

  // Filtramos localmente por búsqueda
  const filteredData = data.filter(c => 
    c.nombre.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div className="container">
      <div className="card">
        <h2 className="h2">Listado de categorías</h2>
        <div className="search" style={{maxWidth:'420px', margin:'10px 0 14px 0'}}>
          <input 
            placeholder="Buscar categoría..." 
            value={q} 
            onChange={e => setQ(e.target.value)} 
          />
          <span>🔎</span>
        </div>

        {loading ? <p>Cargando...</p> : (
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                {/* <th>ID</th>  Opcional: Ver el ID real */}
                <th style={{width:140, textAlign:'center'}}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(c => (
                <tr key={c.id}>
                  {/* OJO: Usamos 'nombre' y 'descripcion' (como en BD) */}
                  <td><b>{c.nombre}</b></td>
                  <td className="muted">{c.descripcion || "Sin descripción"}</td>
                  <td>
                    <div className="row-actions" style={{justifyContent:'center'}}>
                      <a className="view" href={`/admin/categories/${c.id}`}>👁️ Ver</a>
                      {/* Botones de editar/borrar desactivados por ahora */}
                      <a className="edit" href="#" onClick={(e)=>e.preventDefault()}>✏️</a>
                      <a className="trash" href="#" onClick={(e)=>e.preventDefault()}>🗑️</a>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr><td colSpan={3} className="muted">Sin resultados</td></tr>
              )}
            </tbody>
          </table>
        )}

        <div className="pagination">
          {/* Paginación visual por ahora */}
          <div className="page active">1</div>
        </div>
      </div>
    </div>
  )
}