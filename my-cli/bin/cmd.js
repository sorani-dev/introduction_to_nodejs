#!/usr/bin/env node

const got = require('got')
const minimist = require('minimist')

const API = 'http://localhost:3000'

const usage = (msg = 'Back office for My App') => {
  console.log(`\n${msg}\n`,
    '     usage: my-cli <id> --amount=<int> --api=<string>\n',
    '            my-cli <id> -n=<int> --api=<string>\n')
}

const argv = process.argv.slice(2)
const args = minimist(argv, {
  alias: { amount: 'n' },
  string: ['api'],
  default: { api: API }
})

if (args._.length < 1) {
  usage()
  process.exit(1)
}
console.log(args)
// Remove empty elements from the args._ array
// Code from https://bobbyhadz.com/blog/javascript-remove-empty-elements-from-array
args._ = args._.filter(element => (
    element !== null &&
    element !== undefined &&
    element !== '' &&
    !Number.isNaN(element)
))
console.log(args)
const [ id ] = args._
const { amount, api } = args
console.log("!", id, amount, api)
if (Number.isInteger(amount) === false) {
  usage('Error: --amount flag is required and must be an integer')
  process.exit(1)
}

(async() => {

  try {
    const url = `${api}/orders/${id}`
	  console.log(url)
	console.log(amount)
    await got.post(url, {
      json: { amount }
    })
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }

})()