const config = {
    wallet: {
        myAddress: '',
        privateKey: '',
    },
    web3: {
        provider: 'https://polygon-rpc.com/',
        scan: 'https://polygonscan.com/tx/',
        usdcAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
    },
    googlesheets: {
        spreadsheetid: '',
    },
    app: {
        ppi: 2,          //price per NFT: 2 USDC
        rpm: 1,          //reward per member: 1 USDC
    },
    contractAddress: ''
}

module.exports = config