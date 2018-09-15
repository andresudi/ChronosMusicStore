const isAdmin = (req, res, next) => {
    let loggedInUser = req.loggedInUser
    if(loggedInUser.role === 'admin'){
        next()
    } else {
        res.status(403).json({
            msg: 'you do not have access to do this access'
        })
    }
}

module.exports = isAdmin
