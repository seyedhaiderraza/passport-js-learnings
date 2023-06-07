const crypto = require('crypto')
const fs = require('fs')

function generatePublicPrivateKeyPair() {
    const {
        publicKey,
        privateKey,
    } = crypto.generateKeyPairSync('rsa', { //uses elliptical curve algorithm
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    })
    fs.writeFileSync(__dirname + '/id_rsa.pub', publicKey)
    fs.writeFileSync(__dirname + '/id_rsa', privateKey)
}

generatePublicPrivateKeyPair()