// Essential NPM packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user')
const passport = require('passport')
const logRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')
const authRoute = require('./routes/auth')

//Import Schema
const Post = require('./models/post');


const app = express()

//Middleware
//Set CORS headers on response from this API use the 'cors' NPM package
app.use(cors({
    origin:'http://localhost:3000'
}))

//Bodyparser
app.use(express.json())



app.use(logRoutes)
app.use(userRoutes)


//DB
const db = mongoose.connection
const dbConfig = require('./config/db')


const port = process.env.PORT|| 5000;

//Connect Mongoose

mongoose.connect(dbConfig)

db.on('error', (error) => console.log(`ERROR: ${error.message}`))
db.on('connected', () => console.log(`MongoDB Connected: ${dbConfig}`))
db.on('disconnected', () => console.log('MongoDB Disconnected'))

app.use('/api', authRoute)

app.get('api2/login', (req, res) => {

    console.log(res.body.username)
    // console.log(req.body)
    // // const user = await User.findOne({username: req.body.username})
    // // console.log(user)
    // res.json({message: 'hello'})
    
})

app.get('/api/protected', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        message: "User authenticated!"
    })
})

app.listen(port, () => console.log(`Server started on port ${port}`))

//Test

