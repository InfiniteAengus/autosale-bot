const config = require('./config/config')
const web3Utils = require('./utils/Web3Utils')
const web3 = require('./config/web3')
const app = require('express')()
const sheets = require('./utils/GoogleSheets')

let onProcess = 0;
let onStart = 0;

const usdcAbi = require('./config/USDC.json')
const nftAbi = require('./config/contract.json')
const { c } = require('tar')

const coinContract = new web3.eth.Contract(usdcAbi, config.web3.usdcAddress, {
    from: config.wallet.myAddress
})
const nftContract = new web3.eth.Contract(nftAbi, config.contractAddress, {
    from: config.wallet.myAddress
})

const checkSale = async () => {
    if(onProcess) return
    onprogress = 1;

    console.log(sheets.memberList)

    if(sheets.memberList[0] == '1') return;

    let tokenId = sheets.memberList.length
    
    let owner = await nftContract.methods.ownerOf(parseInt(tokenId + 1)).call()
    
    console.log('---', owner)

    if(owner == config.wallet.myAddress) {
        onprogress = 0
        return
    }
    await GiveReward(owner)

    onprogress = 0;

    if(onStart == 0) {
        onStart = 1;
    }
}

const GiveReward = async (recipient) => {
    let i;
    for(i = 0; i < sheets.memberList.length; i ++) {
        console.log(web3.utils.toWei("" + config.app.rpm))

        const data = coinContract.methods.transfer(
            recipient,
            web3.utils.toHex(web3.utils.toWei("" + config.app.rpm))
        ).encodeABI()

        web3Utils.callContractFunction(config.wallet.myAddress, config.web3.usdcAddress, data, config.wallet.privateKey)
    }
    await sheets.AddTransaction(0.025 * config.app.ppi, recipient)
}

setInterval(checkSale, 15000);


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3000)
console.log('Listening 3000')