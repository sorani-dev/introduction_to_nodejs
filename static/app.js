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

const populateProducts = async (category) => {
	const products = document.querySelector('#products' )
	// console.log(products)
	// console.log("fetch")
	// console.log(category === undefined)
	const url = category === null || typeof category === 'undefined' ? API : `${API}/${category}` 
	// console.log(`${API}/${category}`)
	console.log(url)
	products.innerHTML = ''
	try {
		// console.log('before fetch')
		const res = await fetch(url)
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
document.querySelector('#fetch').addEventListener('click', async () => {   await populateProducts() })*/
const category = document.querySelector('#category')
category.addEventListener('input', async ({ target }) => {
	/*if (target.value === '') {
		return false
	}*/
	// await populateAllProducts(target.value)
	await populateProducts(target.value) })
	
customElements.define('product-item', class Item extends HTMLElement {   constructor() {     super()     const itemTmpl = document.querySelector('#item').content     this.attachShadow({mode: 'open'}).appendChild(itemTmpl.cloneNode(true))   } })

