const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const config = require('../config/config');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const TOKEN_PATH = 'token.json';
var sheets;

// NFT SaleHistory Information
let soldCount = 0;
let memberList = ['1'];

fs.readFile('config/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    authorize(JSON.parse(content), InitSheets);
});


function authorize(credentials, callback) {
    const {
        client_secret,
        client_id,
        redirect_uris
    } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}


function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

const InitSheets = auth => {
    sheets = google.sheets({
        version: 'v4',
        auth
    });
    console.log('Connected to google sheets.')
    GetMemberList()
}

const GetMemberList = async () => {
    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: config.googlesheets.spreadsheetid,
            range: 'I2:I',
        })

        memberList = []

        res.data.values == undefined ?
        memberList = [] :
        res.data.values.forEach(val => {
            memberList.push(val[0])
        })

        console.log("mem: ", memberList)

        soldCount = memberList.length;

        console.log(`Sold Count: ${soldCount}`)
        console.log('---Members---')
        memberList.forEach(val => console.log(val))

    } catch (error) {
        console.log(error.errors[0].message)
    }
}

const AddTransaction = async (fee, walletAddress) => {
    soldCount ++
    memberList.push(walletAddress)

    const resource = {
        values: [
            [
                soldCount,
                config.app.ppi * soldCount,
                fee,
                config.app.ppi * soldCount - fee,
                config.app.ppi * soldCount - fee - config.app.rpm * (soldCount - 1),
                soldCount - 1,
                soldCount - 1,
                soldCount == 1 ? 'Not Applicable' : config.app.rpm,
                walletAddress
            ]
        ],
    }

    await sheets.spreadsheets.values.update({
        spreadsheetId: config.googlesheets.spreadsheetid,
        range: `A${soldCount+1}:I${soldCount+1}`,
        valueInputOption: 'RAW',
        resource: resource,
    }, (err, result) => {
        if (err) {
            // Handle error
            console.log(err);
        } else {
            console.log(`Transaction ${soldCount} added for ${walletAddress}.`);
        }
    });
}

module.exports = {
    AddTransaction: AddTransaction,
    memberList: memberList,
    soldCount: soldCount
}