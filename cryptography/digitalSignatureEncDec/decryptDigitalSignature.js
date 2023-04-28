const crypto = require('crypto');

const decryptDSWithPublicKey = (publicKey, encryptedData) => {

    const bufferData = Buffer.from(encryptedData, 'utf-8')

    return crypto.publicDecrypt(publicKey, bufferData)
}
module.exports = decryptDSWithPublicKey