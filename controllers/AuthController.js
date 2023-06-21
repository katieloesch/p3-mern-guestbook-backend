const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if(err) {
            res.json({ error: err })
        }

        let user = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPass
        })
        user.save()
        .then(user => {
            res.json({ message: 'User added successfully!' })
        })
        .catch(error => {
            res.json({ message: 'An error occurred' })
        })
    })
}

const login = (req, res) => {
    let username = req.body.username
    let password = req.body.password

    User.findOne({username:username})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if(err) {
                    res.json({
                        error: err
                    })
                }
                if(result) {
                    let token = jwt.sign({username: user.username}, 'verySecretValue', {expiresIn: '1hr'})
                    res.json({
                        message: 'Login Successful',
                        token
                    })
                } else {

                }
            })
        } else {
            res.json({
                message: "User not found"
            })
        }
    })
}
 
module.exports = { register, login }