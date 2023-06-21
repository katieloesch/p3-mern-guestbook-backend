//Require necessary NPM packages
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const strategy = require('../lib/passportStrategy')
const jwtOptions = require('../lib/passportOptions')
const passport = require('passport')
passport.use(strategy)

//Instantiate a Router
const router = express.Router()

//Require Mongoose Models for Post and User
const Post = require('../models/post')
const User = require('../models/user')

/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /users
 * Description: Get All User documents from db
 */

router.get('/users', (req, res) => {
    User.find().populate('posts')
    .then((allUsers) => {
        res.json(allUsers)
    })
    .catch(error => {
        res.status(500).json({error: error})
    })
})

/**
 * Action:      CREATE
 * Method:      POST
 * URI:         /users
 * Description: Create a new User document
 */

router.post('/users', async (req, res) => {
 
    try {
        //Check if username already exists in db
        //If it does, send error
        const usernameExists = await User.find({username: req.body.username})
       
        if (usernameExists.length > 0) {
            res.send({error: "username already exists"})

        } else {
            //salt + hash password entered by user
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
            const newUser = {
                username: req.body.username,
                password: hashedPassword,
                name: req.body.name,
                posts: []
            }
            
            //create new User document
            User.create(newUser).then(function(user) {
                res.status(201).json(user)
            })
        }
    } catch {
        res.status(500).json({error: 'Internal Server Error'})    }    
})

/**
 * Method:      POST
 * URI:         /users/login
 * Description: Login User and retrieve User data from db
 */

//LOGIN when user tried to log into account with username + password
router.post('/users/login', async (req, res) => {
    
    //retrieve user document from db by username (usernames are unique)
    const user = await User.find({username: req.body.username})
   
    if (user.length == 0) { // no record found in database
        res.status(400).json({error: 'user does not exist in database'})

    } else { // user exists in db

        try {   //check if password user entered matches password in db
            if (await bcrypt.compare(req.body.password, user[0].password)) {

                const payload = {
                    id: user[0]._id,
                    username: user[0].username
                }

                //Build JWT
                const token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: 432000}) // 5 days -> 432000s
               
                //Send JWT back to user
                res.status(201).json({
                    success: true,
                    token: token,
                    user: user
                })

              } else { // password user entered does not match password in db
                res.status(401).json({error: 'Invalid username or password'})
              }
        } catch(error) {
            res.status(500).json({error: error})
    
        }
    }
})

/**
 * Action:      SHOW
 * Method:      GET
 * URI:         /users/644ef2f60bf76b599d86f44d
 * Description: Get a User document by User ID
 */

router.get('/users/:id', (req, res) => {
    User.findById(req.params.id).populate('posts')
    .then(user => {
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({
                error: {
                    name: 'DocumentNotFound',
                    message: "The provided ID doesn't match any documents"
                }
            })

        }
        
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({error: error})
    })
})

/**
 * Action:      SHOW
 * Method:      GET
 * URI:         /users/644ef2f60bf76b599d86f44d/account
 * Description: access protected data from a User document by User ID
 */

//valid JWT token required to acces this route
router.get('/users/:id/account', passport.authenticate('jwt', {session: false}), (req, res) => {
    try {
        res.json({
            status: 200,
            message: 'login sucessful',
            user: req.user._doc
        })
    } catch(error) {
        res.json({error: error})
        console.log(error)
    }

})

/**
 * Action:      UPDATE
 * Method:      PUT
 * URI:         /users/644ef2f60bf76b599d86f44d
 * Description: Update a User by User ID
 */

router.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('posts')
    .then(user => {
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({
                error: {
                    name: 'DocumentNotFound',
                    message: "The provided ID doesn't match any documents"
                }
            })

        }
        
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({error: error})
    })
})

/**
 * Method:      GET
 * URI:         /users/644ef2f60bf76b599d86f44d/account/update/password
 * Description: access protected route where user can change password in User document
 */

//valid JWT token required to acces this route
router.get('/users/:id/account/update/password', passport.authenticate('jwt', {session: false}), (req, res) => {
    try {
        res.json({
            status: 200,
            message: 'login sucessful',
            user: req.user._doc
        })
    } catch(error) {
        res.json({error: error})
        console.log(error)
    }

})

