/*
1. dotenv
2. express app
3. connect, mongoose from database
4. passport
4.1 initialise pasport
5. json(), urlencoded()
6. routes
7. listen
 */
const express = require('express');
const passport = require('passport');

require('dotenv').config();

var app = express();


const { connection, mongoose } = require('./config/database')

require('./config/passport')(passport) //pass arg to be global object passport

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var routes = require('./routes/routes')
app.use(routes)
app.listen(3000);