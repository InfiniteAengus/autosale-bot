const config = require('./config')
const Web3 = require('web3')

const web3 = new Web3(config.web3.provider)

module.exports = web3