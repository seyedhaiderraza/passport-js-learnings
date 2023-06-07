const crypto = require('crypto')

const decryptWithPrivateKey = (privateKey, encryptedData) => {

    const decryptedData = crypto.privateDecrypt(privateKey, encryptedData)
    return decryptedData
}

module.exports = decryptWithPrivateKey