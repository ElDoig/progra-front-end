import { useState, useEffect } from 'react'
import './FormularioProducto.css'

const FormularioProducto = ({ categorias = [], onGuardar, productoEditar, onCerrar }) => {
    const [form, setForm] = useState({
        titulo: '',
        presentacion: '',
        descripcion: '',
        categoria: '',
        stock: 0,
        img: '',
        precio: 0
    })

    useEffect(() => {
        if (productoEditar) {
            setForm({ ...productoEditar })
        } else {
            setForm({
                titulo: '',
                presentacion: '',
                descripcion: '',
                categoria: categorias[1] || '',
                stock: 0,
                img: '',
                precio: 0
            })
        }
    }, [productoEditar, categorias])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: (name === 'stock' || name === 'precio') ? Number(value) : value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.titulo || !form.descripcion || !form.presentacion || !form.categoria || !form.img) {
            alert('Completa los campos requeridos: nombre, descripción, marca/presentación, categoría e imagen (URL).')
            return
        }
        onGuardar(form)
    }

    return (
        <div className="form-modal-bg">
            <div className="form-modal">
                <h2>{productoEditar ? 'Editar producto' : 'Agregar producto'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div>
                            <label>Nombre</label>
                            <input name="titulo" type="text" value={form.titulo} onChange={handleChange} required />

                            <label>Marca / Presentación</label>
                            <input name="presentacion" type="text" value={form.presentacion} onChange={handleChange} required />

                            <label>Descripción</label>
                            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required />

                            <label>Categoría</label>
                            <select name="categoria" value={form.categoria} onChange={handleChange} required>
                                {categorias.length > 0 ? categorias.map(c => <option key={c} value={c}>{c}</option>) : <option value="">--Seleccionar--</option>}
                            </select>
                        </div>

                        <div>
                            <label>Stock</label>
                            <input name="stock" type="number" value={form.stock} onChange={handleChange} min="0" required />

                            <label>Precio</label>
                            <input name="precio" type="number" value={form.precio} onChange={handleChange} min="0" step="0.01" required />

                            <label>Imagen (URL)</label>
                            <input name="img" type="text" value={form.img} onChange={handleChange} required />

                            <div style={{ marginTop: 12 }}>
                                <button className="btn-submit" type="submit">{productoEditar ? 'Actualizar' : 'Crear'}</button>
                                <button type="button" className="btn-cancel" onClick={onCerrar} style={{ marginLeft: 8 }}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormularioProducto
