const crypto = require('crypto');

const decryptDSWithPublicKey = (publicKey, encryptedData) => {

  //  const bufferData = Buffer.from(encryptedData, 'utf-8') incoming data already encrypted-buffered-hexed-hashed-stringdata

    return crypto.publicDecrypt(publicKey, encryptedData)
}
module.exports = decryptDSWithPublicKey