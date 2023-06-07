/*
1. create a method = passportJWTAuth
    -> args = 'passport' object
    -> 'passport' .use
            -> JwtStrategy(options, validateUser)
    -> validateUser(payload, cb)
        -> find user in mongodb using ({_id: payload.id}, callback)
        -> callback(err, user)=>{

            -if(err) return cb(null, false)
            -if (user) return cb(null,user)
            -else return cb(null, false)
            
            }   

    -> options = const options = {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: PUB_KEY,
                algorithms: ['RS256']
            };
    -> PUB_KEY = fs.readFileSync(pathToKey, 'utf8');
2. export
    
    */

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const { connection, mongoose } = require('../config/database');
const User = connection.models.User;

const PUB_KEY = fs.readFileSync('././utils/id_rsa.pub', 'utf8');

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};


// app.js will pass the global passport object here, and this function will configure it

function passportAuth(passport) {
    passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        User.findOne({ _id: jwt_payload.id }, callb);
    }));
}

const callb = (err, user) => {
    if (err) {
        return done(err, false);
    }
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}

module.exports = passportAuth