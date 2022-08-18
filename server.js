'use strict' const { createServer } = require('http')

// if (process.env.NODE_ENV !== 'production') {
require('dotenv').config({ override:true })
// }

// Declare constants
// Categories
const ELECTRONICS = 'electronics'
const CONFECTIONERY = 'confectionery'

// The port to listen on
const PORT = process.env.PORT || 3000

// console.log(process.env)

// Declare variables
// Initial data
const data = {   [ELECTRONICS]: [
    {id: 'A1', name: 'Vacuum Cleaner', rrp: '99.99', info: 'The suckiest vacuum in the world.'},     {id: 'A2', name: 'Leaf Blower', rrp: '303.33', info: 'This product will blow your socks off.'},
  ],
  [CONFECTIONERY]: [     {id: 'B1', name: 'Chocolate Bar', rrp: '22.40', info: 'Delicious overpriced chocolate.'}
  ], }

// Categories and their prefix
const catToPrefix = {
  [ELECTRONICS]: 'A',
  [CONFECTIONERY]: 'B'
}

/**
* Generate a prefixed ID
*
* @param {String} idPrefix. Prefix to add to the ID
* @param {Array|Object} data. the data to get the last ID in the data Array/object
*
* @returns {String}. the prefixed ID
*/
const calculateID = (idPrefix, data) => {
  const sorted = [...(new Set(data.map(({id}) => id)))]
  const next = Number(sorted.pop().slice(1)) + 1
  return `${idPrefix}${next}`
}

/**
* Parse the request body and do actions on it with a callback
*
* @param {Request} req. the current request object
* @param {callable} cb. the callback used after the body has been parsed
*
* @returns {String} the result of the parsed body passed to a callback
*/
const getPostData = (req, cb) => {
  let postData = ''
  
  req.on('data', chunk => {
    postData += chunk
  })
  
  req.on('end', () => {

    console.log('getPostData', postData)
    return cb(postData)
  });
}

/**
* Add the posted data sent to the server to the data object
*
* @param {String} postData. the POST data from the Request body
* @param {String} category. the data category to add to

* @returns {Object} data. the data with added new POSTed Item
*/
const addData = (postData, category)  => {
  const idPrefix = catToPrefix[category]
  const id = calculateID(idPrefix, data[category])
  const newItem = JSON.parse(postData)
  newItem.id = id
  data[category].push(newItem)
  return data
}

/**
* Node HTTP Server creation
*/
const server = createServer((req, res) => {
  let error = false

  const currentUrl = req.url
  // route without prefix by /
  const currentRoute = req.url.slice(1)
  const routeExists = Object.keys(data).includes(currentRoute)
  console.log('currentRoute', currentRoute)
  console.log(data, Object.keys(data), routeExists)
  
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')   res.setHeader('Content-Type', 'application/json')

  // GET urls
  if (req.method === 'GET') {
    if (req.url === '/') {
       console.log(JSON.stringify(data))
       res.end(JSON.stringify(data))
    } else if (routeExists) {
      const newData = data[currentRoute]
      console.log(newData)
      console.log(JSON.stringify(newData))
      res.end(JSON.stringify(newData))
    } else {
      error = true
    }
  // POST urls
  } else if (req.method === 'POST' && routeExists) {
    console.log("request is POST")
    getPostData(req, (postData) => {
      const newData = addData(postData, currentRoute)
      console.log(newData)
      console.log(JSON.stringify(newData))
      res.end(JSON.stringify(newData))
    })
  } else {
    error = true
  }
  
  // No route found
  if (error) {
    res.statusCode = 404
    res.end(JSON.stringify({errors: { status: 404, title: 'Resource not found', detail: 'Could not find a matching route or the required resource for the given url. Please check the spelling or it may no exist anymore.'}}))
  } })

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})
