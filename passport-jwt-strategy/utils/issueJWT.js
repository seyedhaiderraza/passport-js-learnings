const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const PRIV_KEY = fs.readFileSync(__dirname + '/id_rsa', 'utf8');



function issueJWT(user) {
    const _id = user._id;

    const expiresIn = '1d';

    const payload = {
        id: _id,
        iat: Date.now()
    };

    const signedToken = jsonwebtoken.sign
                        ( payload, PRIV_KEY,
                            { expiresIn: expiresIn, algorithm: 'RS256' }
                        );

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

module.exports.issueJWT = issueJWT;