/**
 * Method:      GET
 * URI:         /users/644ef2f60bf76b599d86f44d/account/update
 * Description: access protected route where user can change username / name in User document
 */

//valid JWT token required to acces this route
router.get('/users/:id/account/update', passport.authenticate('jwt', {session: false}), (req, res) => {
    try {
        res.json({
            status: 200,
            message: 'login sucessful',
            user: req.user._doc
        })
    } catch(error) {
        res.json({error: error})
        console.log(error)
    }

})


/**
 * Action:      DESTROY
 * Method:      DELETE
 * URI:         /users/644ef2f60bf76b599d86f44d
 * Description: Delete a User by User ID
 */

router.delete('/users/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id)
    .then(user => {
        if (user) {
            res.json(user)
        } else {            
            res.status(404).json({
                error: {
                    name: 'DocumentNotFound',
                    message: "The provided ID doesn't match any documents"
                }
            })

        }
        
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({error: error})
    })
})


/**
 * Method:      GET
 * URI:         /users/644ef2f60bf76b599d86f44d/account/update
 * Description: access protected route where user can change delete User document
 */

//valid JWT token required to acces this route
router.get('/users/:id/account/delete', passport.authenticate('jwt', {session: false}), (req, res) => {
    try {
        res.json({
            status: 200,
            message: 'login sucessful',
            user: req.user._doc
        })
    } catch(error) {
        res.json({error: error})
        console.log(error)
    }

})




/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /users/644ef2f60bf76b599d86f44d/posts
 * Description: Get all posts from a User by User ID
 */

router.get('/users/:id/posts', async (req, res) => {
    try {
        const data = await User.findById(req.params.id).populate('posts')
        res.json(data.posts)
    } catch {
        res.status(500).json({error: 'Internal Server Error'})
    }
})

/**
 * Action:      CREATE
 * Method:      POST
 * URI:         /users/644ef2f60bf76b599d86f44d/posts
 * Description: Create a new post for a User
 */

router.post('/users/:id/posts', async (req, res) => {
    try {
        const newPost = await Post.create(req.body)
        const data = await User.findByIdAndUpdate(req.params.id, {$push: {posts: newPost}}, {new: true}).populate('posts')
        res.json(data)
    } catch {
        res.status(500).json({error: 'Internal Server Error'})
    }
    
})

/**
 * Action:      SHOW
 * Method:      GET
 * URI:         /users/644ef2f60bf76b599d86f44d/posts/64552ba83b906c65ed9db73b
 * Description: Get a single Post (by post ID) from a User (by User ID)
 */

router.get('/users/:id/posts/:postId', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('posts')
        const data = user.posts.find((post) => (post._id == req.params.postId))
        res.json(data)
    } catch {
        res.status(500).json({error: 'Internal Server Error'})
    }
})

/**
 * Action:      UPDATE
 * Method:      PUT
 * URI:         /users/644ef2f60bf76b599d86f44d/posts/64552ba83b906c65ed9db73b
 * Description: Update a single Post (by Post ID) from a User (by User ID)
 */

router.put('/users/:id/posts/:postId', async (req, res) => {
    try {
        const data = await Post.findByIdAndUpdate(req.params.postId, {...req.body}, {new: true})
    
        res.json(data)
    } catch {
        res.status(500).json({error: 'Internal Server Error'})
    }
})

/**
 * Action:      DESTROY
 * Method:      DELETE
 * URI:         /users/644ef2f60bf76b599d86f44d/posts/64552ba83b906c65ed9db73b
 * Description: Delete a single Post (by Post ID) from a User (by User ID)
 */

router.delete('/users/:id/posts/:postId', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('posts')
        const updatedPostsArr = user.posts.filter((post) => (post._id != req.params.postId))
        const data = await User.findByIdAndUpdate(req.params.id, {posts: updatedPostsArr}, {new: true}).populate('posts')
        res.json(data)

    } catch {
        res.status(500).json({error: 'Internal Server Error'})
    }
})


module.exports = router