const crypto = require('crypto');
const fs = require('fs')



const { payLoadtoSend } = require('./useEnDecForDigSign')
const hashAlgo = payLoadtoSend.algo
const pbKey = fs.readFileSync('../id_rsa.pub', 'utf-8');


//----------------decryptDS-encryptedDS-----------------//

const decryptDSWithPublicKey = require('./decryptDigitalSignature');

const decryptedDSWithPubliceKey = decryptDSWithPublicKey(pbKey, payLoadtoSend.hashedAndEncryptedData)
const hashedDataFromDecryptingReceivedEncryptedData = decryptedDSWithPubliceKey.toString()
console.log(hashedDataFromDecryptingReceivedEncryptedData);
//gives hash: 3450c72d29dbf318a6b40fd339fda3454c45cc65654a5d77b3b8b7cdd7b987df

//---------------original data to hash-----------------//
const hash = crypto.createHash(payLoadtoSend.algo)
const hashOfOrgData = hash.update(JSON.stringify(payLoadtoSend.rawData))
const hexOfHashedDataObtainedFromRawDataInsideReceivedPayload = hashOfOrgData.digest('hex')

//-------------compare receivedHexHashedData and convertedHexHashedData------------------//
hexOfHashedDataObtainedFromRawDataInsideReceivedPayload === hashedDataFromDecryptingReceivedEncryptedData ?
    console.log('data verified correct') :
    console.log('data tampered and incorrect');;

/*
    payload---> rawData    |   encrypted-Hexd-Hash-Data


    1. rawData  =>  hashed-Data =>  hexd-Hashed-Data #
( using    crypto.createHash('sha256')   .update(JSON.stringify(rawData))   .digest('hex')    )


    2. encrypted-Hexd-Hash-Data =>  decrypted--Hexd-Hash-Data => Hexd-Hash-Data *
( using    crypto.publicDecrypt(pbKey, ehhData)   .toString()                 ) 


    #                          # === * ?

    */