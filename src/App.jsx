import { useState, useEffect } from 'react'
import './App.css'

const productosIniciales = [
  { id: 1, nombre: 'Martillo', categoria: 'Herramientas', precio: 150, stock: 20 },
  { id: 2, nombre: 'Taladro eléctrico', categoria: 'Herramientas', precio: 850, stock: 10 },
  { id: 3, nombre: 'Desarmador plano', categoria: 'Herramientas', precio: 65, stock: 30 },
  { id: 4, nombre: 'Desarmador de cruz', categoria: 'Herramientas', precio: 70, stock: 25 },
  { id: 5, nombre: 'Pinzas de presión', categoria: 'Herramientas', precio: 180, stock: 15 },
  { id: 6, nombre: 'Llave inglesa', categoria: 'Herramientas', precio: 220, stock: 12 },
  { id: 7, nombre: 'Sierra manual', categoria: 'Herramientas', precio: 130, stock: 18 },
  { id: 8, nombre: 'Cinta métrica', categoria: 'Herramientas', precio: 90, stock: 25 },
  { id: 9, nombre: 'Nivel de burbuja', categoria: 'Herramientas', precio: 160, stock: 14 },
  { id: 10, nombre: 'Cúter', categoria: 'Herramientas', precio: 45, stock: 40 },

  { id: 11, nombre: 'Cemento gris', categoria: 'Construcción', precio: 230, stock: 50 },
  { id: 12, nombre: 'Yeso', categoria: 'Construcción', precio: 110, stock: 35 },
  { id: 13, nombre: 'Cal', categoria: 'Construcción', precio: 95, stock: 30 },
  { id: 14, nombre: 'Arena (bulto)', categoria: 'Construcción', precio: 75, stock: 40 },
  { id: 15, nombre: 'Ladrillo', categoria: 'Construcción', precio: 12, stock: 200 },

  { id: 16, nombre: 'Tornillos', categoria: 'Tornillería', precio: 50, stock: 100 },
  { id: 17, nombre: 'Clavos', categoria: 'Tornillería', precio: 40, stock: 120 },
  { id: 18, nombre: 'Tuercas', categoria: 'Tornillería', precio: 35, stock: 90 },
  { id: 19, nombre: 'Arandelas', categoria: 'Tornillería', precio: 25, stock: 80 },
  { id: 20, nombre: 'Taquetes', categoria: 'Tornillería', precio: 30, stock: 70 },

  { id: 21, nombre: 'Pintura blanca', categoria: 'Pinturas', precio: 450, stock: 15 },
  { id: 22, nombre: 'Pintura azul', categoria: 'Pinturas', precio: 460, stock: 12 },
  { id: 23, nombre: 'Brocha', categoria: 'Pinturas', precio: 55, stock: 25 },
  { id: 24, nombre: 'Rodillo', categoria: 'Pinturas', precio: 85, stock: 20 },

  { id: 25, nombre: 'Tubo PVC', categoria: 'Plomería', precio: 95, stock: 30 },
  { id: 26, nombre: 'Codo PVC', categoria: 'Plomería', precio: 20, stock: 50 },
  { id: 27, nombre: 'Llave de agua', categoria: 'Plomería', precio: 140, stock: 15 },

  { id: 28, nombre: 'Cable eléctrico', categoria: 'Electricidad', precio: 18, stock: 100 },
  { id: 29, nombre: 'Foco LED', categoria: 'Electricidad', precio: 45, stock: 40 },
  { id: 30, nombre: 'Interruptor', categoria: 'Electricidad', precio: 35, stock: 30 }
]

function App() {
  const [productos, setProductos] = useState(() => {
    try {
      const datos = localStorage.getItem('productos')
      return datos ? JSON.parse(datos) : productosIniciales
    } catch {
      return productosIniciales
    }
  })

  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [editando, setEditando] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos))
  }, [productos])

  function limpiarFormulario() {
    setNombre('')
    setCategoria('')
    setPrecio('')
    setStock('')
    setEditando(null)
  }

  function guardarProducto(e) {
    e.preventDefault()

    if (
      nombre.trim() === '' ||
      categoria.trim() === '' ||
      precio === '' ||
      stock === ''
    ) {
      return
    }

    if (
      !Number.isFinite(Number(precio)) ||
      !Number.isFinite(Number(stock)) ||
      Number(precio) < 0 ||
      Number(stock) < 0
    ) {
      alert('Introduce un precio y un stock válidos.')
      return
    }

    if (editando !== null) {
      setProductos(productos.map(producto =>
        producto.id === editando
          ? {
              ...producto,
              nombre: nombre.trim(),
              categoria: categoria.trim(),
              precio: Number(precio),
              stock: Number(stock)
            }
          : producto
      ))
    } else {
      const nuevoProducto = {
        id: productos.length > 0
          ? Math.max(...productos.map(producto => producto.id)) + 1
          : 1,
        nombre: nombre.trim(),
        categoria: categoria.trim(),
        precio: Number(precio),
        stock: Number(stock)
      }

      setProductos([...productos, nuevoProducto])
    }

    limpiarFormulario()
  }

  function editarProducto(producto) {
    setNombre(producto.nombre)
    setCategoria(producto.categoria)
    setPrecio(String(producto.precio))
    setStock(String(producto.stock))
    setEditando(producto.id)
  }

  function eliminarProducto(id) {
    if (window.confirm('¿Quieres eliminar este producto?')) {
      setProductos(productos.filter(producto => producto.id !== id))

      if (editando === id) {
        limpiarFormulario()
      }
    }
  }

  return (
    <div className="contenedor">
      <h1>Ferretería</h1>
      <p>Sistema de inventario</p>

      <input
      type="text"
      placeholder="Buscar producto..."
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
      />
      <h2>{editando !== null ? 'Editar producto' : 'Agregar producto'}</h2>

      <form onSubmit={guardarProducto}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Categoría"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Precio"
          min="0"
          step="0.01"
          value={precio}
          onChange={e => setPrecio(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Stock"
          min="0"
          step="1"
          value={stock}
          onChange={e => setStock(e.target.value)}
          required
        />

        <button type="submit">
          {editando !== null ? 'Guardar cambios' : 'Agregar producto'}
        </button>

        {editando !== null && (
          <button type="button" onClick={limpiarFormulario}>
            Cancelar
          </button>
        )}
      </form>

      <h2>Productos registrados: {productos.length}</h2>

      <div className="tabla-contenedor">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.filter((producto) =>
            producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            producto.categoria.toLowerCase().includes(busqueda.toLowerCase())
          ).map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>${Number(producto.precio).toFixed(2)}</td>
                <td>{producto.stock}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => editarProducto(producto)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => eliminarProducto(producto.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App