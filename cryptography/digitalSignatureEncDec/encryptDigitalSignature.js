const crypto = require('crypto');

const encryptDSWithPrivateKey = (privateKey, hashedData) => {

    const bufferData = Buffer.from(hashedData, 'utf-8')

    return crypto.privateEncrypt(privateKey, bufferData)
}
module.exports = encryptDSWithPrivateKey