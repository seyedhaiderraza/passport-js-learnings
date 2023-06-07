/*

GET -> register =>register page with username, password -> -> redirect to POST register using html form containing username and password
GET -> login =>login page with username, password => -> redirect to POST login using html form containing username and password

POST-> register(JWT not issued here) =>
1. to create a user object out of mongoose.connection.model User out of UserSchema
2. create a salt and hash out of password
3. save this user object in mongodb
4. redirect to GET-login 

POST-> login(JWT issued here) =>
1. find username in mongodb =>
    1.1 res.status.json -> 401 {user not found}
    
    1.2 checkPassword using utils/validatePassword(password, hash(from request.user.hash db), salt(from request.user.salt db))  
    [request.user object is attached by passport middleware when user is authenticated by Passport middleware]
    
    1.3 if check Password isValid then :  res.status.json -> 200  {token: utils.issueJWT(user from db) }

    after login can visit any route and use passport middleware to authenticate each time
GET->protected-route =>
1. use passport.authenticate'jwt', { session: false }), 
2. redirect->login-success


*/
const router = require('express').Router();
const passport = require('passport');
const { genPassword, validPassword } = require('../utils/validatePassword');
const { issueJWT } = require('../utils/issueJWT')
const { connection, mongoose } = require('../config/database');
const { Router } = require('express');
const User = connection.models.User;

router.get('/register', (req, res, next) => {

    const form = `<h1>Register Page</h1><form method="POST" action="/register">
                        Enter Username:<br><input type="text" name="username">
                        <br>Enter Password:<br><input type="password" name="password">
                        <br><br><input type="submit" value="Submit"></form>`;

    res.send(form);

});
//Login Page
router.get('/login', (req, res, next) => {
        //here also use uname and pw else it will redirect to failure login page
        const form = `
        <h1> Welcome to Login Page</h1>
        <form method="POST" action="/login">
            <br/>Please Enter Credentials
            <br/>Username<input type="text" name="username" placeholder="Username">    
            <br/>Password<input type="password" name="password" placeholder="password">    
            <br/><br/>
            <input type="submit" value="Submit">
        </form>
    `
        res.send(form)
    })
    // after login route to authenticate using passport
    // this route will not open currently on browser since the request requires a bearer token issued during login
    //can use postman with authorization header having token
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!" });
});
//--------------POST routes----------------//
//login->find user + issue jwt
router.post('/login', function(req, res, next) {

    User.findOne({ username: req.body.username })
        .then((user) => {

            if (!user) {
                return res.status(401).json({ success: false, msg: "could not find user" });
            }

            // Function defined at bottom of app.js
            const isValid = validPassword(req.body.password, user.hash, user.salt);

            if (isValid) {

                const tokenObject = issueJWT(user);

                res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

            } else {

                res.status(401).json({ success: false, msg: "you entered the wrong password" });

            }

        })
        .catch((err) => {
            next(err);
        });
});
//------------------Register---------------//

//get password from request gen salt and hash store username hash salt in db
router.post('/register', function(req, res, next) {
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt
    });

    try {

        newUser.save()
            .then((user) => {
                const tokenObject = issueJWT(user);

                res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

      
               // res.json({ success: true, user: user });
            });

    } catch (err) {

        res.json({ success: false, msg: err });

    }

});

module.exports = router