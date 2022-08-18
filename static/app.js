const API = 'http://localhost:3000'
const populateAllProducts = async (category = null) => {
  const products = document.querySelector('#products')
  const url = category === null ? API : `${API}/${category}`

  products.innerHTML = ''
  const res = await fetch(url)
  const data = await res.json()
  for (const product of data) {
    const item = document.createElement('product-item')
    // console.log("product", product)
    for (const key of ['name', 'rrp', 'info']) {
       // console.log(key, product[key])
      const span = document.createElement('span')
      span.slot = key
      span.textContent = product[key]
      item.appendChild(span)
    }
    products.appendChild(item)
  }
}

const populateProducts = async (category= null, method = 'GET', payload = {name: '', rrp: '', info: ''}) => {
  const products = document.querySelector('#products' )
  // console.log(products)
  // console.log("fetch")
  // console.log(category === undefined)
  const url = category === null || typeof category === 'undefined' ? API : `${API}/${category}` 
  // console.log(`${API}/${category}`)
  // console.log(url)
  products.innerHTML = ''
  
  try {
    // sending METHOD
    const send = method === 'GET' ? {} : {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', 
        mode: 'cors'
      },
      body: JSON.stringify(payload)     }
    // console.log('method', method, 'payload', payload, 'send', send, { method, ...send }) 
    // console.log('before fetch')
    const res = await fetch(url, { method, ...send })
    // console.log('after fetch')
    // console.log("res", await res)
    const data = await res.json()
    // console.log(data)

    for (const product of data) {
      const item = document.createElement('product-item')
      for (const key of ['name', 'rrp', 'info']) {
      	const span = document.createElement('span')
      	span.slot = key
      	span.textContent = product[key]
      	item.appendChild(span)
      }
      products.appendChild(item)
    }
  } catch (err) {
    console.error(err.message)
    console.error(err.name)
    console.error(err, err.toString())
    return false
  }
} 

/*
document.querySelector('#fetch').addEventListener('click', async () => {    await populateProducts() })*/
const category = document.querySelector('#category')
const add = document.querySelector('#add')
category.addEventListener('input', async ({ target }) => {
  /*if (target.value === '') {
    return false
  }*/
  // await populateAllProducts(target.value)
  add.style.display = 'block'
  await populateProducts(target.value) })

// add product
add.addEventListener('submit', async (e) => {
  e.preventDefault()
  const { target } = e
  const payload = {
    name: target.name.value,
    rrp: target.rrp.value,
  info: target.info.value
  }
  await populateProducts(category.value, 'POST', payload)
  target.reset() })

customElements.define('product-item', class Item extends HTMLElement {   constructor() {     super()     const itemTmpl = document.querySelector('#item').content     this.attachShadow({mode: 'open'}).appendChild(itemTmpl.cloneNode(true))   } })

