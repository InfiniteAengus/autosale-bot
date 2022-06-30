const config = {
    wallet: {
        myAddress: '0x485C891cdFCb8676609610FEef9Eb1e21A3AA364',
        privateKey: '8279899b89c3029781753df9ab51e0f28871b2917805b667d80738a7c130a288',
    },
    web3: {
        provider: 'https://rpc-mumbai.maticvigil.com/',
        scan: 'https://mumbai.polygonscan.com/tx/',
        usdcAddress: '0x546840c87eA009CC1e68e5241fC31d2f4c776a26'
    },
    googlesheets: {
        spreadsheetid: '1FQlKHJP8jVu7mbYCNqGR26dncyBdhvGDezr8nXK5MJw',
    },
    app: {
        ppi: 2,          //price per NFT: 2 USDC
        rpm: 1,          //reward per member: 1 USDC
    },
    moralis: {
        serverUrl: 'https://ql7jtzlch58b.usemoralis.com:2053/server',
        appId: 'jroH8Ae9Zp76zkIgx4IffAb1j1P3f5W1N6KVk9mA',
    },
    contractAddress: '0xc57Bd5B403Be4Ab03c1b0Dcce622E061B4624cCA'
}

module.exports = config