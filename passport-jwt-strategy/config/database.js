const mongoose = require('mongoose')

require('dotenv').config()
    /*
    1. get mongoose dependency -> createConnection using dburl, dboptions->topology,parser
    2. on event to connect to mongodb make sure mongod is running
    3. create a mongoose Schema -> create a connection model
    4. export connection and mongoos

     */
const connection = mongoose.createConnection(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
connection.on('open', () => {
    console.log('Connected to jwtauthdb MongoDB!');
});

const UserSchema = mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    isAdmin: Boolean
})

const User = connection.model('User', UserSchema)

/*incorrect way to do export mongoose export will overide first one
will go in infinite loading mode
module.exports = connection

module.exports = mongoose
*/
//correct way
module.exports = {
    connection,
    mongoose
};