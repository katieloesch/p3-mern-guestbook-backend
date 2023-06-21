//require .env file to access secret key
require('dotenv').config()

const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt

const jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

// jwtOptions.secretOrKey = process.env.SECRET_KEY
jwtOptions.secretOrKey = 'e39aac893af4383c63d2a01ee74d8767ecbe461b02abb68e9a183096185ceae62e10433062e784c53274ac1f321fc7369d31951d4046f16a2d2aacb607fc70aa'

module.exports = jwtOptions