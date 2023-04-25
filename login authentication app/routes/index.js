const router = require('express').Router();
const passport = require('passport')
const passwordUtils = require('../lib/passwordUtils')
const connection = require('../config/database')
const User = connection.models.User;

//-----------------------POST Route-----------------//

router.post('/login', (req, res, next) => {

})
router.post('/register', (req, res, next) => {

})

//-----------------GET Route -------------------------//

//HomePage 
router.get('/', (req, res, next) => {
        res.send('<h1>Welcome to Login/Register Page</h1><br/>Please <a href="/register">Register</a>')
    })
    //Login Page
router.get('/login', (req, res, next) => {
        const form = `
        <h1> Welcome to Login Page</h1>
        <form method="post" action="register">
            <br/>Please Enter Credentials
            <br/>Username<input type="text" name="username" placeholder="Username">    
            <br/>Password<input type="password" name="password" placeholder="password">    
            <br/><br/>
            <input type="submit" value="Submit">
        </form>
    `
        res.send(form)
    })
    //post authentication page
router.get('/protected-route', (req, res, next) => {

        if (req.isAuthenticated()) {
            res.send(
                `
            <h1>You are Authenticated</h1>
            <p><a href="/logout">Logout and reload</p>
            `
            )
        } else {
            res.send(
                `
            <h1>You are not Authenticated</h1>
            <p><a href="/login">Login Again</p>
            `
            )
        }
    })
    /*-----------post authentication routes-------------*/
    //post logout
router.get('/logout', (req, res, next) => {
        req.logout()
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