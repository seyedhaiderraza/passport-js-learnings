const express = require('express')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')(expressSession)

var passport = require('passport')
var crypto = require('crypto')

const { connection, mongoose } = require('./config/database')


/*
--------------------express app & middleware Setup----------------
 */

require('dotenv').config();

var app = new express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//----------------------express session setup----------------------



const sessionStore = new MongoStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

app.use(expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

//------------------passport authentication------------//
require('./config/passport')

app.use(passport.initialize())
    //initialise passport middleware
    //already configured in passportjs using localstrategy->using
    // verifycallback and customfield
app.use(passport.session())
    //session()->session object used to authenticate returned user

//------------------routes------------------------------//
var routes = require('./routes')
app.use(routes)

//---------------------server config--------------------//
app.listen(3000)