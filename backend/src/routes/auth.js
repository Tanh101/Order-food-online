const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
const User = require('../app/model/User');
//@route POST api/auth/register
//desc  Register user
//@access public

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400)
                    .json({ success: false, messaage: 'Missing username or password' });
    }

    try {
        const user = await User.findOne({username});
        if(user){
            return res.satatus(400).json({success: false, messaage: 'username already taken'});
        }

        //All good
        const hashedPassword = await argon2.hash(password);

        const newUser = new User({username, password: hashedPassword});
        await newUser.save();

        //return token
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)

        res.json({success: true, message: 'Create User Successfully!'}, accessToken);

    } catch (error) {
        
    }
})

router.get('/', (req, res) => res.send('USER ROUTE'));

module.exports = router;