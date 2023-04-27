const router = require('express').Router();
const passport = require('passport')
const { genPassword } = require('../utils/passwordGenValidate');
const { connection, mongoose } = require('../config/database');
const { isAuth } = require('./authMiddleware');
const User = connection.models.User
    //----------------------create User Schema mongodb--------------//

//-----------------------POST Route-----------------//

router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success' }))
    //pp.auth(local) is middleware passed

router.post('/register', (req, res, next) => {
    /*
    1.use req.username, req.password 
    to gen salt & hash
    2. create new mongo schema User with username, hash, salt NOT password

    */
    const { genHash, salt } = genPassword(req.body.pw)

    const newUser = new User({
        username: req.body.uname,
        hash: genHash,
        salt: salt
    })
    newUser.save()
        .then((user) => {
            console.log(user);
            res.redirect('/login')
        })
})

//-----------------GET Route -------------------------//

//HomePage 
router.get('/', (req, res, next) => {
    console.log('inside homepage');
    res.send('<h1>Welcome to Login/Register Page</h1><br/>Please <a href="/register">Register</a>')
    console.log('inside homepage>>>res.send complete');
})

router.get('/register', (req, res, next) => {

    console.log('inside register route');
    const form = `<h1>Register Page</h1><form method="POST" action="/register">
                        Enter Username:<br><input type="text" name="uname">
                        <br>Enter Password:<br><input type="password" name="pw">
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
            <br/>Username<input type="text" name="uname" placeholder="Username">    
            <br/>Password<input type="password" name="pw" placeholder="password">    
            <br/><br/>
            <input type="submit" value="Submit">
        </form>
    `
        res.send(form)
    })
    //post authentication page
router.get('/protected-route', isAuth, (req, res, next) => {

        res.send('you are authenticated')
    })
    /*-----------post authentication routes-------------*/
    //post logout
router.get('/logout', (req, res, next) => {
        //req.logout()
        //won't work later version of passport
        // requires a callback inside logout
        req.logOut(something => {

        })
        res.redirect('/protected-route')
    })
    //post authentication success route
router.get('/login-success', (req, res, next) => {

        res.send(`<p> You have logged in successfully ---></p>
     <a href="/protected-route">
     Go to protected route
      </a>`)
    })
    //post authentication failure route
router.get('/login-failure', (req, res, next) => {

    res.send(`<p> You entered wrong username or password ---></p>
    `)
})
module.exports = router