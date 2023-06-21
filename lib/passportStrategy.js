//Require Mongoose Models for Post and User
const Post = require('../models/post')
const User = require('../models/user')
const mongoose = require('mongoose');

// Passport Strategy Package
const passportJWT = require('passport-jwt')

// Passport Options
const jwtOptions = require('./passportOptions')

//JSON Web Token Strategy object that we will be using
const JwtStrategy = passportJWT.Strategy

//strategy: when client sends a request with JWT
    //check if client has valid JWT
    //check if token is expired
const strategy = new JwtStrategy(jwtOptions, async (jwtPayload, next) => {

    const data = await User.findOne({_id: jwtPayload.id})

    const user = {...data}
    if (data._id) {
        user._id = data._id.valueOf()
    }

    if (user._id && user._id === jwtPayload.id) {

        // If ID is in the db:
            // then user is legitimiate -> run the route requested by user
            // null: no errors
            // user: document retrieved from db that matched id of token
        next(null, user)
    } else {
        // If ID does not match any document in db -> skip requested route + return 401 status code
        // false: no user was retried from db
        next(null, false)
    }
})

module.exports = strategy