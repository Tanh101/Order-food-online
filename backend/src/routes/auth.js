const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
const User = require('../app/model/User');

//@route POST api/auth/register
//@desc Register user
//@access public
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing username of password"
        });
    }

    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400)
                .json({
                    success: false,
                    message: 'Username already taken'
                });
        }

        //All good
        const hashedPassword = await argon2.hash(password);
        console.log(hashedPassword);
        const newUser = new User({username, password: hashedPassword});
        await newUser.save();

        //Return token
        const accessToken = jwt.sign({userId: newUser._id, username: newUser.username}, process.env.ACCESS_TOKEN_SECRET);

        return res.json({
            success: true,
            message: 'Register successfully',
            accessToken
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

//@route POST api/auth/login
//@desc Login user
//@access public

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) {
        return res.status(400)
        .json({
            success: false,
            message: 'Missing username or password'
        });
    }
    try {
        const user = await User.findOne({username})
        if(!user){
            return res.satatus(400)
            .json({
                success: false,
                message: 'Incorrect username'
            });

        }
        //username found
        const passwordValid = await argon2.verify(user.password,  password);
        if(!passwordValid) {
            return res.statasu(400)
            .json({
                success: false,
                message: 'Incorrect password'
            })
        }

        //All good

         //Return token
         const accessToken = jwt.sign({userId: user._id, username: user.username}, process.env.ACCESS_TOKEN_SECRET);

         return res.json({
             success: true,
             message: 'Login successfully',
             accessToken
         });


    } catch (error) {
        console.log(error);
        return res.status(500)
        .json({
            success: false,
            message: 'Internal server error'
        });
    }
});



    router.get('/', (req, res) => res.send('USER ROUTE'));

    module.exports = router;