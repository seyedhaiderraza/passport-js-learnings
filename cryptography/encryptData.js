const crypto = require('crypto');
const decryptWithPrivateKey = require('./decryptData');

const encryptWithPublicKey = (publicKey, data) => {

    const bufferData = Buffer.from(data, 'utf-8')

    return crypto.publicEncrypt(publicKey, bufferData)
}
module.exports = encryptWithPublicKey