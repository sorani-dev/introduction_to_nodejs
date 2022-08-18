#!/usr/bin/env node

const got = require('got')

const API = 'http://localhost:3000'

const usage = (msg = 'Back office for My App') => {   console.log(`\n${msg}\n`, ' usage: my-cli <id> <amount>') }

const argv = process.argv.slice(2)
if (argv.length < 2) {
  usage()
  process.exit(1)
}
const [ id, amt ] = argv
const amount = Number(amt)
console.log(argv, id, amt, amount)
if (Number.isInteger(amount) === false) {
  usage('Error: amount must be an integer')
  process.exit(1)
}

(async() => {

  try {
    const url = `${API}/orders/${id}`
		console.log(url)
    await got.post(url, {
      json: { amount }
    })
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
})()