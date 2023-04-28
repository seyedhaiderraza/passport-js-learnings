const jwt = require('jsonwebtoken')
const fs = require('fs')
const crypto = require('crypto')

const PB_KEY = fs.readFileSync(__dirname + '/id_rsa.pub', 'utf8')
const PVT_KEY = fs.readFileSync(__dirname + '/id_rsa', 'utf8')

const payload = {
        name: 'Morrison',
        age: 24,
        SSN: 'hello world SSN'
    }
    //-----------------------------encrypt and create a signedJWT a.b.c----------//
    //skipped payload->string->b64encoding-> join using '.' with jwt library
const signedJWT = jwt.sign(payload, PVT_KEY, { algorithm: 'RS256' })

console.log(`signedJWT>>>>>>>>>${signedJWT}`);
/*
signedJWT>>>>>>>>>
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9                     .
eyJuYW1lIjoiTW9ycmlzb24iLCJhZ2UiOjI0LCJTU04iOiJoZWxs
byB3b3JsZCBTU04iLCJpYXQiOjE2ODI3MDc3NDd9                 .
lnddy3-OiMQMX3mi9o3L3KdBNAFyCes2hnlnGkIZYTSdTeO-Pf3CKM
wI44nL0DLC7AZtFJzEG2OGNj68q2_zyPI2petA636iR0DgSH5ewM82
s3kKn76z687tTmxFrRkV8OxP9cP3_dgXt9DkTfiEizveRDz-i8t3AS8gEFWUWScJ
_Q9Q_Ocx34EyOjc-Q7guBXJfrMYjsJXu1vn8GGcxpVkXxr9yJxCJ7nkmgim5
-omUE9XywtJsgBP01CcSsLThLTk7k4jFEqFQ30IU26NyvX8K6i408Md9cdes
6PqqbjyzQ4gkZxG7-fTPSVCCmh-f7HKh2cOdMZlX6cCZ9lj-kHBIFm_W4sd_
v1kiFmiCjTGZit3AE3Ve9BzQVoKfw4o6gpdN2NgWw9A7KRwF7ApI4lnf0Wq7_
EMHLV0ov8BekoqUZpgvCSakHrG1NZENz0TBj6fMAOA65e7tmzTeKlhRMVxBSn
KlIUaq1gtqqNe2gkjWHY-3HsQxs374FLKauHj40lGJexQR571pb8_dLLRFBUS
Hkj2Z-4NenMyvECD69AQrM6K1bs3IzNRowOsgnFihZ8aB0958sdglUY2IWh0a
N7rAbysmPZiqDV13QdP-GNd7whyn2rvIEzrD8qiih2L-5r5rscRXVmjhYB0yq
HhXb_Z29Kvd36byF5j_F2lZ-6w
*/
//-------------------------verify JWT and decrypt data-------------------------------//
jwt.verify(signedJWT, PB_KEY, { algorithm: 'RS256' }, (err, originalData) => {
    console.log(err); //null
    console.log(originalData);
    //{ name: 'Morrison', age: 24, SSN: 'hello world SSN', iat: 1682707747 }
})