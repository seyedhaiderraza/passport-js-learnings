const decryptWithPrivateKey = require('./decryptData')
const encryptWithPublicKey = require('./encryptData')
const fs = require('fs')

const pvtKey = fs.readFileSync(__dirname + '/id_rsa', 'utf-8') // utf-8 is important

const pbKey = fs.readFileSync(__dirname + '/id_rsa.pub', 'utf-8') // utf-8 is important

const data = "this is secret message"

const encryptedData = encryptWithPublicKey(pbKey, data)

const decryptData = decryptWithPrivateKey(pvtKey, encryptedData)

console.log(`Encrypted data >>>>>> ${encryptedData.toString()}`);

console.log(`Decrypted data >>>>>> ${decryptData.toString()}`);