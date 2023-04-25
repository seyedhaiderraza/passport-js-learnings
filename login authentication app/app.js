const express = require('express')
const expressSesson = require('express-session')
const MongoStore = require('connect-mongo')(expressSession)

var passport = require('passport')
var crypto = require('crypto')

var connection = require('./config/database')
var routes = require('./routes')

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

app.use(expressSesson({
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
    //------------------routes------------------------------//
var routes = require('./routes')
app.use(routes)

//---------------------server config--------------------//
app.listen(3000)