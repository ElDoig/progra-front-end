// LocalStorage como "BD" simple
const KEYS = {
    categories: 'categories',
    orders: 'orders',
    user: 'mock_user',
    products: 'products',
  }
  
  const read  = (k) => JSON.parse(localStorage.getItem(k) || 'null')
  const write = (k, v) => localStorage.setItem(k, JSON.stringify(v))
  
  function initOnce(){
    if(!localStorage.getItem(KEYS.categories)){
      write(KEYS.categories, [
        { id:1, name:'Pociones', description:'Elixires y pociones', imageUrl:'', productIds:[1] },
        { id:2, name:'Armas Encantadas', description:'Espadas, arcos, etc.', imageUrl:'', productIds:[7,9] },
      ])
    }
    if(!localStorage.getItem(KEYS.orders)){
      write(KEYS.orders, [
        {
          id:1001,
          date:'2025-10-01',
          status:'Procesando',
          items:[
            {productId:1, name:'Poción de Curación', qty:2, price:25},
            {productId:7, name:'Espada Lunar', qty:1, price:120},
          ],
          totals:{subtotal:170, shipping:10, total:180},
          shippingAddress:{name:'Santiago', address:'Av. Siempre Viva 123', city:'Lima'},
          paymentMethod:'Tarjeta',
        }
      ])
    }
    if (!localStorage.getItem(KEYS.users)) {
    write(KEYS.users, [
      {
        id: 1,
        role: 'admin',
        name: 'Santiago',
        lastName: 'Pérez',
        email: 'santiago@example.com',
        password: '123456',
      },
      {
        id: 2,
        role: 'user',
        name: 'Carlos',
        lastName: 'Doig',
        email: 'carlos@example.com',
        password: '123456',
      }
    ])
  }
    
    
    if(!localStorage.getItem(KEYS.products)){
      write(KEYS.products, [
        {id:1, name:'Poción de Curación'},
        {id:7, name:'Espada Lunar'},
        {id:9, name:'Arco Élfico'},
      ])
    }
  }
  initOnce()
  
  // Categorías
  export function getCategories({q=''}={}) {
    const all = read(KEYS.categories) || []
    if(!q) return all
    const t = q.toLowerCase()
    return all.filter(c =>
      String(c.id).includes(t) ||
      c.name.toLowerCase().includes(t) ||
      (c.description||'').toLowerCase().includes(t)
    )
  }
  export function getCategoryById(id){
    const all = read(KEYS.categories) || []
    return all.find(c => String(c.id)===String(id)) || null
  }
  export function addCategory(data){
    const all = read(KEYS.categories) || []
    const nextId = all.length ? Math.max(...all.map(c=>c.id))+1 : 1
    const toSave = { id:nextId, imageUrl:'', productIds:[], ...data }
    write(KEYS.categories, [...all, toSave])
    return toSave
  }
  
  // Órdenes
  export function getOrderById(id){
    const all = read(KEYS.orders) || []
    return all.find(o => String(o.id)===String(id)) || null
  }
  export function cancelOrder(id){
    const all = read(KEYS.orders) || []
    const idx = all.findIndex(o => String(o.id)===String(id))
    if(idx<0) return {ok:false}
    all[idx] = { ...all[idx], status:'Cancelada' }
    write(KEYS.orders, all)
    return {ok:true}
  }
  
  // Usuario
  export function getCurrentUser(){ return read(KEYS.user) }
  export function updateCurrentUser(patch){
    const curr = read(KEYS.user) || {}
    const next = { ...curr, ...patch }
    write(KEYS.user, next)
    return next
  }
  export function getUserByCredentials(username, password) {
  const users = [
    {
      id: 1,
      role: 'admin',
      name: 'Santiago',
      lastName: 'Pérez',
      email: 'santiago@example.com',
      password: '123456',
    },
    {
      id: 2,
      role: 'user',
      name: 'Carlos',
      lastName: 'Doig',
      email: 'carlos@example.com',
      password: '123456',
    },
  ];
  const user = users.find(u => u.name === username && u.password === password) || null;
  if (user) {
    localStorage.setItem("mock_user", JSON.stringify(user)); 
  }
  return user;

  return users.find(u => u.name === username && u.password === password) || null;
}

  export function changePassword(oldPwd, newPwd){
    const curr = read(KEYS.user)
    if(!curr) throw new Error('No existe usuario')
    if(curr.password !== oldPwd) return {ok:false, msg:'Password actual incorrecta'}
    curr.password = newPwd
    write(KEYS.user, curr)
    return {ok:true}
  }
  
  // Productos
  export function getProducts(){ return read(KEYS.products) || [] }
  