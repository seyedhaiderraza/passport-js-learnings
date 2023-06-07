const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        //checks if request.session.passport object has a property user!=null
        // session{... passport{ user: 'adsdadasda'}...}
        next() //pass on to next middleware
    } else {
        res.status(401).json({ msg: 'You are unauthorised to view this resource' })
    }
}

module.exports.isAuth = isAuth