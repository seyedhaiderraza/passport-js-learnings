const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        //checks if request.session.passport object has a property user!=null
        // session{... passport{ user: 'adsdadasda'}...}
        next() //pass on to next middleware
    } else {
        res.status(401).json({ msg: 'You are unauthorised to view this resource' })
    }
}

const isAdmin = (req, res, next) => {

    console.log(`isAdmin>>>>>>Request>>>>>${JSON.stringify(req.session)}`);
    /*
    {
        "cookie":{"originalMaxAge":86400000,"expires":"2023-04-28T21:44:42.295Z","httpOnly":true,"path":"/"},
        "passport":{"user":"644acbb4893a8339296df799"}
    }
    */
    console.log(`isAdmin>>>>>>Request>>>>>${JSON.stringify(req.user)}`);
    /*
    {
        "_id":"644acbb4893a8339296df799",
        "username":"qwerty",
        "hash":"1cd3128859f87fb81f8fd1d4a5dcf5178abdfa5937b8a25bf5c936c62b3748c157fed31bd720cd10095875d71a78c22100797830924ecac0e71d4417624139cb",
        "salt":"775309f129a89f14f5c316b73dcbf0b20cdc12e5f85ba8b5118f9637a097e586",
    "__v":0
}
    */
    if (req.isAuthenticated() && req.user.isAdmin) {
        //request.user <-here user object comes from passport.deserializeUser 
        //which takes passport{user:'sdadadd'} from request.session{...} and desz it
        //checks if request.session.passport object has a property user!=null
        // session{... passport{ user: 'adsdadasda'}...}
        next() //pass on to next middleware or the express route in which its passed
    } else {
        res.status(401).json({ msg: 'You are not Admin so unauthorised to view this resource' })
    }
}
module.exports.isAuth = isAuth

module.exports.isAdmin = isAdmin