//JWT = encrypted header . encryptedpayload . encrypted pub/private keys using algo

const { default: base64url } = require("base64url")


//-------------------data ===> signedb64Dataurl-------------------------------//
/**
 Flow--> data -> base64header,  base64payload -> base64header.base64payload ->Signfunction-> base64sign ----> JWT = b64header.b64payload.b64sign
 1. data ==> [base64 encoding]

 2. => base64encodeddata1 + '.' + base64encodeddata2 ==> [crypto.createsign('RSA-SHA256'). write()]

 3. => SHA256signatureFunction has b64data ==> [.sign(PRIVATE_KEY, 'base64')]
 
 4. => privatekeysigned-base64-data ==> [.fromBase64()]

 5. => privatekeysigned-base64-data-url

 so now we have:
 base64encoded-headers
  base64encoded-payload
   base64encoded-signature
   join them using '.' to create a full string
 */
//algo = rs256, hs256 etc...
const headers = {
    "alg": "RS256",
    "typ": "JWT"
}
const payloadObj = {
    subject: '122222',
    name: 'Harry Marry',
    admin: true,
    iat: 3222222

}
const headerStr = JSON.stringify(headers)
const payloadStr = JSON.stringify(payloadObj)

const base64encodedHeader = base64url(headerStr)
const base64encodedPayload = base64url(payloadStr)

console.log(`base64 encoded header>>>>>> ${base64encodedHeader}`);
console.log(`base64 encoded payload>>>>>>  ${base64encodedPayload}`);
const crypto = require('crypto')
const signFunction = crypto.createSign('RSA-SHA256') //FOR SIGNATURE CREATION
const fs = require('fs')

signFunction.write(base64encodedHeader + '.' + base64encodedPayload)
signFunction.end()


const PVT_KEY = fs.readFileSync(__dirname + '/id_rsa', 'utf8')

const binarySignedB64Data = signFunction.sign(PVT_KEY, 'base64') // the signFunction.sign() method, which returns the binary signature data
    //basae64 data + sign = signedb64data

console.log(`sha256 signedB64Data >>>>>>  ${binarySignedB64Data}`);
const signedB64Url = base64url.fromBase64(binarySignedB64Data)

console.log(`sha256 signedB64Url >>>>>>  ${signedB64Url}`); //singedbase64data remains same except special chars like / = + etc are replaced by _ or '' etc

const JWTToken = base64encodedHeader + '.' + base64encodedPayload + '.' + signedB64Url

//----------------------------------------------signedb64Dataurl ===> originaldata-----------------------------------------------------------//
/*
Flow = JWT -> split into 3 -> b64header, b64payload, b64sign

convert b64signurl to b64binarysignature
b64signurl -> .toBase64() -> binaryb64signature

binaryb64signature -> crypto.createVerify(sha256).verify() using public key, using b64 encoding -> true/false

*/

const verifySignature = crypto.createVerify('RSA-SHA256')

const PB_KEY = fs.readFileSync(__dirname + '/id_rsa.pub', 'utf8')

const base64dataparts = JWTToken.split('.')

verifySignature.write(base64dataparts[0] + '.' + base64dataparts[1])
verifySignature.end()

const JWTTokensignature = base64url.toBase64(base64dataparts[2])

const isSignatureValid = verifySignature.verify(PB_KEY, JWTTokensignature, 'base64')

console.log(isSignatureValid);