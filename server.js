'use strict' const { createServer } = require('http')
const data = [   {id: 'A1', name: 'Vacuum Cleaner', rrp: '99.99', info: 'The suckiest vacuum in the world.'},   {id: 'A2', name: 'Leaf Blower', rrp: '303.33', info: 'This product will blow your socks off.'},   {id: 'B1', name: 'Chocolate Bar', rrp: '22.40', info: 'Delicious overpriced chocolate.'} ]

const server = createServer((req, res) => {
  console.log(req.url)
  let error = false
  res.setHeader('Access-Control-Allow-Origin', '*')   res.setHeader('Content-Type', 'application/json')

  if (req.method === 'GET') {
    if (req.url === '/') {
      console.log(JSON.stringify(data))
       res.end(JSON.stringify(data))
    } else if (req.url === '/electronics') {
      const newData = [data[0], data[1]]
      console.log(newData)
      console.log(JSON.stringify(newData))
      res.end(JSON.stringify(newData))
    } else if (req.url === '/confectionery') {
      const newData = [data[2]]
      res.end(JSON.stringify(newData))
    } else {
      error = true
    }
  } else {
    error = true
  }
  
  if (error) {
    res.statusCode = 404
    res.end(JSON.stringify({error: true, message: 'not Found'}))
  } })

server.listen(3000)
