const crypto = require('crypto')
const encryptDSWithPrivateKey = require('./encryptDigitalSignature')
const decryptDSWithPublicKey = require('./decryptDigitalSignature')
const { hashedData, data } = require('./hashData')

//---------------encryptDS-hashed-----------------------//
const pvKey = require('fs').readFileSync('../id_rsa', 'utf-8');

const encryptedDSWithPrivateKey = encryptDSWithPrivateKey(pvKey, hashedData)
console.log(encryptedDSWithPrivateKey);
/*
<Buffer 29 c5 e6 74 f1 2e 6b 8c 30 71 58 bd aa fb c9 44 e6 cd 13 5b 62 be c7 61 4f dd 53 eb bf ca 36 33 fe b8 66 31 fe a1 b1 
02 b6 eb 41 5d fb a8 cf b6 b9 4f ... 462 more bytes>
*/

const payLoadtoSend = {
    rawData: data,
    algo: 'sha256',
    hashedAndEncryptedData: encryptedDSWithPrivateKey
}


module.exports.payLoadtoSend = payLoadtoSend