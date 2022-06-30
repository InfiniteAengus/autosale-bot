const config = require('../config/config')
const web3 = require('../config/web3')

module.exports.sendValue = async (addrFrom, addrTo, amount, privateKey) => {
    const transaction = {
        from: addrFrom,
        to: addrTo,
        value: web3.utils.toWei(amount.toString(), 'ether'),
        gas: '2100000',
    }

    const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey)

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)

    console.log(`${config.web3.scan}${receipt.transactionHash}`)
}

module.exports.callContractFunction = async (addrFrom, addrTo, data, privateKey) => {
    const transaction = {
        from: addrFrom,
        to: addrTo,
        value: '0',
        gas: '2100000',
        data: data,
    }

    const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey)
    console.log("sdf")
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)

    console.log(`${config.web3.scan}${receipt.transactionHash}`)
}