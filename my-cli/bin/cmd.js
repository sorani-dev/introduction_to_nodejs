#!/usr/bin/env node

const got = require('got')
const minimist = require('minimist')
const commist = require('commist')

// Declare variables
const API = 'http://localhost:3000'
const categories = ['confectionery', 'electronics']

// CLI usage
const usage = (msg = 'Back office for My App') => {
  console.log(`\n${msg}\n\n`,
     'add:\n',
     '  order: my-cli add order <id> --amount=<int> --api=<string>\n',
     '         my-cli add order <id> -n=<int> --api=<string>\n\n',
     'list:\n',
     '  cats:  my-cli list cats\n',
     '  ids:   my-cli list ids --cat=<string> --api=<string>\n',
     '  ids:   my-cli list ids -c=<string> --api=<string>\n'
  )
}

// Get the args
const noMatches = commist()
  .register('add order', addOrder)
  .register('list cats', listCats)
  .register('list ids', listIds)
  .parse(process.argv.slice(2))
if (noMatches) {
  usage()
  process.exit(1)
}

const argv = process.argv.slice(2)
const args = minimist(argv, {
  alias: { amount: 'n' },
  string: ['api'],
  default: { api: API }
})

/**
* Remove empty elements from the args._ array
* Code from https://bobbyhadz.com/blog/javascript-remove-empty-elements-from-array
* @param {Array} args. The array to filter
* @returns {Array} The filtered array.
*/
function getFilteredArgs(args) {
  return args.filter(element => (
    element !== null &&
    element !== undefined &&
    element !== '' &&
    !Number.isNaN(element)
  ))
}

args._ = getFilteredArgs(args._)

/**
* Add an order to a given category
* @async
* @param {string[]} argv. Command line arguments
*/
async function addOrder (argv) {
  const args = minimist(argv, {
    alias: { amount: 'n' },
    string: ['api'],
    default: { api: API }
  })
  if (args._.length < 1) {
    usage()
    process.exit(1)
  }

  const [ id ] = args._
  const { amount, api } = args

  if (Number.isInteger(amount) === false) {
    usage('Error: --amount flag is required and must be an integer')
    process.exit(1)
  }

  try {
    await got.post(`${api}/orders/${id}`, {
      json: { amount }
    })
    console.log(`${amount} has been added to ${id}`)
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

/**
* List categories
*/
function listCats () {
  console.log('\nCategories:\n')
  for (const cat of categories) console.log(cat)
  console.log()
}

/**
* Lists ids for a given category
* @async
* @param {string[]} argv. Command line arguments
*/
async function listIds (argv) {
  const args = minimist(argv, {
    alias: { cat: 'c' },
    string: ['cat', 'api'],
    default: { api: API }
  })

  const { cat, api } = args
  if (!cat) {
    usage('Error: --cat flag is required')
    process.exit(1)
  }

  try {
    console.log(`\nCategory: ${cat}\n`, ' IDs:\n')
    const products = await got(`${api}/${cat}`).json()
    for (const { id } of products) {
      console.log(`     ${id}`)
    }
    console.log()
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }

}


