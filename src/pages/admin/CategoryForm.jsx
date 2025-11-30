import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../components/services/api' // Usamos la conexión real

export default function CategoryForm(){
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescription] = useState('')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setMsg('')
    setError('')

    if(!nombre.trim()){ 
      setError('El nombre es obligatorio'); 
      return 
    }

    try {
      // Enviamos al Backend Real
      await api.post('/categorias', {
        nombre: nombre.trim(),
        descripcion: descripcion.trim()
        // Nota: Tu backend actual no guarda imagenUrl ni productos todavía.
      })

      setMsg('Categoría registrada ✅')
      setTimeout(() => nav('/admin/categories'), 1000)

    } catch (err) {
      console.error(err)
      if (err.response && err.response.status === 409) {
        setError("Error: Ya existe una categoría con ese nombre")
      } else {
        setError("Error al guardar en el servidor")
      }
    }
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:760, margin:'0 auto'}}>
        <h2 className="h2">Nueva categoría</h2>
        <form onSubmit={handleSubmit} style={{display:'grid', gap:14}}>
          
          <div>
            <label>Nombre</label>
            <input 
              className="input" 
              value={nombre} 
              onChange={e => setNombre(e.target.value)} 
              placeholder="Ej: Videojuegos, Consolas..."
            />
          </div>

          <div>
            <label>Descripción</label>
            <textarea 
              className="textarea" 
              value={descripcion} 
              onChange={e => setDescription(e.target.value)} 
              placeholder="Descripción de la categoría..."
            />
          </div>

          <div className="actions">
            <button type="button" className="btn outline" onClick={() => nav('/admin/categories')}>
              Cancelar
            </button>
            <button className="btn">Crear categoría</button>
          </div>
        </form>

        {msg && <p className="success" style={{marginTop:10, color:'green'}}>{msg}</p>}
        {error && <p className="error" style={{marginTop:10, color:'red'}}>{error}</p>}
      </div>
    </div>
  )
}