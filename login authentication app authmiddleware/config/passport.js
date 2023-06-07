const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { connection, mongoose } = require('./database')
const { validatePassword } = require('../utils/passwordGenValidate')
const User = connection.models.User

const customFields = {
        usernameField: 'uname',
        passwordField: 'pw'
    }
    //pp local strategy reuqires a verifyCallback method
    //vfcb first verifies if user exists in db or not using username, password 
const verifyCallback = (username, password, cb) => {

        //username,password, callback mandatory params with same name
        User.findOne({ username: username }) //mongodb find user w username
            .then((user) => {

                return !user ? cb(null, false) :
                    //if not found return with null,false->no error
                    validatePassword(password, user.hash, user.salt) ?
                    //else verify password by decrypt password using hash, salt
                    cb(null, user) : //return user in callback
                    //else return no user no error null callback
                    cb(null, false)

            })
            .catch(err => {
                return cb(err) //cb is passport callback it will handle error passed itself
            })

    }
    //pp localstrategy takes customfields and verifycallback methods defined as per documentation
const strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(strategy);
//serialize user object into session login
passport.serializeUser((user, cb) => {
    cb(null, user.id)
        /*
        function(user, cb) {

        process.nextTick(function() {
            return cb(null, {
                id: user.id,
                username: user.username,
                picture: user.picture
            });
        });
        */
});
//deserialize user object out of session logout
passport.deserializeUser((userId, cb) => {
    /* function(userId, cb) {
     default provided by passport
         process.nextTick(function() {
             return cb(null, user);
         });
         */
    //custom deserliase
    User.findById(userId)
        .then(user => {
            cb(null, user)
        })
        .catch(err => cb(err))
});
/*
In the serializeUser() function,
 cb(null, user.id) is called to serialize the user object
  and store it in the session. 
  When cb(null, user.id) is called, 
  the passport module takes over the control flow 
  and continues with the authentication process.

In the deserializeUser() function, 
cb(null, user) is called to deserialize the user object
 from the session. When cb(null, user) is called, 
 the passport module takes over the control flow and
  continues with the authentication process, 
  passing the deserialized user object to the 
  next middleware or route handler.
*/