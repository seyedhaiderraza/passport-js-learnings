const passport = require('passport')
const LocalStrategy = reuqire('passport-local').LocalStrategy
const connection = require('./database')
const User = connection.models.user