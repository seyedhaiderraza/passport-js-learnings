const crypto = require('crypto')

//---------------------data-------------//
const data = {
        name: 'Morrison',
        age: 24,
        SSN: 'this is SSN'
    }
    //------------------hash and hasheddata--------------//
const hash = crypto.createHash('sha256')
hash.update(JSON.stringify(data)) //create hasheddata
const hashedData = hash.digest('hex') ////create hexedhasheddata
console.log(hashedData);
//3450c72d29dbf318a6b40fd339fda3454c45cc65654a5d77b3b8b7cdd7b987df

module.exports = { hashedData, data }