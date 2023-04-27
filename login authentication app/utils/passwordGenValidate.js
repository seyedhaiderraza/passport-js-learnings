const crypto = require('crypto')

function validPassword(password, hashFromDB, salt) {
    //hash = function(pwd, salt)
    //stored in db
    //req.pwd-->server
    //pwd->hashfunc(p,s)->genhash==dbhash?valid:invalid
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
        //pbkdf used for hash gen from pwd+salt using sha512 strategy
    return hashFromDB === genHash;
}

function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex') //salt
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
        //pbkdf used for hash gen from pwd+salt using sha512 strategy
    return {
        genHash,
        salt
    }

}

module.exports.validatePassword = validPassword
module.exports.genPassword = genPassword