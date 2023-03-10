const User = require("../model/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const express = require('express');
require('dotenv').config();

const authController = {
    register: async (req, res) => {
        const {username, password} = req.body;
        if(!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing username or password"
            });
        }
        try {

            const user = await User.findOne({username});
            if(user) {
                return res.status(400).json({
                    success: false,
                    message: 'Username already taken'
                });
            }
            //All good
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({username, password: hashedPassword});
            await newUser.save();
            return res.json({
                success: true,
                message: 'Register successfully',
                user: newUser
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    generateAccesstoken: async (user) => {
        const accessToken = jwt.sign({
            userId: user._id, 
            username: user.username
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '100s'});
        return accessToken;
    },

    login: async (req, res) => {
        try {
            // const {username, password} = req.body;
            if(!req.body.username || !req.body.password) {
                return res.status(400).json({
                    success: false,
                    message: "Missing username or password"
                });
            }

            const user = await User.findOne({username: req.body.username});
            if(!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect username'
                });
            }

            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            if(!isValidPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Incrorrect password'
                });
            }
            //all good
            const {password, ...others} = user._doc;
            const accessToken = await authController.generateAccesstoken(user);
            return res.json({
                success: true,
                message: 'Login successfully',
                ...others,
                accessToken
            });


        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }


};

module.exports = authController;