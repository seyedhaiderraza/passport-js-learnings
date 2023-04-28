const mongoose = require('mongoose')

require('dotenv').config()

const connection = mongoose.createConnection(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
connection.on('open', () => {
    console.log('Connected to MongoDB!');
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