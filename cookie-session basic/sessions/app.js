const mongoose = require('mongoose')
const express = require('express')
const app = new express()
const expresssession = require('express-session')
const MongoStore = require('connect-mongo')(expresssession)

//use express session as middleware in app
//use mongodb store for storing express generated sessions
//connect-mongo is a data store
const dbURL = 'mongodb://127.0.0.1:27017/passportJS-DB'
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const connection = mongoose.createConnection(dbURL, dbOptions)

connection.on('open', () => {
    console.log('Connected to MongoDB!');
});

const mongostoreSessionInstance = new MongoStore({
    mongooseConnection: connection,
    collection: 'sessions'
});
// Define a model based on the schema
const SampleSchema = new mongoose.Schema({
    name: String,
    age: Number
});
const SampleModel = connection.model('Sample', SampleSchema);

app.use(express.json())
    /*
    converts incoming JSON data into JS object
    example: 
    <form method="POST" action="/submit" enctype="application/json">
  <label for="name">Name:</label>
  <input type="text" name="name" id="name">
  <label for="email">Email:</label>
  <input type="email" name="email" id="email">
  <button type="submit">Submit</button>
</form>
here enctype is json so data will come in form of json and automatically express.json() will convert into 
JavaScript object to access values:

app.post('/submit', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  // Do something with the form data...
});
    */
app.use(express.urlencoded({ extended: true }))
    //without urlencoded data in request ill be parsed string
    // : name=John%20Smith&email=john.smith%40example.com
    //with urlencoded data will be key value pair object
    /*
    {
      name: 'John Smith',
      email: 'john.smith@example.com'
    }
    */
app.use(expresssession({
    secret: 'some secret', //wont be exposed in db
    resave: false, //when reload or revisit page
    saveUninitialized: true, //first time create session
    store: mongostoreSessionInstance,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //1k milliseconds=1second*60=1minte*60=1 hour*24=1 day
    }
    /*
       cookie generated->stored as session._id -> passed as cookie
       on browser and stored on client
       each time client sends this cookie to server 
       server knows from db its existing cookie so session is active
       associated with this cookie -> session.id
       */
}))

// Define routes
app.get('/', async(req, res) => {
    try {
        (req.session);
        //can access session object coming from request as cookie can also manipulate
        if (req.session.viewCount) {
            req.session.viewCount += 1
        } else {
            req.session.viewCount = req.session.viewCount = 1
        }
        /*added viewCount param to session object
               each time page reloads->client sends cookie with viewCount
               server stores/updates in mongodb the user session with viewcount
               so clients cookie/session gets updated with viewcount latest value 
               */
        // // Retrieve data from MongoDB using the model
        // const sample = new SampleModel({
        //     name: 'hello',
        //     age: 23
        // });

        // Save the document to MongoDB

        //  await sample.save();


        res.send(`<h1>visited this page ${req.session.viewCount} times </h1>`);
    } catch (err) {
        res.status(500).send(err);
    }
});
app.listen(3000)