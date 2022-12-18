const { request, response } = require('../app')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (request, response, next) => {
    /* console.log(request) */

    if (!request.token) {
        return response.status(401).json({error: "token missing or invalid"})
    }
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({error: "token missing or invalid"})
    }

    const loggedInUser = await User.findById(decodedToken.id)
    request.user = loggedInUser

    next()
}

module.exports = userExtractor